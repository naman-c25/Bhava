<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import styles from "./BhavaVoiceCall.module.css";

const WS_URL = import.meta.env.VITE_BHAVA_VOICE_WS_URL || "https://bhava-voice-agent.onrender.com";

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
=======
import React, { useEffect, useRef, useState } from "react";
import styles from "./BhavaVoiceCall.module.css";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:5000/ws/voice";

/**
 * BhavaVoiceCall Component
 * A full Voice Call UI (no text chat bubbles).
 * Dynamic Real-Time Instructions for:
 *  - 🟢 WHEN TO SPEAK (SPEAK NOW)
 *  - 🟡 WHEN TO WAIT (PLEASE WAIT)
 *  - 🟣 WHEN AI IS SPEAKING (AI IS SPEAKING)
 *  - 🔴 MUTED / IDLE
 */
export default function BhavaVoiceCall({ isOpen, onClose }) {
  // Call States: 'IDLE' | 'SPEAK_NOW' | 'PLEASE_WAIT' | 'AI_SPEAKING' | 'MUTED'
  const [callState, setCallState] = useState("IDLE");
  const [callSeconds, setCallSeconds] = useState(0);
  const [activeAgent, setActiveAgent] = useState("Bhagwati");
  const [wsConnected, setWsConnected] = useState(false);
  const [statusNote, setStatusNote] = useState("Click mic to start call");

  // Web API Refs
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Audio Playback Queue
  const audioQueueRef = useRef([]);
  const isPlayingAudioRef = useRef(false);
  const currentAudioRef = useRef(null);
  const wasSpeakingRef = useRef(false);
  const silenceStartTimeRef = useRef(null);

  // Initialize WebSocket when component opens
  useEffect(() => {
    if (!isOpen) return;

    initWebSocket();

    return () => {
      cleanupCall();
    };
  }, [isOpen]);

  // Call Timer Effect
  useEffect(() => {
    if (callState === "SPEAK_NOW" || callState === "PLEASE_WAIT" || callState === "AI_SPEAKING") {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          setCallSeconds((prev) => prev + 1);
        }, 1000);
      }
    } else if (callState === "IDLE") {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setCallSeconds(0);
    }
  }, [callState]);

  const initWebSocket = () => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
>>>>>>> 63c772d (UI change)
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
<<<<<<< HEAD
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
=======
        setWsConnected(true);
        setStatusNote("Connected to Bhava Voice Pipeline");
      };

      ws.onclose = () => {
        setWsConnected(false);
        setStatusNote("Disconnected — retrying...");
        setTimeout(() => {
          if (isOpen) initWebSocket();
        }, 3000);
      };

      ws.onerror = (err) => {
        console.error("[BhavaVoiceCall] WS Error:", err);
        setWsConnected(false);
>>>>>>> 63c772d (UI change)
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
<<<<<<< HEAD

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
=======
          handleServerMessage(data);
        } catch (e) {
          console.error("[BhavaVoiceCall] Parse error:", e);
        }
      };
    } catch (err) {
      console.error("[BhavaVoiceCall] Connection failed:", err);
    }
  };

  const handleServerMessage = (data) => {
    switch (data.type) {
      case "vad_status":
        if (data.is_speech && callState === "SPEAK_NOW") {
          setStatusNote(`Speech detected (${Math.round(data.confidence * 100)}%)`);
        }
        break;

      case "stt_result":
        setCallState("PLEASE_WAIT");
        setStatusNote("Speech captured — consulting Bhagwati...");
        break;

      case "agent_chunk":
        if (data.agent) {
          setActiveAgent(`${data.agent} (${data.role || "Guide"})`);
        }
        break;

      case "audio_start":
        setCallState("AI_SPEAKING");
        setStatusNote(`${data.agent || "Bhagwati"} is speaking now...`);
        break;

      case "audio_chunk":
        enqueueAudioChunk(data.audio_b64, data.mime);
        break;

      case "audio_end":
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          setCallState("SPEAK_NOW");
          setStatusNote("AI finished — speak now!");
        } else {
          setCallState("MUTED");
          setStatusNote("AI finished — tap Mic to respond.");
        }
        break;

      case "interrupted":
        stopAudioPlayback();
        setCallState("MUTED");
        setStatusNote("Call turn interrupted.");
        break;

      case "error":
        setCallState("IDLE");
        setStatusNote(`Error: ${data.message}`);
        break;

      default:
        break;
    }
  };

  const getSupportedMimeType = () => {
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
      "audio/wav",
    ];
    for (const t of types) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) {
        return t;
      }
    }
    return "";
  };

  const toggleMic = async () => {
    if (callState === "SPEAK_NOW") {
      stopRecording();
      setCallState("MUTED");
      setStatusNote("Microphone paused.");
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      initWebSocket();
      setStatusNote("Reconnecting to voice server...");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
      });
      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : {};

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      wasSpeakingRef.current = false;
      silenceStartTimeRef.current = null;

      // Audio Analyser for PCM VAD & Canvas Waveform
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (stream) stream.getTracks().forEach((track) => track.stop());

        if (audioChunksRef.current.length > 0) {
          const completeBlob = new Blob(audioChunksRef.current, { type: mimeType || "audio/webm" });
          if (completeBlob.size > 500) {
            setCallState("PLEASE_WAIT");
            setStatusNote("Transcribing speech...");

            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Data = reader.result.split(",")[1];
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(
                  JSON.stringify({
                    type: "audio_turn",
                    audio_b64: base64Data,
                    mime: mimeType || "audio/webm",
                  })
                );
              }
            };
            reader.readAsDataURL(completeBlob);
          }
        }
        audioChunksRef.current = [];
      };

      mediaRecorder.start(250);
      setCallState("SPEAK_NOW");
      setStatusNote("Listening... speak now into mic");
      drawVisualizer();
    } catch (err) {
      console.error("[BhavaVoiceCall] Mic Error:", err);
      setStatusNote("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const enqueueAudioChunk = (base64Data, mimeType) => {
    const audioUrl = `data:${mimeType};base64,${base64Data}`;
    const audio = new Audio(audioUrl);
    audioQueueRef.current.push(audio);
    playNextAudioInQueue();
  };

  const playNextAudioInQueue = () => {
    if (isPlayingAudioRef.current || audioQueueRef.current.length === 0) return;

    isPlayingAudioRef.current = true;
    setCallState("AI_SPEAKING");
    const audio = audioQueueRef.current.shift();
    currentAudioRef.current = audio;

    audio.onended = () => {
      isPlayingAudioRef.current = false;
      currentAudioRef.current = null;
      if (audioQueueRef.current.length > 0) {
        playNextAudioInQueue();
      } else {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          setCallState("SPEAK_NOW");
        } else {
          setCallState("MUTED");
        }
      }
    };

    audio.onerror = () => {
      isPlayingAudioRef.current = false;
      currentAudioRef.current = null;
      playNextAudioInQueue();
    };

    audio.play().catch((e) => {
      console.error("Audio playback error:", e);
      isPlayingAudioRef.current = false;
    });
  };

  const stopAudioPlayback = () => {
    audioQueueRef.current = [];
    isPlayingAudioRef.current = false;
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (e) {}
      currentAudioRef.current = null;
>>>>>>> 63c772d (UI change)
    }
  };

  const endCall = () => {
<<<<<<< HEAD
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
=======
    stopAudioPlayback();
    stopRecording();
    setCallState("IDLE");
    setStatusNote("Call ended.");
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "stop" }));
    }
    if (onClose) onClose();
  };

  const cleanupCall = () => {
    stopAudioPlayback();
    stopRecording();
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    animFrameRef.current = requestAnimationFrame(drawVisualizer);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const avgVolume = sum / bufferLength;

    // VAD silence detection (800ms)
    if (avgVolume > 45) {
      wasSpeakingRef.current = true;
      silenceStartTimeRef.current = null;
    } else if (wasSpeakingRef.current) {
      if (!silenceStartTimeRef.current) {
        silenceStartTimeRef.current = Date.now();
      } else if (Date.now() - silenceStartTimeRef.current >= 800) {
        wasSpeakingRef.current = false;
        silenceStartTimeRef.current = null;
        stopRecording();
      }
    }

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.8;
      const gradient = ctx.createLinearGradient(0, height, 0, 0);

      if (callState === "SPEAK_NOW") {
        gradient.addColorStop(0, "#2ed573");
        gradient.addColorStop(1, "#00f2fe");
      } else if (callState === "AI_SPEAKING") {
        gradient.addColorStop(0, "#7f00ff");
        gradient.addColorStop(1, "#e100ff");
      } else {
        gradient.addColorStop(0, "#ffab00");
        gradient.addColorStop(1, "#ff4757");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  };

  const formatTimer = (totalSecs) => {
    const m = String(Math.floor(totalSecs / 60)).padStart(2, "0");
    const s = String(totalSecs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  // Render Instruction Banner Configs
  const getInstructionContent = () => {
    switch (callState) {
      case "SPEAK_NOW":
        return {
          themeClass: styles.stateSpeak,
          icon: "🗣️",
          badge: "YOUR TURN",
          title: "SPEAK NOW",
          sub: "Microphone active — speak clearly to Bhagwati.",
        };
      case "PLEASE_WAIT":
        return {
          themeClass: styles.stateWait,
          icon: "⏳",
          badge: "AI THINKING",
          title: "PLEASE WAIT",
          sub: "Analyzing your words & formulating spiritual guidance...",
        };
      case "AI_SPEAKING":
        return {
          themeClass: styles.stateAiSpeaking,
          icon: "🔊",
          badge: "BHAGWATI IS SPEAKING",
          title: "AI IS SPEAKING",
          sub: "Please listen to the voice response...",
        };
      case "MUTED":
        return {
          themeClass: styles.stateMuted,
          icon: "🤫",
          badge: "CALL PAUSED",
          title: "MICROPHONE MUTED",
          sub: "Tap Mic button to resume conversation.",
        };
      case "IDLE":
      default:
        return {
          themeClass: styles.stateIdle,
          icon: "🎙️",
          badge: "LIVE VOICE CALL",
          title: "START VOICE CALL",
          sub: "Tap Mic to connect with Bhagwati AI Guide.",
        };
    }
  };

  const instruction = getInstructionContent();

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={endCall} aria-label="Close Call">
          ✕
        </button>

        {/* 1. Call Header */}
        <div className={styles.header}>
          <div className={styles.caller}>
            <div className={styles.avatarOrb}>🕉️</div>
            <div>
              <h3 className={styles.callerName}>Bhagwati</h3>
              <p className={styles.callerSub}>{activeAgent}</p>
            </div>
          </div>
          <div className={styles.timer}>{formatTimer(callSeconds)}</div>
        </div>

        {/* 2. REAL-TIME INSTRUCTION BANNER (When to speak, when to wait, when AI is speaking) */}
        <div className={`${styles.instructionCard} ${instruction.themeClass}`}>
          <div className={styles.instructionIcon}>{instruction.icon}</div>
          <div className={styles.instructionText}>
            <span className={styles.instructionBadge}>{instruction.badge}</span>
            <h2 className={styles.instructionTitle}>{instruction.title}</h2>
            <p className={styles.instructionSub}>{instruction.sub}</p>
          </div>
        </div>

        {/* 3. Waveform Visualizer Canvas */}
        <div className={styles.visualizerContainer}>
          <canvas ref={canvasRef} className={styles.canvas} width={450} height={140} />
        </div>

        {/* 4. Phone Call Controls */}
        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.micBtn} ${callState === "MUTED" ? styles.muted : ""}`}
            onClick={toggleMic}
            title="Mute / Unmute Mic"
          >
            <span className="material-symbols-outlined">
              {callState === "SPEAK_NOW" ? "mic" : "mic_off"}
            </span>
            <span className={styles.btnLabel}>
              {callState === "SPEAK_NOW" ? "Mute" : "Speak"}
            </span>
          </button>

          <button className={`${styles.btn} ${styles.endBtn}`} onClick={endCall} title="End Call">
            <span className="material-symbols-outlined">call_end</span>
            <span className={styles.btnLabel}>End</span>
>>>>>>> 63c772d (UI change)
          </button>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

export default BhavaVoiceCall;
=======
>>>>>>> 63c772d (UI change)
