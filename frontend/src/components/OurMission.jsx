import React, { useEffect, useRef, useState } from 'react'
import styles from './OurMission.module.css'

export default function OurMission({ fetchOnMount = false }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // If the section becomes visible (e.g. user clicks nav link and scrolls), load content
  useEffect(() => {
    if (visible) loadMission()
  }, [visible])

  // optionally fetch immediately when rendered on a dedicated page
  useEffect(() => {
    if (fetchOnMount) loadMission()
  }, [fetchOnMount])

  async function loadMission() {
    if (data || loading) return
    // Ensure the section becomes visible immediately when loading is triggered
    // (e.g. user clicked the heading/button) so content doesn't stay hidden
    // waiting for the IntersectionObserver to fire.
    if (!visible) setVisible(true)
    setLoading(true)
    setError(null)
    try {
      const base = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${base}/api/mission`)
      // const res = await fetch('/api/mission')
      if (!res.ok) throw new Error('Network response was not ok')
      const json = await res.json()
      if (!json.success) throw new Error('API error')
      setData(json.data)
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="our-mission"
      ref={ref}
      className={`${styles.ourMission} transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className={styles.wrap}>
        <div className={styles.decorative} aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c2 2 4 4 4 6 0 2-2 3-4 5-2-2-4-3-4-5 0-2 2-4 4-6z" />
          </svg>
        </div>

        <h2 className={styles.heading} onClick={loadMission} role="button" tabIndex={0}>
          {data ? data.title : 'Our Mission'}
        </h2>

        {!data && (
          <div>
            <button
              onClick={loadMission}
              className="px-4 py-2 rounded-md bg-[#D4AF37] text-[#07382e] font-semibold shadow-sm hover:brightness-95 transition"
            >
              {loading ? 'Loading…' : 'Show Our Mission'}
            </button>
          </div>
        )}

        {error && <p className="text-red-300 mb-4">{error}</p>}

        {data && <p className={styles.lead}>{data.paragraph}</p>}

        {data && (
          <div className={styles.cards}>
            {data.points.map((p) => (
              <div key={p.id} className={styles.card}>
                <div className={styles.iconWrap} aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12h8M8 16h8" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardText}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
