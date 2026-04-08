import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LearningPaths.module.css";
import { getDisplayTitle, getSubtitle } from "../utils/categoryMapping";

// eslint-disable-next-line react-refresh/only-export-components
export const learningPathRoutes = [
  { path: "108-days-devotion",    element: <div>108 Days of Devotion</div> },
  { path: "bhagavad-gita-journey", element: <div>Bhagavad Gita Journey</div> },
  { path: "upanishad-wisdom",     element: <div>Upanishad Wisdom</div> },
  { path: "yoga-philosophy",      element: <div>Yoga Philosophy</div> },
  { path: "vedic-chanting",       element: <div>Vedic Chanting</div> },
  { path: "deity-wisdom",         element: <div>Deity Wisdom</div> },
  { path: "tantra-shakti",        element: <div>Tantra Shakti</div> },
];

const CATEGORY = "Paths of Dharmic";

function LearningPaths() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    try {
      setLoading(true);
      setError("");
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const url = `${API_BASE}/api/tiles?category=${encodeURIComponent(CATEGORY)}`;
      const res = await fetch(url);
      const json = await res.json();
      
      if (res.ok && json.success) {
        const mappedPaths = (json.data || []).map((tile) => ({
          id: tile._id,
          title: tile.title,
          sub: tile.subtitle || tile.summary,
          joined: tile.badgeText || "Learners",
          color: "#5a1a3a",
          image: tile.imageUrl ? (tile.imageUrl.startsWith('http') ? tile.imageUrl : `${API_BASE}${tile.imageUrl}`) : "/Learning%20Paths/placeholder.png",
          route: `/knowledge/detail/${tile._id}`,
        }));
        setPaths(mappedPaths);
      } else {
        console.error("Failed to fetch paths", json);
        setError(json.message || "Failed to load paths");
      }
    } catch (err) {
      console.error("Error fetching paths:", err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className={styles.heading}>{getDisplayTitle(CATEGORY)}</h2>
          <p className={styles.subheading}>{getSubtitle(CATEGORY)}</p>
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
          data-scroll-container-id="paths-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {loading && <p>Loading paths...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && paths.length === 0 && <p>No paths available</p>}
          {paths.map((p, i) => (
              <div key={i} data-scroll-id={`path-${i}`} className={styles.card} onClick={() => { navigate(p.route); }} style={{ cursor: 'pointer' }}>
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