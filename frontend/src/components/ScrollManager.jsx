import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = (pathname) => `scroll_${pathname}`;

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(
        STORAGE_KEY(prevPathname.current),
        window.scrollY
      );
    };

    // Save scroll when tab closes / refreshes
    window.addEventListener("beforeunload", saveScroll);

    if (navType === "POP") {
      // Back / forward — restore saved position instantly
      const saved = sessionStorage.getItem(STORAGE_KEY(location.pathname));
      window.scrollTo({ top: saved ? parseInt(saved, 10) : 0, behavior: "instant" });
    } else {
      // PUSH or REPLACE — new navigation, jump to top
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      // Save scroll position before leaving this route
      sessionStorage.setItem(STORAGE_KEY(location.pathname), window.scrollY);
      prevPathname.current = location.pathname;
    };
  }, [location.pathname, navType]);

  return null;
}
