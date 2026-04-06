// import React from 'react'
// import styles from './SacredMissionSection.module.css'

// export default function SacredMissionSection() {
//   return (
//     <section className={styles.sacredMission} aria-labelledby="sacred-mission-title">
//       <div className={styles.container}>
//         <div className={styles.textCol}>
//           <h2 id="sacred-mission-title" className={styles.title}>Our Sacred Mission</h2>
//           <p className={styles.body}>
//             Bhava is redefining the spiritual economy by honoring ancient wisdom through premium,
//             authentic products. We believe that spirituality deserves the same craftsmanship and
//             excellence as any luxury category.
//           </p>

//           <p className={styles.body}>
//             Every product carries the energy of intention—sourced from temple partnerships,
//             blessed by traditional practitioners, and designed for modern devotees who refuse to
//             compromise on quality or authenticity.
//           </p>

//           <p className={styles.body}>
//             We are building a movement where faith, commerce, and sustainability align—creating
//             sacred spaces in every home, every heart, and every ritual.
//           </p>
//         </div>

//         <div className={styles.imageCol} aria-hidden>
//           <div
//             className={styles.image}
//             role="img"
//             aria-label="Illustration for Our Sacred Mission"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }


import React from 'react'
import styles from './SacredMissionSection.module.css'

export default function SacredMissionSection() {
  return (
    <section className={styles.sacredMission} aria-labelledby="sacred-mission-title">
      <div className={styles.panel}>

        <div className={styles.container}>

        <div className={styles.textCol}>
          <h2 id="sacred-mission-title" className={styles.title}>
            Our Sacred Mission
          </h2>
          <p className={styles.body}>
            Bhava is redefining the spiritual economy by honoring ancient wisdom through premium,
            authentic products. We believe that spirituality deserves the same craftsmanship and
            excellence as any luxury category.
          </p>
          <p className={styles.body}>
            Every product carries the energy of intention—sourced from temple partnerships,
            blessed by traditional practitioners, and designed for modern devotees who refuse to
            compromise on quality or authenticity.
          </p>
          <p className={styles.body}>
            We are building a movement where faith, commerce, and sustainability align—creating
            sacred spaces in every home, every heart, and every ritual.
          </p>
        </div>

        <div className={styles.imageCol}>
          <img
            src="/Sacred Mission.png"
            className={styles.image}
            alt="Praying figure illustration"
          />
        </div>

        </div>
      </div>
    </section>
  )
}