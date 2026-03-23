import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

const STORAGE_KEY = (pathname) => `scroll_${pathname}`;

// Restore scroll, retrying until the page is tall enough
function restoreScroll(target) {
  if (target <= 0) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  const doScroll = () => window.scrollTo({ top: target, behavior: "instant" });
  const canReach = () =>
    document.documentElement.scrollHeight >= target + window.innerHeight;

  // Try immediately
  doScroll();

  // Retry at intervals to handle images / lazy sections still painting
  const delays = [100, 300, 600, 1200];
  const timers = delays.map((ms) =>
    setTimeout(() => {
      if (canReach()) doScroll();
    }, ms)
  );

  // Final forced attempt regardless of height
  timers.push(setTimeout(doScroll, 2000));

  return () => timers.forEach(clearTimeout);
}

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  // ── Save scroll on every click (capture phase) ──────────────────
  // Fires BEFORE React handles the event, so scrollY is always correct
  // when the user clicks a link / card / button that triggers navigation.
  useEffect(() => {
    const pathname = location.pathname;

    const saveNow = () => {
      sessionStorage.setItem(STORAGE_KEY(pathname), window.scrollY);
    };

    // Capture-phase click: fires before any handler, before React navigation
    document.addEventListener("click", saveNow, true);
    // Also keep a scroll listener as a live backup
    window.addEventListener("scroll", saveNow, { passive: true });
    // Save when tab closes
    window.addEventListener("beforeunload", saveNow);

    return () => {
      document.removeEventListener("click", saveNow, true);
      window.removeEventListener("scroll", saveNow);
      window.removeEventListener("beforeunload", saveNow);
    };
  }, [location.pathname]);

  // ── Restore / reset scroll on route change ───────────────────────
  useEffect(() => {
    if (navType === "POP") {
      const saved = sessionStorage.getItem(STORAGE_KEY(location.pathname));
      restoreScroll(saved ? parseInt(saved, 10) : 0);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, navType]);

  return null;
}
