// Simple controller to return mission content
export const getMission = (req, res) => {
  const payload = {
    title: "Our Mission",
    paragraph:
      "Bhava nurtures soulful journeys — guiding seekers to sacred places with care, reverence, and authentic knowledge. We cultivate meaningful connections between pilgrims and the living traditions they come to experience, so every visit is respectful, informed, and heart-led.",
    points: [
      {
        id: 1,
        title: "Connect People With Sacred Places",
        description:
          "Curated journeys and local partnerships that respect traditions and welcome the seeker.",
      },
      {
        id: 2,
        title: "Authentic & Reliable Information",
        description:
          "Verified local guides, temple contact details, and practical guidance for respectful visits.",
      },
    ],
  };

  res.json({ success: true, data: payload });
};
