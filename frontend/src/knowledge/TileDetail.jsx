import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TileDetail.module.css"; // You can create this or use existing styles

const TileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTile();
  }, [id]);

  const fetchTile = async () => {
    try {
      setLoading(true);
      setError("");
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const url = `${API_BASE}/api/tiles/${id}`;
      const res = await fetch(url);
      const json = await res.json();

      if (res.ok && json.success) {
        setTile(json.data);
      } else {
        setError(json.message || "Tile not found");
      }
    } catch (err) {
      console.error("Error fetching tile:", err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return (
    <div className={styles.error}>
      <p className={styles.errorText}>{error}</p>
      <button className={styles.backButton} onClick={() => navigate("/knowledge")}>← Back to Knowledge</button>
    </div>
  );
  if (!tile) return (
    <div className={styles.notFound}>
      <p>Tile not found</p>
      <button className={styles.backButton} onClick={() => navigate("/knowledge")}>← Back to Knowledge</button>
    </div>
  );

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {tile.imageUrl && (
        <img
          src={tile.imageUrl.startsWith('http') ? tile.imageUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${tile.imageUrl}`}
          alt={tile.title}
          className={styles.image}
        />
      )}

      <h1 className={styles.title}>{tile.title}</h1>
      {tile.subtitle && <p className={styles.subtitle}>{tile.subtitle}</p>}

      <div className={styles.meta}>
        {tile.duration && <span className={styles.metaItem}>⏱️ {tile.duration}</span>}
        {tile.badgeText && <span className={styles.metaItem}>📌 {tile.badgeText}</span>}
        {tile.category && <span className={styles.metaItem}>📂 {tile.category}</span>}
      </div>

      {tile.fullDescription && (
        <div className={styles.description}>
          <p>{tile.fullDescription}</p>
        </div>
      )}

      {tile.lessons && tile.lessons.length > 0 && (
        <div className={styles.lessonsSection}>
          <h2 className={styles.lessonsTitle}>Sessions</h2>
          <div className={styles.lessonsList}>
            {tile.lessons.map((lesson) => (
              <div key={lesson.num} className={styles.lessonItem}>
                <span className={styles.lessonNum}>{String(lesson.num).padStart(2, "0")}</span>
                <span className={styles.lessonTitle}>{lesson.title}</span>
                <span className={styles.lessonDuration}>{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tile.summary && !tile.fullDescription && (
        <div className={styles.summary}>
          <p>{tile.summary}</p>
        </div>
      )}

      {tile.meta && Object.keys(tile.meta).length > 0 && (
        <div className={styles.additionalInfo}>
          <h3>Additional Information</h3>
          <pre>
            {JSON.stringify(tile.meta, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TileDetail;
