import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MantraSadhana108.module.css";

const completionBenefits = [
  {
    title: "Unshakeable Discipline",
    description:
      "108 days of consistent practice forges a daily sadhana that becomes second nature.",
  },
  {
    title: "Mental Clarity",
    description:
      "The mind becomes clearer, sharper, and no longer controlled by scattered thoughts.",
  },
  {
    title: "Emotional Mastery",
    description:
      "Reactions soften. You observe feelings instead of being overtaken by them.",
  },
  {
    title: "Spiritual Identity",
    description:
      "Mantra becomes part of who you are — a living, breathing devotion within.",
  },
  {
    title: "Inner Stillness",
    description:
      "Sound becomes silence. Practice becomes presence. Stillness deepens permanently.",
  },
];

const sacredFacts = [
  {
    label: "Mala & Japa Practice",
    heading: "108 Beads, One Complete Round",
    description:
      "A traditional Japa Mala has 108 beads. When chanting any mantra, you complete 108 repetitions — one full round. The 109th bead, the Sumeru or Guru bead, is never crossed. You reverse direction instead, honoring the infinite cycle of devotion.",
  },
  {
    label: "Astronomy & Cosmos",
    heading: "The Universe Encoded in a Number",
    description:
      "The Sun's diameter is approximately 108 times the Earth's diameter. The distance from Earth to the Sun is approximately 108 times the Sun's diameter. The distance from Earth to the Moon is approximately 108 times the Moon's diameter. Ancient Vedic sages calculated this thousands of years ago — making 108 a cosmic number connecting Earth, Sun, and Moon.",
  },
  {
    label: "Human Body & Chakras",
    heading: "108 Channels of Vital Energy",
    description:
      "There are 108 nadis — energy channels — that converge at the heart chakra, Anahata. There are 108 marma points, vital pressure points in the body similar to acupressure. The Atman, the soul, is said to pass through 108 stages on its spiritual journey.",
  },
  {
    label: "Sanskrit & Sacred Texts",
    heading: "The Language of the Divine",
    description:
      "Sanskrit has 54 letters, each with masculine (Shiva) and feminine (Shakti) forms — 54 multiplied by 2 equals 108. The Rigveda is divided into 10,800 stanzas. There are 108 Upanishads, the sacred philosophical texts of Vedanta, and 108 names each for Vishnu, Shiva, Lakshmi, and Ganesha.",
  },
  {
    label: "Tantra & Yoga",
    heading: "Sacred Sites, Sacred Motion",
    description:
      "There are 108 sacred sites — Shakti Peethas — across India. Bharatanatyam, classical Indian dance, contains 108 forms of movement as listed in the Natya Shastra. In yoga, 108 Sun Salutations are performed on special occasions such as solstices and equinoxes.",
  },
  {
    label: "Time & Astrology",
    heading: "Written in the Stars",
    description:
      "In Vedic astrology, there are 12 zodiac signs and 9 planets — 12 multiplied by 9 equals 108. There are 27 Nakshatras, the lunar mansions, each divided into 4 Padas — 27 multiplied by 4 equals 108.",
  },
  {
    label: "Across Traditions",
    heading: "A Universal Sacred Number",
    description:
      "Beyond Hinduism, the significance of 108 resonates widely. In Buddhism, 108 bells are rung to mark the New Year and 108 defilements must be overcome. In Sikhism, 108 divine names are honored. In Jainism, 108 virtues are recognized as the path to liberation.",
  },
];

const phases = [
  {
    phase: "Foundation",
    days: "Day1-21",
    number: 1,
    title: "Discipline begins the journey",
    description:
      "To build consistency, correct pronunciation, and mental focus. This phase is about habit formation. The mind may wander. The body may resist. But discipline is more important than depth at this stage.",
    duration: "14 Mins",
  },
  {
    phase: "Stabilization",
    days: "Day 22-54",
    number: 2,
    title: "Breath and Sound become one",
    description:
      "To connect mantra with breath and deepen awareness. Now the mind starts settling. Chanting becomes rhythmic.",
    duration: "14 Mins",
  },
  {
    phase: "Deepening",
    days: "Day 55-81",
    number: 3,
    title: "Mantra enters the heart",
    description:
      "To move from verbal chanting to internal repetition (Japa). This phase is about internalization.",
    duration: "14 Mins",
  },
  {
    phase: "Integration",
    days: "Day 82-108",
    number: 4,
    title: "Sound become stillness",
    description:
      "To integrate mantra into daily life. Chanting is no longer practice. It becomes presence.",
    duration: "14 Mins",
  },
];

function MantraSadhana108() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ── Left Panel ── */}
        <div className={styles.leftPanel}>
          <h1 className={styles.title}>108-Day Mantra Sādhana</h1>

          <div className={styles.imageCard}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progress</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
            </div>
            <img
              src="../108-Day Mantra Sadhana.png"
              alt="108-Day Mantra Sādhana"
              className={styles.heroImg}
            />
            <div className={styles.controls}>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">play_arrow</span>
                <span className={styles.controlLabel}>Play</span>
              </button>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">add_circle</span>
                <span className={styles.controlLabel}>Save</span>
              </button>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">share</span>
                <span className={styles.controlLabel}>Share</span>
              </button>
            </div>
          </div>

          <p className={styles.description}>
            Commit to daily mantra and deepen your inner stillness. Chant sacred
            mantras for 108 consecutive days and experience profound inner
            transformation through sound and devotion.
          </p>
        </div>

        {/* ── Right Side ── */}
        <div className={styles.rightWrapper}>
          <p className={styles.sessionsCount}>4 Sessions</p>

          <div className={styles.rightPanel}>
          {phases.map((item) => (
            <div key={item.number} className={styles.sessionBlock}>
              <p className={styles.phaseHeader}>
                {item.phase} ({item.days})
              </p>
              <div className={styles.sessionRow}>
                <span className={styles.sessionNumber}>{item.number}</span>
                <div className={styles.sessionContent}>
                  <h3 className={styles.sessionTitle}>{item.title}</h3>
                  <p className={styles.sessionDesc}>{item.description}</p>
                  <span className={styles.duration}>{item.duration}</span>
                </div>
                <button className={styles.playCircle}>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>

      </div>

      {/* ── Why 108 is Sacred ── */}
      <section className={styles.sacredSection}>
        <div className={styles.sacredContainer}>
          <h2 className={styles.sacredTitle}>Why 108 is Sacred in Hinduism</h2>
          <p className={styles.sacredSubtitle}>
            108 represents the wholeness of existence — the connection between
            the individual soul and universal consciousness. It is not merely a
            number. In Hindu philosophy, 108 is the numerical representation of
            the universe itself.
          </p>
          <div className={styles.sacredGrid}>
            {sacredFacts.map((fact, i) => (
              <div key={i} className={styles.sacredCard}>
                <p className={styles.sacredLabel}>{fact.label}</p>
                <h3 className={styles.sacredHeading}>{fact.heading}</h3>
                <p className={styles.sacredDesc}>{fact.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.sacredSummary}>
            <p className={styles.sacredSummaryText}>
              108 bridges cosmos, body, sound, and time. Every strand of Vedic
              knowledge — from astronomy to anatomy, from scripture to sacred
              geography — converges on this single number, affirming that the
              universe is not chaotic but ordered, and that the devotee who
              chants 108 times participates consciously in that order.
            </p>
          </div>
        </div>
      </section>

      {/* ── After 108 Days — Benefits ── */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <h2 className={styles.benefitsTitle}>
            After <span className={styles.maroon}>108 Days</span>
          </h2>
          <p className={styles.benefitsSubtitle}>
            After completing the 108-Day Mantra Sādhana, you will have undergone
            a complete inner transformation — from discipline to stillness, from
            sound to silence.
          </p>
          <div className={styles.benefitsGrid}>
            {completionBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <h3 className={styles.benefitCardTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default MantraSadhana108;
