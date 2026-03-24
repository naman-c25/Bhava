import React from "react";
import styles from "./SacredJourney.module.css";

function SacredJourney() {
  return (
    <section className={styles.sacredJourneySection}>
      <div className={styles.sacredContent}>
        <h1 className={styles.sacredTitle}>
          <span className={styles.titleBegin}>Begin Your </span>
          <span className={styles.titleSacred}>Sacred Journey</span>
        </h1>

        <p className={styles.sacredDescription}>
          Join 10K+ devotees who've already transformed their spiritual practice.
        </p>

        <div className={styles.sacredButtons}>
          <button className={styles.btnPreorder}>Get Started</button>
        </div>
      </div>
    </section>
  );
}

export default SacredJourney;
