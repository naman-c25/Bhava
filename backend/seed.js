import mongoose from "mongoose";
import dotenv from "dotenv";
import Tile from "./models/Tile.js";

dotenv.config();

const sampleTiles = [
  // Sacred Wisdom Category
  {
    title: "Karma Yoga",
    subtitle: "Path of Action",
    category: "Sacred Wisdom",
    badgeText: "8 sessions",
    duration: "12 min",
    summary: "The discipline of selfless action.",
    fullDescription:
      "Karma Yoga is the path of selfless action — doing your duty without attachment to the fruits of your work. Rooted in the Bhagavad Gita, it teaches that every action performed with pure intention becomes a form of worship, purifying the mind and dissolving the ego.",
    imageUrl: "/uploads/Timeless%20Wisdom/Karma%20Yoga.png",
    lessons: [
      { num: 1, title: "The Nature of Action", duration: "10 min" },
      { num: 2, title: "Selfless Service & Seva", duration: "12 min" },
      { num: 3, title: "Detachment from Results", duration: "14 min" },
      { num: 4, title: "Offering Work to the Divine", duration: "11 min" },
      { num: 5, title: "Karma & Dharma", duration: "13 min" },
      { num: 6, title: "Daily Practice of Karma Yoga", duration: "9 min" },
      { num: 7, title: "Purification Through Action", duration: "15 min" },
      { num: 8, title: "Integration & Living the Path", duration: "12 min" },
    ],
  },
  {
    title: "Bhakti Sutras",
    subtitle: "Science of Devotion",
    category: "Sacred Wisdom",
    badgeText: "6 sessions",
    duration: "8 min",
    summary: "The path of devotion and divine love.",
    fullDescription:
      "The Narada Bhakti Sutras are 84 aphorisms on the nature of divine love. Bhakti is not mere sentiment — it is the highest science of the heart, transforming ordinary human love into unconditional devotion to the Divine.",
    imageUrl: "/uploads/Timeless%20Wisdom/Bhakti%20Sutra.png",
    lessons: [
      { num: 1, title: "What is Bhakti?", duration: "8 min" },
      { num: 2, title: "Forms of Devotion", duration: "10 min" },
      { num: 3, title: "Navavidha Bhakti — Nine Forms", duration: "12 min" },
      { num: 4, title: "Surrender & Sharanagati", duration: "9 min" },
      { num: 5, title: "The Devotee's Daily Life", duration: "11 min" },
      { num: 6, title: "Para Bhakti — Supreme Love", duration: "14 min" },
    ],
  },
  {
    title: "Yoga Darshana",
    subtitle: "Patanjali's Path",
    category: "Sacred Wisdom",
    badgeText: "12 sessions",
    duration: "15 min",
    summary: "Union of body, mind and sacred awareness.",
    fullDescription:
      "The Yoga Sutras of Patanjali are 196 terse aphorisms defining the complete science of yoga. Far beyond physical postures, yoga is the cessation of the fluctuations of the mind.",
    imageUrl: "/uploads/Timeless%20Wisdom/Yoga%20Philosophy.png",
    lessons: [
      { num: 1, title: "Samadhi Pada — On Contemplation", duration: "15 min" },
      { num: 2, title: "The Eight Limbs of Yoga", duration: "18 min" },
      { num: 3, title: "Yama — Ethical Restraints", duration: "12 min" },
      { num: 4, title: "Niyama — Personal Observances", duration: "13 min" },
      { num: 5, title: "Asana & Pranayama", duration: "14 min" },
      { num: 6, title: "Pratyahara — Withdrawal", duration: "11 min" },
      { num: 7, title: "Dharana & Dhyana", duration: "16 min" },
      { num: 8, title: "Samadhi — The Goal", duration: "20 min" },
      { num: 9, title: "Vibhuti Pada — Powers", duration: "15 min" },
      { num: 10, title: "Kaivalya Pada — Liberation", duration: "17 min" },
      { num: 11, title: "Obstacles on the Path", duration: "12 min" },
      { num: 12, title: "Integration & Practice", duration: "13 min" },
    ],
  },
  {
    title: "Vedanta Foundations",
    subtitle: "Ultimate Reality",
    category: "Sacred Wisdom",
    badgeText: "10 sessions",
    duration: "10 min",
    summary: "Understanding the nature of the Self.",
    fullDescription:
      "Vedanta is the highest knowledge — the direct perception of Brahman, the infinite consciousness underlying all existence. This foundational series introduces the core teachings of Advaita Vedanta.",
    imageUrl: "/uploads/Timeless%20Wisdom/Vedanta%20Basics.png",
    lessons: [
      { num: 1, title: "What is Vedanta?", duration: "10 min" },
      { num: 2, title: "Brahman — Ultimate Reality", duration: "12 min" },
      { num: 3, title: "Maya & the Apparent World", duration: "14 min" },
      { num: 4, title: "Atman — The Inner Self", duration: "11 min" },
      { num: 5, title: "The Mahavakyas", duration: "13 min" },
      { num: 6, title: "Viveka & Vairagya", duration: "10 min" },
      { num: 7, title: "Neti Neti — Not This", duration: "12 min" },
      { num: 8, title: "Self-Enquiry Practice", duration: "15 min" },
      { num: 9, title: "The Three Bodies", duration: "11 min" },
      { num: 10, title: "Liberation — Moksha", duration: "18 min" },
    ],
  },
  {
    title: "Advaita Vedanta",
    subtitle: "Non-duality and Realization",
    category: "Sacred Wisdom",
    badgeText: "9 sessions",
    duration: "14 min",
    summary: "The path of non-dual understanding and Self-realization.",
    fullDescription:
      "Advaita Vedanta proclaims the radical non-dual truth: Brahman alone is real, the world is appearance, and the individual self is none other than the Supreme.",
    imageUrl: "/uploads/Timeless%20Wisdom/Dharma%20Ethics.png",
    lessons: [
      { num: 1, title: "What is Advaita?", duration: "12 min" },
      { num: 2, title: "The Reality of Brahman", duration: "14 min" },
      { num: 3, title: "The Unreality of Maya", duration: "15 min" },
      { num: 4, title: "Tat Tvam Asi — Thou Art That", duration: "16 min" },
      { num: 5, title: "The Witness Consciousness", duration: "13 min" },
      { num: 6, title: "Destroying False Identification", duration: "14 min" },
      { num: 7, title: "Direct Self-Knowledge", duration: "17 min" },
      { num: 8, title: "Living as Non-Dual Awareness", duration: "15 min" },
      { num: 9, title: "Freedom Beyond Concepts", duration: "18 min" },
    ],
  },
  {
    title: "Gita Wisdom",
    subtitle: "The Divine Song",
    category: "Sacred Wisdom",
    badgeText: "18 sessions",
    duration: "16 min",
    summary: "Wisdom from Lord Krishna's teachings on dharma and duty.",
    fullDescription:
      "The Bhagavad Gita is Lord Krishna's timeless dialogue with Arjuna on the battlefield of Kurukshetra. These 700 verses contain the complete knowledge of yoga, dharma, and the path to liberation.",
    imageUrl: "/uploads/Timeless%20Wisdom/Meditation%20Guide.png",
    lessons: [
      { num: 1, title: "Arjuna's Dilemma", duration: "12 min" },
      { num: 2, title: "Karma Yoga", duration: "14 min" },
      { num: 3, title: "Bhakti & Surrender", duration: "13 min" },
      { num: 4, title: "The Vision of the Universal Form", duration: "18 min" },
      { num: 5, title: "Knowledge & Wisdom", duration: "15 min" },
      { num: 6, title: "Yoga of Meditation", duration: "16 min" },
    ],
  },

  // Daily Sacred Category
  {
    title: "Morning Puja",
    subtitle: "Begin the day in devotion and gratitude.",
    category: "Daily Sacred",
    badgeText: "Daily practice",
    duration: "15–28 min",
    summary: "Sacred morning ritual to begin your day with devotion.",
    fullDescription:
      "A complete guide to the traditional morning Puja ritual. Learn how to prepare your sacred space and begin each day with intention, gratitude, and divine presence.",
    imageUrl: "/uploads/Daily%20Practices/Daily%20Puja.png",
    lessons: [
      { num: 1, title: "Preparing Your Sacred Space", duration: "8 min" },
      { num: 2, title: "Purification & Cleansing", duration: "10 min" },
      { num: 3, title: "Invocation & Sankalpa", duration: "9 min" },
      { num: 4, title: "Worship Sequence", duration: "12 min" },
      { num: 5, title: "Offerings & Mantras", duration: "14 min" },
    ],
  },
  {
    title: "Mantra Chanting",
    subtitle: "Sacred sound that steadies the mind",
    category: "Daily Sacred",
    badgeText: "108 repetitions",
    duration: "20 min",
    summary: "Sacred sound vibrations that calm and center the mind.",
    fullDescription:
      "Mantra chanting harnesses the power of sacred sound to stabilize and elevate consciousness. Through repetition and rhythm, transform your mental state.",
    imageUrl: "/uploads/Daily%20Practices/Mantra%20Chanting.png",
    lessons: [
      { num: 1, title: "The Science of Mantra", duration: "10 min" },
      { num: 2, title: "How to Chant", duration: "8 min" },
      { num: 3, title: "Maha Mantra", duration: "15 min" },
      { num: 4, title: "AM Chanting", duration: "12 min" },
      { num: 5, title: "Chanting Practices", duration: "20 min" },
    ],
  },
  {
    title: "Vedic Hymns",
    subtitle: "Ancient verses that invoke the divine.",
    category: "Daily Sacred",
    badgeText: "7 verses",
    duration: "7 min",
    summary: "Ancient verses from the Vedas for daily spiritual practice.",
    fullDescription:
      "The Vedic hymns are humanity's oldest prayers, addressed to celestial powers. Each hymn carries profound wisdom and transformative power.",
    imageUrl: "/uploads/Daily%20Practices/Vedic%20Hymns.png",
    lessons: [
      { num: 1, title: "Gayatri Mantra", duration: "8 min" },
      { num: 2, title: "Surya Hymns", duration: "10 min" },
      { num: 3, title: "Agni Hymns", duration: "9 min" },
    ],
  },
  {
    title: "Dhyana Meditation",
    subtitle: "Enter the stillness within.",
    category: "Daily Sacred",
    badgeText: "20 min session",
    duration: "20 min",
    summary: "Guided meditation to access inner peace and awareness.",
    fullDescription:
      "Dhyana is the practice of sustained, unbroken meditation. Learn to transcend the limited mind and access boundless consciousness and peace.",
    imageUrl: "/uploads/Daily%20Practices/Meditation.png",
    lessons: [
      { num: 1, title: "Preparation", duration: "5 min" },
      { num: 2, title: "Breath Awareness", duration: "8 min" },
      { num: 3, title: "Mantra Focus", duration: "10 min" },
      { num: 4, title: "Settling into Silence", duration: "15 min" },
    ],
  },
  {
    title: "Evening Aarti",
    subtitle: "Gratitude and Surrender",
    category: "Daily Sacred",
    badgeText: "Daily ritual",
    duration: "10 min",
    summary: "Sacred evening ritual to offer gratitude and surrender.",
    fullDescription:
      "Aarti is the waving of light before the deity, symbolizing the removal of ignorance. End your day with gratitude, surrender, and peace.",
    imageUrl: "/uploads/Daily%20Practices/Aarti.png",
    lessons: [
      { num: 1, title: "Meaning of Aarti", duration: "6 min" },
      { num: 2, title: "Preparing the Lamp", duration: "7 min" },
      { num: 3, title: "The Ritual", duration: "10 min" },
      { num: 4, title: "Aarti Mantras", duration: "8 min" },
    ],
  },
  {
    title: "Sacred Breathing",
    subtitle: "Pranayama for Vitality",
    category: "Daily Sacred",
    badgeText: "12 sessions",
    duration: "15 min",
    summary: "Ancient breathing techniques to enhance prana and vitality.",
    fullDescription:
      "Pranayama expands the vital life force through controlled breathing. Feel renewed energy, mental clarity, and spiritual awakening.",
    imageUrl: "/uploads/Daily%20Practices/Kurya%20Namaskar.png",
    lessons: [
      { num: 1, title: "Understanding Prana", duration: "8 min" },
      { num: 2, title: "Ujjayi Breath", duration: "12 min" },
      { num: 3, title: "Nadi Shodhana", duration: "15 min" },
      { num: 4, title: "Kapalabhati", duration: "10 min" },
    ],
  },

  // Paths of Dharmic Category
  {
    title: "108 Days of Devotion",
    subtitle: "A sacred journey into the path of Bhakti.",
    category: "Paths of Dharmic",
    badgeText: "287K joined",
    duration: "Full Course",
    summary: "A transformative 108-day journey into devotional practice.",
    fullDescription:
      "A complete 108-day transformation program. Each day, practice devotional techniques, chanting, and meditation to awaken your heart.",
    imageUrl: "/uploads/Learning%20Paths/108%20Days%20of%20Devotion.png",
    lessons: [
      { num: 1, title: "Month 1: Foundation", duration: "Daily" },
      { num: 2, title: "Month 2: Deepening", duration: "Daily" },
      { num: 3, title: "Month 3: Mastery", duration: "Daily" },
      { num: 4, title: "Integration Module", duration: "7 days" },
    ],
  },
  {
    title: "Bhagavad Gita Journey",
    subtitle: "The timeless dialogue on dharma and inner mastery.",
    category: "Paths of Dharmic",
    badgeText: "456K joined",
    duration: "Full Course",
    summary: "Explore the wisdom of the Bhagavad Gita chapter by chapter.",
    fullDescription:
      "Study all 18 chapters of the Bhagavad Gita. Understand Krishna's teachings on duty, yoga, knowledge, and the path to liberation.",
    imageUrl: "/uploads/Learning%20Paths/Bhagvat%20Gita%20Journey.png",
    lessons: [
      { num: 1, title: "Chapter 1-2: The Problem", duration: "20 min" },
      { num: 2, title: "Chapter 3-6: Karma Yoga", duration: "25 min" },
      { num: 3, title: "Chapter 7-12: Bhakti", duration: "30 min" },
      {
        num: 4,
        title: "Chapter 13-18: Knowledge & Liberation",
        duration: "35 min",
      },
    ],
  },
  {
    title: "Upanishad Wisdom",
    subtitle: "Exploring the nature of the Self and ultimate reality.",
    category: "Paths of Dharmic",
    badgeText: "198K joined",
    duration: "Full Course",
    summary: "Deep teachings on consciousness and the nature of reality.",
    fullDescription:
      "The Upanishads are humanity's most profound spiritual teachings. Explore the nature of Brahman, consciousness, and non-dual reality.",
    imageUrl: "/uploads/Learning%20Paths/Upanishad%20Wisdom.png",
    lessons: [
      { num: 1, title: "Isha Upanishad", duration: "30 min" },
      { num: 2, title: "Kena Upanishad", duration: "28 min" },
      { num: 3, title: "Katha Upanishad", duration: "35 min" },
    ],
  },
  {
    title: "Yoga Philosophy",
    subtitle: "The science of inner discipline and consciousness.",
    category: "Paths of Dharmic",
    badgeText: "342K joined",
    duration: "Full Course",
    summary: "Master the philosophy and practice of classical Yoga.",
    fullDescription:
      "Study the complete philosophy of Yoga from ancient texts. Learn all eight limbs and their application in modern life.",
    imageUrl: "/uploads/Learning%20Paths/Yoga%20Philosophy.png",
    lessons: [
      { num: 1, title: "The Eight Limbs", duration: "45 min" },
      { num: 2, title: "Asana & Pranayama", duration: "40 min" },
      { num: 3, title: "Meditation & Samadhi", duration: "50 min" },
    ],
  },
  {
    title: "Bhakti Path",
    subtitle: "The Way of Devotion",
    category: "Paths of Dharmic",
    badgeText: "512K joined",
    duration: "Full Course",
    summary: "Journey through pure devotion and love for the Divine.",
    fullDescription:
      "The path of devotion that transforms the heart. Through love, surrender, and service, realize the Divine within.",
    imageUrl: "/uploads/Learning%20Paths/Deity%20Wisdom.png",
    lessons: [
      { num: 1, title: "Heart Opening", duration: "35 min" },
      { num: 2, title: "Chanting & Kirtans", duration: "40 min" },
      { num: 3, title: "Divine Love", duration: "45 min" },
    ],
  },
  {
    title: "Karma Yoga Path",
    subtitle: "Selfless Action",
    category: "Paths of Dharmic",
    badgeText: "298K joined",
    duration: "Full Course",
    summary: "The path of selfless service and right action.",
    fullDescription:
      "Master the yoga of action. Perform all duties with perfection and detachment, transforming work into worship.",
    imageUrl: "/uploads/Learning%20Paths/Vedic%20Chanting.png",
    lessons: [
      { num: 1, title: "Understanding Karma", duration: "30 min" },
      { num: 2, title: "Duty & Dharma", duration: "35 min" },
      { num: 3, title: "Detachment & Excellence", duration: "40 min" },
    ],
  },

  // Living Wisdom Category
  {
    title: "Karma & Dharma",
    subtitle: "Understanding right action and sacred duty.",
    category: "Living Wisdom",
    badgeText: "Core Teaching",
    duration: "12 min",
    summary: "Learn how to live in alignment with dharma and karma.",
    fullDescription:
      "Understand the cosmic laws of action and consequence. Live in harmony with your purpose and the universal order.",
    imageUrl: "/uploads/Latest%20Teachings/Karma%20Dharma.png",
    lessons: [
      { num: 1, title: "What is Karma?", duration: "10 min" },
      { num: 2, title: "What is Dharma?", duration: "12 min" },
      { num: 3, title: "Living Dharmic Life", duration: "14 min" },
    ],
  },
  {
    title: "Divine Grace",
    subtitle: "The quiet power of devotion and surrender.",
    category: "Living Wisdom",
    badgeText: "Personal Practice",
    duration: "14 min",
    summary: "Discover the transformative power of surrender and grace.",
    fullDescription:
      "Grace is the Divine's gift to those who surrender. Learn to open yourself to receive blessings beyond effort.",
    imageUrl: "/uploads/Latest%20Teachings/Divine%20Grace.png",
    lessons: [
      { num: 1, title: "Understanding Grace", duration: "10 min" },
      { num: 2, title: "Surrender", duration: "12 min" },
      { num: 3, title: "Receiving Grace", duration: "14 min" },
    ],
  },
  {
    title: "Inner Stillness",
    subtitle: "Discovering peace beyond the restless mind.",
    category: "Living Wisdom",
    badgeText: "Meditation Guide",
    duration: "18 min",
    summary: "Find lasting peace through inner stillness and meditation.",
    fullDescription:
      "Beyond thought lies infinite peace. Access the silence within and transcend the turbulent mind.",
    imageUrl: "/uploads/Latest%20Teachings/Inner%20Peace.png",
    lessons: [
      { num: 1, title: "The Noise of Mind", duration: "8 min" },
      { num: 2, title: "Gateway to Silence", duration: "12 min" },
      { num: 3, title: "Dwelling in Peace", duration: "15 min" },
    ],
  },
  {
    title: "Sacred Traditions",
    subtitle: "Ritual practices that carry timeless meaning.",
    category: "Living Wisdom",
    badgeText: "Practices",
    duration: "16 min",
    summary: "Understand the meaning and value of sacred traditions.",
    fullDescription:
      "Sacred traditions carry the wisdom of ages. Learn how rituals connect us to the Divine and transform consciousness.",
    imageUrl: "/uploads/Latest%20Teachings/Sacred%20Traditions.png",
    lessons: [
      { num: 1, title: "Power of Ritual", duration: "10 min" },
      { num: 2, title: "Daily Practices", duration: "12 min" },
      { num: 3, title: "Festival Observances", duration: "14 min" },
    ],
  },
  {
    title: "Mindful Living",
    subtitle: "Presence in Every Moment",
    category: "Living Wisdom",
    badgeText: "Modern Practice",
    duration: "12 min",
    summary: "Bring sacred awareness to everyday activities.",
    fullDescription:
      "Transform ordinary moments into sacred experiences through mindful presence and awareness.",
    imageUrl: "/uploads/Latest%20Teachings/Non%20Dual%20Wisdom.png",
    lessons: [
      { num: 1, title: "Present Moment Awareness", duration: "10 min" },
      { num: 2, title: "Mindful Daily Activities", duration: "12 min" },
      { num: 3, title: "Sacred Perception", duration: "14 min" },
    ],
  },
  {
    title: "Service and Compassion",
    subtitle: "Love in Action",
    category: "Living Wisdom",
    badgeText: "Teaching",
    duration: "13 min",
    summary: "Express divinity through service to all beings.",
    fullDescription:
      "Serve all beings as expressions of the Divine. Transform compassion into action that heals.",
    imageUrl: "/uploads/Latest%20Teachings/Path%20of%20Union.png",
    lessons: [
      { num: 1, title: "Compassion Cultivation", duration: "10 min" },
      { num: 2, title: "Service Principles", duration: "12 min" },
      { num: 3, title: "Love in Action", duration: "14 min" },
    ],
  },

  // Products Category
  {
    title: "Vedic Incense Series",
    subtitle: "Hand-rolled temple incense.",
    category: "Products",
    badgeText: "₹1,299",
    duration: "Premium Quality",
    summary:
      "Hand-rolled using 16th-century temple recipes, infused with Himalayan herbs and sacred mantras.",
    fullDescription:
      "Handcrafted temple-grade incense using ancient formulas. Each stick carries the vibration of sacred mantras and the purity of Himalayan botanicals.",
    imageUrl: "/uploads/Products/Home Page Incense.png",
    lessons: [
      { num: 1, title: "About Temple Incense", duration: "3 min" },
      { num: 2, title: "Using in Puja", duration: "5 min" },
    ],
  },
  {
    title: "Sacred Sambrani Cups",
    subtitle: "Purified resin sambrani.",
    category: "Products",
    badgeText: "₹899",
    duration: "Natural Resin",
    summary:
      "Purified resin sambrani with aromatic woods, perfect for daily pujas and sacred rituals.",
    fullDescription:
      "Pure sambrani resin with natural aromatic woods. Traditional choice for temple sanctification and personal rituals.",
    imageUrl: "/uploads/Products/Home Page Sambrani.png",
    lessons: [
      { num: 1, title: "What is Sambrani", duration: "3 min" },
      { num: 2, title: "Using for Ritual", duration: "4 min" },
    ],
  },
  {
    title: "Rudraksha Japa Mala",
    subtitle: "Traditional prayer beads.",
    category: "Products",
    badgeText: "₹749",
    duration: "108 Beads",
    summary:
      "Authentic rudraksha mala beads for mantra practice and meditation.",
    fullDescription:
      "108 authentic rudraksha beads strung with sacred intention. Perfect for japa (mantra repetition) and deepening your meditation practice.",
    imageUrl: "/uploads/Products/Home Page mala.png",
    lessons: [
      { num: 1, title: "Rudraksha Benefits", duration: "4 min" },
      { num: 2, title: "How to Use Mala", duration: "6 min" },
    ],
  },
  {
    title: "Pooja Brass Thali Set",
    subtitle: "Premium brass thali.",
    category: "Products",
    badgeText: "₹1,599",
    duration: "Handcrafted",
    summary:
      "Traditional brass thali set for daily pujas and sacred ceremonies.",
    fullDescription:
      "Handcrafted brass thali with traditional design. Essential for temple worship and daily puja rituals.",
    imageUrl: "/uploads/Products/Home Page Brass Thali.png",
    lessons: [
      { num: 1, title: "Thali in Worship", duration: "3 min" },
      { num: 2, title: "Arrangement Guide", duration: "5 min" },
    ],
  },
  {
    title: "Sacred Anointing Oil",
    subtitle: "Ayurvedic ritual oil.",
    category: "Products",
    badgeText: "₹2,499",
    duration: "Pure Blend",
    summary:
      "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
    fullDescription:
      "Pure Ayurvedic oil blend with sacred herbs. Used in temple rituals and home abhishekam ceremonies.",
    imageUrl: "/uploads/Products/Home Page Oil.png",
    lessons: [
      { num: 1, title: "Oil Benefits", duration: "4 min" },
      { num: 2, title: "Ritual Application", duration: "5 min" },
    ],
  },
  {
    title: "Platinum Devotion Box",
    subtitle: "Premium curated collection.",
    category: "Products",
    badgeText: "₹4,999",
    duration: "Limited Edition",
    summary:
      "Limited edition curated selection—offerings from 12 sacred temples across India.",
    fullDescription:
      "Exquisite collection of sacred items from India's most revered temples. The ultimate gift for a spiritual practitioner.",
    imageUrl: "/uploads/Products/Home Page Devotion Box.png",
    lessons: [
      { num: 1, title: "Collection Contents", duration: "5 min" },
      { num: 2, title: "Temple Origins", duration: "8 min" },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✓ Connected to MongoDB");

    // Clear existing tiles
    await Tile.deleteMany({});
    console.log("✓ Cleared existing tiles");

    // Insert sample tiles
    const result = await Tile.insertMany(sampleTiles);
    console.log(
      `✓ Created ${result.length} sample tiles with detailed lessons`,
    );

    // Show summary by category
    const categories = await Tile.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("\n📊 Tiles by Category:");
    categories.forEach((cat) => {
      console.log(`   ${cat._id}: ${cat.count} tiles`);
    });

    console.log("\n✅ Seed data with lessons created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();
