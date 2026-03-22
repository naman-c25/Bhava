import React from "react";
import styles from "./HomeMain.module.css";

function HomeMain() {
  return (
    <div className={styles.homeMainHero}>

      <img
        src="./temple(4).png"
        alt="Temple Background"
        className={styles.homeMainHeroBgImage}
      />

      <div className={styles.homeMainContainer}>
        <div className={styles.homeMainTextLeft}>

          <h1 className={styles.homeMainHeroTitle}>
            <span className={styles.homeMainElevateText}> Awaken Bhava : Live Divine</span>
            <span className={styles.homeMainHighlight}>Every Day</span>
          </h1>

          <p className={styles.homeMainHeroDescription}>
           A structured ritual system to modern life.
          </p>

          <div className={styles.homeMainHeroButtons}>
            <button className={styles.homeMainBtnPrimary}>Begin Your Practice</button>
            <button className={styles.homeMainBtnSecondary}>Explore the System</button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HomeMain;
