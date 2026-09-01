/**
 * Voice Backend Pre-Warm Utility
 * Render free tier web services spin down after inactivity.
 * This utility sends lightweight HTTP GET requests to wake up the server.
 */

export function getVoiceBackendHttpUrl() {
  let envUrl = import.meta.env.VITE_BHAVA_VOICE_WS_URL || "https://bhava-voice-agent.onrender.com";
  envUrl = envUrl.trim();

  if (envUrl.startsWith("ws://")) {
    envUrl = envUrl.replace("ws://", "http://");
  } else if (envUrl.startsWith("wss://")) {
    envUrl = envUrl.replace("wss://", "https://");
  } else if (!envUrl.startsWith("http://") && !envUrl.startsWith("https://")) {
    envUrl = `https://${envUrl}`;
  }

  // Remove trailing /ws/voice or slashes if present to target the HTTP root
  envUrl = envUrl.replace(/\/ws\/voice\/?$/, "");
  return envUrl.replace(/\/+$/, "");
}

let lastWarmupTime = 0;

/**
 * Sends non-blocking HTTP GET requests to wake up the Render container.
 * Throttled to avoid unnecessary duplicate requests within a 2-minute window.
 */
export function warmupVoiceBackend() {
  const now = Date.now();
  // Don't re-ping if warm-up was dispatched within the last 2 minutes (120,000ms)
  if (now - lastWarmupTime < 120000) return;
  lastWarmupTime = now;

  const baseUrl = getVoiceBackendHttpUrl();
  const endpoints = [`${baseUrl}/health`, `${baseUrl}/`];

  endpoints.forEach((url) => {
    fetch(url, { method: "GET", mode: "no-cors" }).catch(() => {
      // Silently ignore errors as this is a background wake-up ping
    });
  });
}
