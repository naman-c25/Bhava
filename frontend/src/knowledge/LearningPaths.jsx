import React, { useRef, useState } from "react";
import styles from "./LearningPaths.module.css";

const paths = [
  { title: "108 Days of Devotion",  sub: "Path to Bhakti",         joined: "287K joined", color: "#5a1a3a", image: "/Learning%20Paths/108%20Days%20of%20Devotion.png" },
  { title: "Bhagavad Gita Journey", sub: "All 18 Chapters",         joined: "456K joined", color: "#5a2a0a", image: "/Learning%20Paths/Bhagvat%20Gita%20Journey.png" },
  { title: "Upanishad Wisdom",      sub: "Principal Upanishads",    joined: "198K joined", color: "#2a1a5a", image: "/Learning%20Paths/Upanishad%20Wisdom.png" },
  { title: "Yoga Philosophy",       sub: "Patanjali Sutras",         joined: "342K joined", color: "#1a3a3a", image: "/Learning%20Paths/Yoga%20Philosophy.png" },
  { title: "Vedic Chanting",        sub: "Learn Sacred Hymns",       joined: "156K joined", color: "#1a2a4a", image: "/Learning%20Paths/Vedic%20Chanting.png" },
  { title: "Deity Wisdom",          sub: "Understanding Devatā",     joined: "523K joined", color: "#4a0a0a", image: "/Learning%20Paths/Deity%20Wisdom.png" },
  { title: "Tantra & Shakti",       sub: "Sacred Energy Practices",  joined: "89K joined",  color: "#3a1a0a", image: "/Learning%20Paths/Tantra%20&%20Shakti.png" },
];

function LearningPaths() {
  const trackRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPos(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollLeft  = () => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  const scrollRight = () => trackRef.current?.scrollBy({ left: 340,  behavior: "smooth" });

  const atStart = scrollPos === 0;
  const atEnd   = scrollPos >= 0.99;

  // Left arrow: visible only when hovered AND user has scrolled right at least once
  const showLeft  = isHovered && !atStart;
  // Right arrow: visible only when hovered AND not at the end
  const showRight = isHovered && !atEnd;

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      {/* Header — arrows removed from here */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Learning Paths</h2>
          <p className={styles.subheading}>Structured journeys into Dharmic wisdom</p>
        </div>
      </div>

      {/* Hover zone: arrow | track | arrow */}
      <div
        className={styles.wrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left arrow — hidden until user scrolls right */}
        <button
          className={`${styles.arrowBtn} ${showLeft ? styles.arrowVisible : styles.arrowHidden}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Scrollable track */}
        <div
          className={styles.track}
          ref={trackRef}
          onScroll={handleScroll}
        >
          {paths.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardThumb} style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className={styles.thumbBg} />
                <div className={styles.thumbOverlay} />
              </div>

              <h4 className={styles.cardTitle}>{p.title}</h4>
              <p className={styles.cardSub}>{p.sub}</p>
              <span className={styles.cardJoined}>{p.joined}</span>
            </div>
          ))}
        </div>

        {/* Right arrow — shows on hover, hides when reaching end */}
        <button
          className={`${styles.arrowBtn} ${showRight ? styles.arrowVisible : styles.arrowHidden}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

    </section>
  );
}

export default LearningPaths;