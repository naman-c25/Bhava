import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DhyanChallenge21.module.css";

const days = [
  {
    day: 1, title: "Sankalpa (Sacred Intention)", phase: "Foundation",
    practices: ["5 min deep breathing", "10 min guided body awareness", "Write your 21-day intention", "Practice: Sit still without movement"],
    mantra: "Om Tat Sat", mantraNote: "",
  },
  {
    day: 2, title: "Breath Awareness", phase: "Foundation",
    practices: ["5 min diaphragmatic breathing", "12 min observing natural breath", "Notice inhale/exhale length"],
    mantra: "So Hum", mantraNote: "Inhale: So — Exhale: Hum",
  },
  {
    day: 3, title: "Posture & Stillness", phase: "Foundation",
    practices: ["Learn stable seated posture", "15 min still sitting", "Avoid adjusting body"],
    mantra: "Om Shanti Shanti Shanti", mantraNote: "",
  },
  {
    day: 4, title: "Counting the Breath", phase: "Foundation",
    practices: ["Count inhale–exhale cycles up to 21", "Restart if distracted"],
    mantra: "Om", mantraNote: "",
  },
  {
    day: 5, title: "Introduction to Pranayama", phase: "Foundation",
    practices: ["5 min Anulom Vilom", "10 min silent meditation"],
    mantra: "Om Pranaya Namah", mantraNote: "",
  },
  {
    day: 6, title: "Observing Thoughts", phase: "Foundation",
    practices: ["Sit quietly", "Watch thoughts without reacting", "Label them gently"],
    mantra: "Om Sakshi Bhavaya Namah", mantraNote: "",
  },
  {
    day: 7, title: "Silence Integration", phase: "Foundation",
    practices: ["20 min combined practice", "Evening reflection journaling"],
    mantra: "Silent Meditation", mantraNote: "No mantra today — rest in pure silence",
  },
  {
    day: 8, title: "Mantra Introduction", phase: "Deepening",
    practices: ["Soft chanting of Om", "15 min mantra meditation"],
    mantra: "Om Namah Shivaya", mantraNote: "",
  },
  {
    day: 9, title: "Chakra Awareness", phase: "Deepening",
    practices: ["Visualize light in heart center", "Slow conscious breathing"],
    mantra: "Om Hreem Namah", mantraNote: "",
  },
  {
    day: 10, title: "Extended Stillness", phase: "Deepening",
    practices: ["20 min seated meditation", "No counting or mantra"],
    mantra: "Mental OM Awareness", mantraNote: "Silently feel the vibration of OM within",
  },
  {
    day: 11, title: "Trataka (Candle Gazing)", phase: "Deepening",
    practices: ["5 min candle gazing", "10 min closed-eye focus"],
    mantra: "Om Jyotir Namah", mantraNote: "",
  },
  {
    day: 12, title: "Emotional Observation", phase: "Deepening",
    practices: ["Sit with one emotion", "Observe without resistance"],
    mantra: "Om Shreem", mantraNote: "",
  },
  {
    day: 13, title: "Gratitude Awareness", phase: "Deepening",
    practices: ["5 min gratitude breathing", "15 min silent sitting"],
    mantra: "Om Krutagyaya Namah", mantraNote: "",
  },
  {
    day: 14, title: "Deep Pranayama", phase: "Deepening",
    practices: ["5 min Nadi Shodhana", "15 min meditation"],
    mantra: "Om Namo Bhagavate Vasudevaya", mantraNote: "",
  },
  {
    day: 15, title: "Longer Silence", phase: "Mastery",
    practices: ["25 min meditation", "Self-led discipline"],
    mantra: "Om (Long Chant)", mantraNote: "Sustain the OM for as long as each breath allows",
  },
  {
    day: 16, title: "Witness Consciousness", phase: "Mastery",
    practices: ["Observe body, breath, and thoughts", "Remain neutral observer"],
    mantra: "Om Sakshi", mantraNote: "",
  },
  {
    day: 17, title: "Inner Sound Awareness", phase: "Mastery",
    practices: ["Listen to subtle inner sounds", "Stay in deep silence"],
    mantra: "Silent Inner OM Listening", mantraNote: "No chanting — only listening to the inner vibration",
  },
  {
    day: 18, title: "Kundalini Awareness", phase: "Mastery",
    practices: ["Spine awareness breathing", "Visualize rising energy gently"],
    mantra: "Om Aim Hreem Kleem", mantraNote: "",
  },
  {
    day: 19, title: "Non-Attachment Practice", phase: "Mastery",
    practices: ["Watch thoughts come and go", "No judgment"],
    mantra: "Om Vairagyaya Namah", mantraNote: "",
  },
  {
    day: 20, title: "Extended Stillness (30 Minutes)", phase: "Mastery",
    practices: ["Deep uninterrupted silence", "Avoid checking time"],
    mantra: "Om Param Shantaye Namah", mantraNote: "",
  },
  {
    day: 21, title: "Integration & Commitment", phase: "Mastery",
    practices: ["30 min full practice", "Reflect on transformation", "Write future daily meditation plan"],
    mantra: "Om Purnamadah Purnamidam", mantraNote: "Purnat Purnamudachyate · Purnasya Purnamadaya · Purnamevavashishyate",
  },
];

const phases = [
  {
    name: "Foundation",
    days: "Days 1–7",
    number: 1,
    description: "Build the seat, the breath, and the intention. Learn to sit still and observe without reacting.",
    color: "#6E1B21",
    music: "Soft tanpura drone",
  },
  {
    name: "Deepening",
    days: "Days 8–14",
    number: 2,
    description: "Introduce mantra, chakra awareness, and emotional observation. Extend stillness to 20 minutes.",
    color: "#1B4430",
    music: "Drone + light bowl sound",
  },
  {
    name: "Mastery",
    days: "Days 15–21",
    number: 3,
    description: "Self-led practice. Longer silence, witness consciousness, and final integration at 30 minutes.",
    color: "#422868",
    music: "Deep low OM drone only",
  },
];

const completionBenefits = [
  { title: "Strong Meditation Habit", description: "A daily practice rooted in discipline, not motivation." },
  { title: "Improved Concentration", description: "The mind trained to rest, not wander." },
  { title: "Emotional Balance", description: "Feelings observed, not controlled by." },
  { title: "Breath Control", description: "Pranayama as a daily tool for nervous system regulation." },
  { title: "Spiritual Grounding", description: "A deeper, lived connection to your inner self." },
];

const phaseColor = { Foundation: "#6E1B21", Deepening: "#1B4430", Mastery: "#422868" };

function DhyanChallenge21() {
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState(null);

  return (
    <div className={styles.page}>

      {/* ── Two-Panel Layout ── */}
      <div className={styles.layout}>

        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1 className={styles.title}>21-Day Dhyān Challenge</h1>

          <div className={styles.imageCard}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progress</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
            </div>
            <img
              src="../21 Dhyan Challenge.png"
              alt="21-Day Dhyān Challenge"
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
            Twenty-one days of guided meditation to transform your consciousness
            and cultivate lasting stillness. Sit, breathe, and return — every
            morning.
          </p>
        </div>

        {/* Right Side */}
        <div className={styles.rightWrapper}>
          <p className={styles.sessionsCount}>3 Phases</p>

          <div className={styles.rightPanel}>
          {phases.map((phase) => (
            <div key={phase.name} className={styles.sessionBlock}>
              <p className={styles.phaseHeader}>
                {phase.name} ({phase.days})
              </p>
              <div className={styles.sessionRow}>
                <span className={styles.sessionNumber}>{phase.number}</span>
                <div className={styles.sessionContent}>
                  <h3 className={styles.sessionTitle}>{phase.name}</h3>
                  <p className={styles.sessionDesc}>{phase.description}</p>
                  <span className={styles.duration}>{phase.days}</span>
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

      {/* ── 21-Day Schedule ── */}
      <section className={styles.scheduleSection} id="schedule">
        <div className={styles.container}>
          <p className={styles.eyebrowCenter}>Daily Practice Guide</p>
          <h2 className={styles.sectionTitle}>
            The Complete <span className={styles.accent}>21-Day Schedule</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Each day includes the full practice guide and the mantra for that session.
            Click any day to expand its details.
          </p>

          <div className={styles.daysList}>
            {days.map((d) => (
              <div
                key={d.day}
                className={`${styles.dayRow} ${expandedDay === d.day ? styles.dayRowOpen : ""}`}
                style={{ "--phase-color": phaseColor[d.phase] }}
              >
                <button
                  className={styles.dayHeader}
                  onClick={() => setExpandedDay(expandedDay === d.day ? null : d.day)}
                >
                  <span className={styles.dayNumber} style={{ background: phaseColor[d.phase] }}>
                    Day {d.day}
                  </span>
                  <span className={styles.dayTitleText}>{d.title}</span>
                  <span className={styles.dayPhase}>{d.phase}</span>
                  <span className={styles.dayMantraPreview}>{d.mantra}</span>
                  <span className={styles.dayChevron}>{expandedDay === d.day ? "▲" : "▼"}</span>
                </button>

                {expandedDay === d.day && (
                  <div className={styles.dayBody}>
                    <div className={styles.dayBodyGrid}>
                      <div className={styles.dayPractices}>
                        <p className={styles.dayBodyLabel}>Practice</p>
                        <ul className={styles.practiceList}>
                          {d.practices.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.dayMantra}>
                        <p className={styles.dayBodyLabel}>Mantra</p>
                        <p className={styles.mantraText}>{d.mantra}</p>
                        {d.mantraNote && <p className={styles.mantraNote}>{d.mantraNote}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Background Music Section ── */}
      <section className={styles.musicSection}>
        <div className={styles.container}>
          <p className={styles.eyebrowCenter}>Sound Environment</p>
          <h2 className={styles.sectionTitle}>
            Background Music <span className={styles.accent}>Structure</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            The recommended sonic layers for each phase of the 21-day practice.
            Music is not included — this is the structural guide.
          </p>

          <div className={styles.musicLayersGrid}>
            <div className={styles.musicLayerCard}>
              <span className={styles.musicLayerNum}>Layer 1</span>
              <h3 className={styles.musicLayerTitle}>Base Ambient Sound</h3>
              <p className={styles.musicLayerDesc}>
                Tanpura drone, low OM humming, or Himalayan singing bowl sustain.
                This is the unbroken sonic foundation beneath the entire session.
              </p>
            </div>
            <div className={styles.musicLayerCard}>
              <span className={styles.musicLayerNum}>Layer 2</span>
              <h3 className={styles.musicLayerTitle}>Soft Rhythm <span className={styles.optional}>(Optional)</span></h3>
              <p className={styles.musicLayerDesc}>
                Slow 60 BPM heartbeat rhythm or a subtle temple bell every few minutes.
                Only add this layer if silence feels too abrupt for the practitioner.
              </p>
            </div>
            <div className={styles.musicLayerCard}>
              <span className={styles.musicLayerNum}>Layer 3</span>
              <h3 className={styles.musicLayerTitle}>Mantra Layer</h3>
              <p className={styles.musicLayerDesc}>
                Single calm voice chant with minimal echo.
                This layer carries the assigned mantra at low volume beneath the breath.
              </p>
            </div>
          </div>

          <div className={styles.musicPhaseGuide}>
            <h3 className={styles.musicPhaseHeading}>Phase-by-Phase Music Progression</h3>
            <div className={styles.musicPhaseGrid}>
              {phases.map((phase) => (
                <div key={phase.name} className={styles.musicPhaseCard} style={{ borderLeft: `3px solid ${phase.color}` }}>
                  <span className={styles.musicPhaseName} style={{ color: phase.color }}>{phase.days} — {phase.name}</span>
                  <p className={styles.musicPhaseRec}>{phase.music}</p>
                </div>
              ))}
            </div>
            <p className={styles.musicNote}>
              No audio files are included. Use the above structure as a guide when sourcing or composing
              background music for in-app meditation sessions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Completion Benefits ── */}
      <section className={styles.completionSection}>
        <div className={styles.container}>
          <p className={styles.eyebrowCenter}>What You Gain</p>
          <h2 className={styles.sectionTitle}>
            After <span className={styles.accent}>21 Days</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            After completing this 21-Day Dhyan Challenge, you will have established a strong
            meditation habit, improved concentration, emotional balance, breath control,
            and deeper spiritual grounding.
          </p>
          <div className={styles.benefitsGrid}>
            {completionBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Begin Your 21-Day Dhyān Practice</h2>
            <p className={styles.ctaSubtext}>
              Commit to 21 mornings. Sit. Breathe. Return.
              <br />The practice will do the rest.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.btnPrimary}>Join the Challenge</button>
              <button className={styles.btnSecondary} onClick={() => navigate("/knowledge")}>
                Back to Knowledge
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DhyanChallenge21;
