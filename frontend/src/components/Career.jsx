import styles from "./Career.module.css";

function Career() {
  const jobListings = [
    {
      id: 1,
      title: "Sustainability Manager",
      type: "Full-Time",
      location: "Remote",
      description: "Lead our sustainability initiatives and partnerships.",
    },
    {
      id: 2,
      title: "Community Outreach Coordinator",
      type: "Part-Time",
      location: "On-Site",
      description: "Build and manage relationships with local communities.",
    },
    {
      id: 3,
      title: "Frontend Developer",
      type: "Full-Time",
      location: "Remote",
      description: "Develop and maintain our web platform using React.",
    },
  ];

  return (
    <div className={styles.careerPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Join Our Mission</h1>
        <p>
          Be part of a team dedicated to sustainability, community, and
          meaningful change.
        </p>
        <button className={styles.applyBtn}>View Open Positions</button>
      </section>

      {/* Why Join Us */}
      <section className={styles.whySection}>
        <h2>Why Work With Us?</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <span>🌱</span>
            <h3>Purpose-Driven Work</h3>
            <p>Every role contributes to a greener, better world.</p>
          </div>
          <div className={styles.card}>
            <span>🤝</span>
            <h3>Inclusive Culture</h3>
            <p>We celebrate diversity and foster belonging.</p>
          </div>
          <div className={styles.card}>
            <span>📈</span>
            <h3>Growth Opportunities</h3>
            <p>Learn, grow, and lead in your field.</p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className={styles.jobsSection}>
        <h2>Open Positions</h2>
        <div className={styles.jobList}>
          {jobListings.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobInfo}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className={styles.tags}>
                  <span className={styles.tag}>{job.type}</span>
                  <span className={styles.tag}>{job.location}</span>
                </div>
              </div>
              <button className={styles.applyBtn}>Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Career;