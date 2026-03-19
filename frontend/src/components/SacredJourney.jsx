import React from "react";
import styles from "./SacredJourney.module.css";

function SacredJourney() {
  return (
    <section className={styles.sacredJourneySection}>
      <div className={styles.sacredContent}>
        <h1 className={styles.sacredTitle}>
          <span className={styles.titleBegin}>Begin Your</span>{' '}
          <span className={styles.titleSacred}>Sacred Journey</span>
          <span className={styles.titleGreen}>Begin Your </span>
          <span className={styles.titleOrange}>Sacred Journey</span>
        </h1>

        <p className={styles.sacredDescription}>
          Join 10K+ devotees who've already transformed their spiritual practice. Pre-order our launch
          collections now and lock in founding member pricing (30% discount). Limited slots available.
        </p>

        <div className={styles.sacredButtons}>
          <button style={{backgroundColor: "#F4EFE6" , width : "50%" , fontSize: "0.95rem", padding: "12px 25px",borderRadius:"30px", height : "40%"}} className={styles.ctaButton}>Pre-Order Now (₹1,299)</button>
          <button className={styles.btnPreorder}>Pre-Order Now (₹1,299)</button>
        </div>
      </div>
    </section>
  );
}

export default SacredJourney;
