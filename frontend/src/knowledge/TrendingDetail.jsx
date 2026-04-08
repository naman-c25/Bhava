import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TrendingDetail.module.css";

const TrendingDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTile();
  }, [slug]);

  const fetchTile = async () => {
    try {
      setLoading(true);
      setError("");
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const url = `${API_BASE}/api/tiles/${slug}`;
      const res = await fetch(url);
      const json = await res.json();

      if (res.ok && json.success) {
        setTile(json.data);
      } else {
        setError(json.message || "Teaching not found");
      }
    } catch (err) {
      console.error("Error fetching tile:", err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.notFound}><div>Loading...</div></div>;
  if (error) return (
    <div className={styles.notFound}>
      <p>{error}</p>
      <button className={styles.backBtn} onClick={() => navigate("/knowledge")}>← Back to Knowledge</button>
    </div>
  );
  if (!tile) return (
    <div className={styles.notFound}>
      <p>Teaching not found</p>
      <button className={styles.backBtn} onClick={() => navigate("/knowledge")}>← Back to Knowledge</button>
    </div>
  );

  return (
    <div className={styles.detailPage}>
      {/* Hero Section */}
      <div className={styles.detailHero}>
        {tile.imageUrl && (
          <>
            <div className={styles.heroImageWrap}>
              <img
                src={tile.imageUrl.startsWith('http') ? tile.imageUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${tile.imageUrl}`}
                alt={tile.title}
                className={styles.heroImage}
              />
            </div>
            <div className={styles.heroOverlay}></div>
          </>
        )}

        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>

          {tile.category && <div className={styles.heroSub}>{tile.category}</div>}
          <h1 className={styles.heroTitle}>{tile.title}</h1>
          {tile.subtitle && <p className={styles.heroTeacher}>{tile.subtitle}</p>}

          <div className={styles.heroMeta}>
            {tile.duration && <span>{tile.duration}</span>}
            {tile.badgeText && (
              <>
                <span className={styles.dot}>•</span>
                <span>{tile.badgeText}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className={styles.detailBody}>
        <div className={styles.detailContainer}>
          {tile.fullDescription && (
            <div className={styles.detailDescription}>
              {tile.fullDescription}
            </div>
          )}

          {tile.lessons && tile.lessons.length > 0 && (
            <>
              <h2 className={styles.lessonsHeading}>Sessions</h2>
              <div className={styles.lessonsList}>
                {tile.lessons.map((lesson) => (
                  <div key={lesson.num} className={styles.lessonItem}>
                    <span className={styles.lessonNum}>{String(lesson.num).padStart(2, "0")}</span>
                    <span className={styles.lessonTitle}>{lesson.title}</span>
                    <span className={styles.lessonDuration}>{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tile.summary && !tile.fullDescription && (
            <div className={styles.detailDescription}>
              {tile.summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingDetail;