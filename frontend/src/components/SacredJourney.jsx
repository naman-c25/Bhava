import styles from "./SacredJourney.module.css";

function SacredJourney() {
  return (
    <section className={styles.sacredJourneySection}>
      <div className={styles.sacredContent}>
        <h1 className={styles.sacredTitle}>Begin Your Sacred Journey Today</h1>
        
        <p className={styles.sacredDescription}>
          Join 10K+ devotees who've already transformed their spiritual practice. Pre-order our launch 
          collections now and lock in founding member pricing (30% discount). Limited slots available.
        </p>
        
        <div className={styles.sacredButtons}>
          <button className={styles.btnPreorder}>Pre-Order Now (₹1,299)</button>
          <button className={styles.btnCollection}>View Full Collection</button>
        </div>
      </div>
      
      <div className={styles.sacredBanner}>
        <p className={styles.bannerText}>
          Early Bird Pre-Orders Close in 15 Days | Founding Members Get 30% Off + Free Shipping |{' '}
          <span className={styles.bannerLink}>Claim Your Spot</span>
        </p>
      </div>
    </section>
  );
}

export default SacredJourney;
