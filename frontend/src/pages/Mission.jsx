import React from 'react'
import OurMission from '../components/OurMission'

export default function MissionPage() {
  return (
    <main>
      <OurMission fetchOnMount={true} />
    </main>
  )
}
