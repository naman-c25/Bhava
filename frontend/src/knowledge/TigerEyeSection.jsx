import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TigerEyeSection.module.css";
import TigerEye108 from "./TigerEye108";

// eslint-disable-next-line react-refresh/only-export-components
export const tigerEyeRoutes = [
  { path: "tiger-eye", element: <TigerEye108 /> },
];

function TigerEyeSection() {
  const navigate = useNavigate();
  const [currentTile, setCurrentTile] = useState(0);

  const tiles = [
    {
      id: 1,
      type: "strategy",
      image: "/Sacred Mission.png",
      eyebrow: "SACRED STRATEGY",
      title: "Why 108 and Tiger Eye Are the Ultimate Spiritual Power Pair",
      description:
        "108 appears in the distance between the Earth and Sun (108 · the Sun's diameter), in the 108 Upanishads, 108 sacred sites, 108 beads of the mala — it is the universe's ordering frequency. When you work with 108, you align yourself with the cosmic rhythm.\n\nTiger Eye is the stone of the disciplined warrior. Ancient Roman soldiers carried it into battle for protection. In Vedic tradition it harmonises the solar plexus and root chakras, building the unshakeable stability needed for long-term sadhana. It transforms fear into focused action and scattered energy into laser-precision.\n\nCombined, they are the 108·Tiger Eye System — a daily ritual protocol of just 108 seconds that regulates the nervous system, anchors intention, and creates the inner stillness from which all great devotion flows.",
      highlights: [
        "108 Upanishads — The complete library of Vedantic wisdom",
        "108 × Sun Diameter — Earth–Sun distance, cosmic proof",
        "Tiger Eye Chakras — Solar plexus · Root, power & grounding",
        "108-Second Ritual — Nervous system reset protocol",
        "Godin's Tribe — 10,000 · devoted seekers, not mass marketing",
        "6 Pillars — Kotler · Godin · Ries · Trout strategic core"
      ],
      button: "Explore the Full System →",
      expandedContent: {
        eyebrow: "SACRED STRATEGY",
        title: "Why 108 and Tiger Eye Are the Ultimate Spiritual Power Pair",
        fullDescription: "108 appears in the distance between the Earth and Sun (108 · the Sun's diameter), in the 108 Upanishads, 108 sacred sites, 108 beads of the mala — it is the universe's ordering frequency. When you work with 108, you align yourself with the cosmic rhythm.\n\nTiger Eye is the stone of the disciplined warrior. Ancient Roman soldiers carried it into battle for protection. In Vedic tradition it harmonises the solar plexus and root chakras, building the unshakeable stability needed for long-term sadhana. It transforms fear into focused action and scattered energy into laser-precision.\n\nCombined, they are the 108·Tiger Eye System — a daily ritual protocol of just 108 seconds that regulates the nervous system, anchors intention, and creates the inner stillness from which all great devotion flows.",
        facts: [
          "108 Upanishads — The complete library of Vedantic wisdom",
          "108 × Sun Diameter — Earth–Sun distance, cosmic proof",
          "Tiger Eye Chakras — Solar plexus · Root, power & grounding",
          "108-Second Ritual — Nervous system reset protocol",
          "Godin's Tribe — 10,000 · devoted seekers, not mass marketing",
          "6 Pillars — Kotler · Godin · Ries · Trout strategic core"
        ]
      }
    },
    {
      id: 2,
      type: "strategy",
      image: "/Temple Blessed.png",
      title: "The Civilizational Code: 108 & Tiger Eye",
      description:
        "108 is not just a number — it is the universe's blueprint encoded in sacred geometry, planetary cycles, and ancient yogic science. Tiger Eye is not just a stone — it is concentrated discipline, a crystallized force that sharpens the mind, steadies the nervous system, and aligns action with dharma. Together they form the sacred system that powers The Spiritual Company's vision of civilizational renewal.",
      button: "Explore the Full System →",
      expandedContent: {
        title: "The Civilizational Code: 108 & Tiger Eye",
        fullDescription: "108 is not just a number — it is the universe's blueprint encoded in sacred geometry, planetary cycles, and ancient yogic science. Tiger Eye is not just a stone — it is concentrated discipline, a crystallized force that sharpens the mind, steadies the nervous system, and aligns action with dharma. Together they form the sacred system that powers The Spiritual Company's vision of civilizational renewal.",
        facts: [
          "Sacred Geometry — 108 encoded in cosmic proportions and planetary cycles",
          "Vedic Science — The ancient wisdom of 108 Upanishads and sacred sites",
          "Tiger Eye Power — Concentration, discipline, and grounded focus",
          "Modern Dharma — Bringing ancient wisdom into contemporary life",
          "Civilizational Renewal — Beyond wellness, toward cultural transformation",
          "The 108 Tribe — A movement of 10,000+ devoted practitioners"
        ]
      }
    },
    {
      id: 3,
      type: "strategy",
      image: "/108-Day Mantra Sadhana.png",
      eyebrow: "PERSONAL DHARMA",
      title: "108 + Tiger Eye: Your Personal Dharmic Operating System",
      description:
        "108 encodes cosmic order and completion, while Tiger Eye carries grounded courage and protection. Together they become a daily system that anchors modern life in Dharma.",
      highlights: [
        "Order (108) — Structure, completion, and cosmic alignment",
        "Power (Tiger Eye) — Courage, protection, and focused action",
        "Daily Integration — 108-second ritual for nervous system reset",
        "Personal Dharma — Your unique path of spiritual discipline",
        "Modern Life Navigation — Through chaos, abundance, and ambition",
        "Sacred Anchor — A physical and spiritual talisman for your journey"
      ],
      button: "Explore the Full System →",
      expandedContent: {
        title: "108 + Tiger Eye: Your Personal Dharmic Operating System",
        fullDescription: "108 encodes cosmic order and completion, while Tiger Eye carries grounded courage and protection. Together they become a daily system that anchors modern life in Dharma. This is the intersection of cosmic frequency and personal discipline — where universal order meets individual will.",
        facts: [
          "Order (108) — Structure, completion, and cosmic alignment",
          "Power (Tiger Eye) — Courage, protection, and focused action",
          "Daily Integration — 108-second ritual for nervous system reset",
          "Personal Dharma — Your unique path of spiritual discipline",
          "Modern Life Navigation — Through chaos, abundance, and ambition",
          "Sacred Anchor — A physical and spiritual talisman for your journey"
        ]
      }
    },
    {
      id: 4,
      type: "strategy",
      image: "/Premium Quality.png",
      eyebrow: "108 · TIGER EYE · MODERN DHARMA",
      title: "From Stones to Symbolic Infrastructure",
      description:
        "In Hindu civilization, 108 appears again and again as a signal of wholeness — in malas, temple canons, sacred name-garlands, and cosmic mappings.\n\n108 (Order) · Tiger Eye (Power) becomes a daily dharmic operating system — how do I feel spiritually protected and aligned while navigating chaos, money, family, and ambition?",
      highlights: [
        "Order (108): structure, completion, and cosmic order.",
        "Power (Tiger Eye): courage, protection, and grounded focus.",
        "Daily 108-Second Ritual: stillness, breath, and touch of the anchor stone.",
        "Tribe and Movement: a 108 Tribe that wears, counts, posts, and lives by 108."
      ],
      button: "Explore Full Philosophy →",
      expandedContent: {
        eyebrow: "108 · TIGER EYE · MODERN DHARMA",
        title: "From Stones to Symbolic Infrastructure",
        fullDescription: "In Hindu civilization, 108 appears again and again as a signal of wholeness — in malas, temple canons, sacred name-garlands, and cosmic mappings.\n\n108 (Order) · Tiger Eye (Power) becomes a daily dharmic operating system — how do I feel spiritually protected and aligned while navigating chaos, money, family, and ambition?",
        facts: [
          "Order (108): structure, completion, and cosmic order.",
          "Power (Tiger Eye): courage, protection, and grounded focus.",
          "Daily 108-Second Ritual: stillness, breath, and touch of the anchor stone.",
          "Tribe and Movement: a 108 Tribe that wears, counts, posts, and lives by 108."
        ]
      }
    }
  ];

  const handleNextTile = () => {
    setCurrentTile((prev) => (prev === tiles.length - 1 ? 0 : prev + 1));
  };

  const handlePrevTile = () => {
    setCurrentTile((prev) => (prev === 0 ? tiles.length - 1 : prev - 1));
  };

  const currentData = tiles[currentTile];

  return (
    <>
      {/* ── Carousel Hero Section ── */}
      <section className={styles.carouselSection}>
        <div className={styles.carousel}>
          {/* Left Arrow - hidden on first tile */}
          {currentTile !== 0 && (
            <button
              className={styles.arrowLeft}
              onClick={handlePrevTile}
              aria-label="Previous"
            >
              ←
            </button>
          )}

          {/* Tile Content */}
          <div className={styles.tileContent}>
            {currentData.type === "strategy" ? (
              <>
                {/* Strategy Tile - Left Section */}
                <div className={styles.leftSection}>
                  <p className={styles.eyebrow}>{currentData.eyebrow}</p>
                  <h1 className={styles.tileTitleStrategy}>{currentData.title}</h1>
                  <button className={styles.ctaBtn} onClick={() => navigate("/knowledge/tiger-eye", { state: { tile: currentData } })}>
                    Explore →
                  </button>
                </div>
                {currentData.image && (
                  <div className={styles.rightSection}>
                    <img src={currentData.image} alt={currentData.title} className={styles.tileImage} />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Centered Tile */}
                <div className={styles.centeredTile}>
                  {currentData.image && (
                    <img src={currentData.image} alt={currentData.title} className={styles.centeredTileImage} />
                  )}
                  <h1 className={styles.centeredTitle}>{currentData.title}</h1>
                  <button className={styles.ctaBtn} onClick={() => navigate("/knowledge/tiger-eye", { state: { tile: currentData } })}>
                    Explore →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Arrow */}
          <button
            className={styles.arrowRight}
            onClick={handleNextTile}
            aria-label="Next"
          >
            →
          </button>

          {/* Navigation Dots */}
          <div className={styles.navDots}>
            {tiles.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${currentTile === idx ? styles.active : ""}`}
                onClick={() => setCurrentTile(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


    </>
  );
}

export default TigerEyeSection;
