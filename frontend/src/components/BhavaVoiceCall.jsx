import React, { useState, useEffect, useRef } from "react";
import styles from "./BhavaVoiceCall.module.css";

const WS_URL = import.meta.env.VITE_BHAVA_VOICE_WS_URL || "ws://localhost:8000/ws/voice";

function BhavaVoiceCall() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("disconnected"); // disconnected | connecting | connected | error
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [currentAssistantText, setCurrentAssistantText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingAudioRef = useRef(false);
  const currentAudioSourceRef = useRef(null);
  const transcriptScrollRef = useRef(null);

  // Listen for custom trigger to start call
  useEffect(() => {
    const handleOpenCall = () => {
      setOpen(true);
      startCall();
    };
    window.addEventListener("bhava:call:open", handleOpenCall);
    return () => window.removeEventListener("bhava:call:open", handleOpenCall);
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcript, currentAssistantText]);

  // Audio queue playback processor
  const playNextAudioChunk = () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingAudioRef.current = false;
      setIsSpeaking(false);
      return;
    }

    isPlayingAudioRef.current = true;
    setIsSpeaking(true);
    const audioDataB64 = audioQueueRef.current.shift();
    const binary = atob(audioDataB64);
    const arrayBuffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    audioContextRef.current.decodeAudioData(
      arrayBuffer,
      (buffer) => {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        currentAudioSourceRef.current = source;
        source.onended = () => {
          playNextAudioChunk();
        };
        source.start(0);
      },
      (err) => {
        console.error("Error decoding audio chunk", err);
        playNextAudioChunk();
      }
    );
  };

  const stopCurrentAudioPlayback = () => {
    audioQueueRef.current = [];
    if (currentAudioSourceRef.current) {
      try {
        currentAudioSourceRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      currentAudioSourceRef.current = null;
    }
    isPlayingAudioRef.current = false;
    setIsSpeaking(false);
  };

  const startCall = async () => {
    setStatus("connecting");
    setErrorMessage("");
    setTranscript([{ role: "assistant", text: "Connecting to Bhagwati Voice Agent..." }]);

    try {
      // Initialize Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Connect to Bhava Voice Agent WebSocket
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
        setTranscript([{ role: "assistant", text: "Pranam 🙏 Bhagwati is listening. Speak whenever you are ready." }]);

        // Record speech chunks into memory and send complete audio turns
        const audioChunks = [];
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunks.push(event.data);
            // Also stream binary chunks live if WS is open
            if (ws.readyState === WebSocket.OPEN && !isMuted) {
              ws.send(event.data);
            }
          }
        };

        mediaRecorder.onstop = () => {
          if (audioChunks.length > 0 && ws.readyState === WebSocket.OPEN) {
            const blob = new Blob(audioChunks, { type: "audio/webm" });
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Data = reader.result.split(",")[1];
              if (base64Data && base64Data.length > 100) {
                ws.send(
                  JSON.stringify({
                    type: "audio_turn",
                    audio_b64: base64Data,
                    mime: "audio/webm",
                  })
                );
              }
            };
            reader.readAsDataURL(blob);
          }
        };

        mediaRecorder.start(250); // Slice audio every 250ms
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "session_init") {
            console.log("Connected to session:", data.session_id);
          } else if (data.type === "stt_result") {
            if (data.text && !data.text.includes("[No clear speech detected]")) {
              setTranscript((prev) => [...prev, { role: "user", text: data.text }]);
            }
          } else if (data.type === "agent_chunk") {
            if (data.text) {
              setCurrentAssistantText((prev) => prev + data.text);
            }
            if (data.is_final) {
              setCurrentAssistantText((fullText) => {
                if (fullText.trim()) {
                  setTranscript((prev) => [...prev, { role: "assistant", text: fullText }]);
                }
                return "";
              });
            }
          } else if (data.type === "audio_start") {
            stopCurrentAudioPlayback();
          } else if (data.type === "audio_chunk") {
            if (data.audio_b64) {
              audioQueueRef.current.push(data.audio_b64);
              if (!isPlayingAudioRef.current) {
                playNextAudioChunk();
              }
            }
          } else if (data.type === "audio_end") {
            // Audio turn complete signal
          } else if (data.type === "interrupted") {
            stopCurrentAudioPlayback();
          } else if (data.type === "error") {
            setErrorMessage(data.message || "Voice processing error occurred.");
          }
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket Error:", err);
        setStatus("error");
        setErrorMessage("Failed to connect to Bhava voice server. Make sure Bhava-3 backend is running on port 8000.");
      };

      ws.onclose = () => {
        setStatus("disconnected");
      };
    } catch (err) {
      console.error("Microphone access error:", err);
      setStatus("error");
      setErrorMessage("Microphone access denied or not supported in this browser.");
    }
  };

  const endCall = () => {
    stopCurrentAudioPlayback();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    setStatus("disconnected");
    setOpen(false);
  };

  const toggleMute = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={`${styles.statusDot} ${status === "connected" ? styles.connected : ""}`} />
            <div>
              <p className={styles.headerName}>Bhagwati Voice Call</p>
              <p className={styles.headerSub}>
                {status === "connecting" && "Connecting to Bhava backend..."}
                {status === "connected" && (isSpeaking ? "Bhagwati is speaking..." : "Listening to you...")}
                {status === "error" && "Connection error"}
                {status === "disconnected" && "Call ended"}
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={endCall} aria-label="End call">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Visualizer & Avatar */}
        <div className={styles.avatarSection}>
          <div className={`${styles.avatarRing} ${isSpeaking ? styles.pulseSpeaking : ""}`}>
            <span className={styles.avatarEmoji}>🌸</span>
          </div>
          <div className={styles.visualizerWave}>
            <span className={`${styles.waveBar} ${isSpeaking || status === "connected" ? styles.animBar : ""}`} />
            <span className={`${styles.waveBar} ${isSpeaking || status === "connected" ? styles.animBar : ""}`} />
            <span className={`${styles.waveBar} ${isSpeaking || status === "connected" ? styles.animBar : ""}`} />
            <span className={`${styles.waveBar} ${isSpeaking || status === "connected" ? styles.animBar : ""}`} />
          </div>
        </div>

        {/* Live Transcript Stream */}
        <div className={styles.transcriptBox} ref={transcriptScrollRef}>
          {transcript.map((item, idx) => (
            <div key={idx} className={item.role === "user" ? styles.userLine : styles.assistantLine}>
              <span className={styles.roleLabel}>{item.role === "user" ? "You: " : "Bhagwati: "}</span>
              {item.text}
            </div>
          ))}
          {currentAssistantText && (
            <div className={styles.assistantLine}>
              <span className={styles.roleLabel}>Bhagwati: </span>
              {currentAssistantText}
            </div>
          )}
          {errorMessage && <div className={styles.errorBanner}>{errorMessage}</div>}
        </div>

        {/* Control Bar */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${isMuted ? styles.muted : ""}`}
            onClick={toggleMute}
            disabled={status !== "connected"}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            <span className="material-symbols-outlined">{isMuted ? "mic_off" : "mic"}</span>
          </button>

          <button
            className={styles.sendTurnBtn}
            onClick={() => {
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: "flush_audio" }));
              }
            }}
            disabled={status !== "connected"}
            title="Done Speaking (Process Audio Now)"
          >
            <span className="material-symbols-outlined">send</span>
          </button>

          <button className={styles.endCallBtn} onClick={endCall} title="End Call">
            <span className="material-symbols-outlined">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BhavaVoiceCall;
