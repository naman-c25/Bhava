import React, { useEffect, useState, useRef } from "react";
import styles from "./ScrollDown.module.css";

export default function ScrollDown({ amount }) {
  const [posStyle, setPosStyle] = useState(null);
  const btnRef = useRef(null);

  // default to a larger scroll (≈90% viewport) so it moves further down
  const scrollAmount = amount || Math.round(window.innerHeight * 0.9);

  function handleClick(e) {
    e.preventDefault();
    window.scrollBy({ top: scrollAmount, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function updatePosition() {
      const img = document.getElementById("hero-temple-img");
      const hero = btnRef.current?.closest(".homeMainHero") || document.querySelector(".homeMainHero");

      if (!img || !hero) {
        setPosStyle(null);
        return;
      }

      const imgRect = img.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();

      // place the button near the left-bottom corner of the temple image
      const left = Math.round(imgRect.left - heroRect.left + 24); // 24px inside the image from its left edge
      // keep it a little above the absolute bottom so it doesn't overlay the page chrome
      const bottom = Math.round(Math.max(4, heroRect.bottom - imgRect.bottom + 12));

      setPosStyle({ left: `${left}px`, bottom: `${bottom}px` });
    }

    // run after images/layout settle
    const t = setTimeout(updatePosition, 80);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("load", updatePosition);

    // also try to update when the temple image loads
    const img = document.getElementById("hero-temple-img");
    if (img && !img.complete) img.addEventListener("load", updatePosition);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("load", updatePosition);
      if (img && !img.complete) img.removeEventListener("load", updatePosition);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={styles.scrollDown}
      aria-label="Scroll down"
      onClick={handleClick}
      style={posStyle || undefined}
    >
      <span className={styles.arrow} />
    </button>
  );
}
