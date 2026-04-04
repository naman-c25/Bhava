import React from "react";
import styles from "./KnowledgeHero.module.css";

function KnowledgeHero() {
  return (
    <div className={styles.knowledgeHeroesSection}>
      <div className={styles.heroesLeft}>
        <h1 className={styles.knowledgeMainTitles}>
          <span style={{ color: '#4A0B1D' }}>Enter the Path of</span>
          <br />
          <span style={{ color: "#E07B39" }}>Inner Illumination</span>
        </h1>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary}>Begin Your Journey</button>
        </div>
      </div>
      <div className={styles.heroesRight}>
        <img src="/Bhakti .png" alt="Bhakti" className={styles.heroesBhaktiImg} />
      </div>
    </div>
  );
}

export default KnowledgeHero;
