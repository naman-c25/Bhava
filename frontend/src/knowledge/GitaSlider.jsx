import React, { useState } from "react";
import styles from "./GitaSlider.module.css";

const shlokas = [
  {
    text: "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.",
    ref: "BHAGAVAD GITA 2:47",
  }
 
];

function GitaSlider() {
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);

  const goNext = () => {
    if (current < shlokas.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleShare = async () => {
    const shloka = shlokas[current];
    const text = `"${shloka.text}" — ${shloka.ref}`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className={styles.gitaSection}>
      <div className={styles.gitaBg} />

      {/* Header */}
      <div className={styles.gitaHeader}>
        <h2 className={styles.gitaHeading}>Daily Wisdom</h2>
        <p className={styles.gitaSubheading}>
          Timeless guidance from the Bhagavad Gita
        </p>
      </div>

      {/* Full-width row: arrow | card | arrow */}
      <div className={styles.sliderWrapper}>

        {/* Quote card — full width */}
        <div className={styles.quoteCard}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.quoteText}>{shlokas[current].text}</p>
          <div className={styles.quoteDivider} />
          <span className={styles.quoteRef}>{shlokas[current].ref}</span>
          <button
            className={styles.shareBtn}
            onClick={handleShare}
            aria-label="Share quote"
            title={copied ? "Copied!" : "Share"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            )}
          </button>
        </div>

        {/* Left arrow — absolute at left edge */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft} ${current === 0 ? styles.arrowHidden : ""}`}
          onClick={goPrev}
          aria-label="Previous quote"
        >
          ‹
        </button>

        {/* Right arrow — absolute at right edge */}
        <button
          className={`${styles.arrow} ${styles.arrowRight} ${current === shlokas.length - 1 ? styles.arrowHidden : ""}`}
          onClick={goNext}
          aria-label="Next quote"
        >
          ›
        </button>

      </div>
    </section>
  );
}

export default GitaSlider;