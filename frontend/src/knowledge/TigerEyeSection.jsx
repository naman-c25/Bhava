import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TigerEyeSection.module.css";
import TigerEye108 from "./TigerEye108";

// eslint-disable-next-line react-refresh/only-export-components
export const tigerEyeRoutes = [
  { path: "tiger-eye", element: <TigerEye108 /> },
];

function TigerEyeSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── The Civilizational Code ── */}
      <section className={styles.tigerSummarySection}>
        <div className={styles.container}>
          <div className={styles.sectionGoldDivider} />
          <h2 className={styles.tigerSummaryHeading}>
            The Civilizational Code:&nbsp;
            <span style={{ fontWeight: 800, fontSize: "inherit", color: "#C6A14A" }}>
              108 &amp; Tiger Eye
            </span>
          </h2>
          <p className={styles.tigerSummaryText}>
            108 is not just a number — it is the universe's blueprint encoded in sacred geometry, planetary cycles,
            and ancient yogic science. Tiger Eye is not just a stone — it is concentrated discipline, a crystallized
            force that sharpens the mind, steadies the nervous system, and aligns action with dharma.
            Together they form the sacred system that powers The Spiritual Company's vision of civilizational renewal.
          </p>
        </div>
      </section>

      {/* ── Why 108 and Tiger Eye ── */}
      <section className={styles.tigerKnowledgeSection}>
        <div className={styles.container}>
          <div className={styles.tigerKnowledgeGrid}>
            <div className={styles.tigerKnowledgeTextBlock}>
              <p className={styles.tigerKnowledgeEyebrow}>Sacred Strategy</p>
              <h2
                className={styles.tigerKnowledgeTitle}
                style={{ fontWeight: 800, fontSize: "2.2rem", color: "#E07B39" }}
              >
                Why 108 and Tiger Eye Are the Ultimate Spiritual Power Pair
              </h2>
              <p className={styles.tigerKnowledgeParagraph}>
                <strong>108</strong> appears in the distance between the Earth and Sun (108× the Sun's diameter),
                in the 108 Upanishads, 108 sacred sites, 108 beads of the mala — it is the universe's ordering
                frequency. When you work with 108, you align yourself with the cosmic rhythm.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                <strong>Tiger Eye</strong> is the stone of the disciplined warrior. Ancient Roman soldiers carried
                it into battle for protection. In Vedic tradition it harmonises the solar plexus and root chakras,
                building the unshakeable stability needed for long-term sadhana. It transforms fear into focused
                action and scattered energy into laser-precision.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                Combined, they are the <em>108-Tiger Eye System</em> — a daily ritual protocol of just
                108 seconds that regulates the nervous system, anchors intention, and creates the inner
                stillness from which all great devotion flows.
              </p>
              <button
                className={styles.btnPrimary}
                onClick={() => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, 0); navigate("/knowledge/tiger-eye"); }}
                style={{ marginTop: "8px" }}
              >
                Explore the Full System →
              </button>
            </div>

            <div className={styles.tigerKnowledgeCard}>
              <p className={styles.tigerKnowledgeCardTitle}>Sacred Facts at a Glance</p>
              <ul className={styles.tigerKnowledgeList}>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108 Upanishads</span> — The complete library of Vedantic wisdom
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108 × Sun Diameter</span> — Earth–Sun distance, cosmic proof
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>Tiger Eye Chakras</span> — Solar plexus + Root, power & grounding
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108-Second Ritual</span> — Nervous system reset protocol
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>Godin's Tribe</span> — 10,000+ devoted seekers, not mass marketing
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>6 Pillars</span> — Kotler · Godin · Ries · Trout strategic core
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Personal Dharmic Operating System ── */}
      <section className={styles.tigerSummarySection}>
        <div className={styles.container}>
          <h2 className={styles.tigerSummaryHeading}>
            108 + Tiger Eye: Your Personal Dharmic Operating System
          </h2>
          <p className={styles.tigerSummaryText}>
            108 encodes cosmic order and completion, while Tiger Eye carries grounded courage and protection.
            Together they become a daily system that anchors modern life in Dharma.
          </p>
        </div>
      </section>

      {/* ── From Stones to Symbolic Infrastructure ── */}
      <section className={styles.tigerKnowledgeSection}>
        <div className={styles.container}>
          <div className={styles.tigerKnowledgeGrid}>
            <div className={styles.tigerKnowledgeTextBlock}>
              <p className={styles.tigerKnowledgeEyebrow}>108 • TIGER EYE • MODERN DHARMA</p>
              <h2 className={styles.tigerKnowledgeTitle}>From Stones to Symbolic Infrastructure</h2>
              <p className={styles.tigerKnowledgeParagraph}>
                In Hindu civilization, 108 appears again and again as a signal of wholeness — in malas,
                temple canons, sacred name-garlands, and cosmic mappings.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                108 (Order) + Tiger Eye (Power) becomes a daily dharmic operating system — how do I feel
                spiritually protected and aligned while navigating chaos, money, family, and ambition?
              </p>
            </div>
            <div className={styles.tigerKnowledgeCard}>
              <p className={styles.tigerKnowledgeCardTitle}>The 108 Tiger Path in Practice</p>
              <ul className={styles.tigerKnowledgeList}>
                <li className={styles.tigerKnowledgeListItem}><span>Order (108):</span> structure, completion, and cosmic order.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Power (Tiger Eye):</span> courage, protection, and grounded focus.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Daily 108-Second Ritual:</span> stillness, breath, and touch of the anchor stone.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Tribe and Movement:</span> a 108 Tribe that wears, counts, posts, and lives by 108.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TigerEyeSection;
