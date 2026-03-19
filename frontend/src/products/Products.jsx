import { useState, useEffect, useRef } from "react";
import styles from "./Products.module.css";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 0,
    category: "INCENSE",
    title: "Vedic Incense Series",
    price: "₹1,299",
    description: "Hand-rolled using 16th-century temple recipes, infused with Himalayan herbs and sacred mantras.",
    images: ["/incense.jpeg", "/incense.jpeg", "/incense.jpeg"],
  },
  {
    id: 1,
    category: "SAMBRANI",
    title: "Sacred Sambrani Cups",
    price: "₹899",
    description: "Purified resin sambrani with aromatic woods, perfect for daily pujas and sacred rituals.",
    images: ["/incense.jpeg", "/incense.jpeg", "/incense.jpeg"],
  },
  {
    id: 2,
    category: "DHOOP",
    title: "Temple Dhoop Sticks",
    price: "₹749",
    description: "Crafted from 108 medicinal herbs, each stick carries the blessing of traditional temple practitioners.",
    images: ["/incense.jpeg", "/incense.jpeg", "/incense.jpeg"],
  },
  {
    id: 3,
    category: "WELLNESS",
    title: "Sacred Anointing Oil",
    price: "₹1,599",
    description: "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
    images: ["/anionting.jpeg", "/anionting.jpeg", "/temple(4).jpeg"],
  },
  {
    id: 4,
    category: "MALA BEADS",
    title: "Rudraksha Japa Mala",
    price: "₹1,899",
    description: "108-bead genuine Rudraksha mala, energised with Shiva mantras — ideal for daily japa meditation.",
    images: ["/Daily Practices/Japa Mala.png", "/Daily Practices/Japa Mala.png", "/Daily Practices/Japa Mala.png"],
  },
  {
    id: 5,
    category: "POOJA",
    title: "Brass Pooja Thali Set",
    price: "₹2,199",
    description: "Complete handcrafted brass thali with diya, incense holder, bell and kumkum bowl for daily worship.",
    images: ["/pujaRituals.png", "/pujaRituals.png", "/Daily Practices/Aarti.png"],
  },
  {
    id: 6,
    category: "SOUND HEALING",
    title: "Om Chanting Bowl",
    price: "₹2,799",
    description: "Seven-metal Tibetan singing bowl tuned to 432 Hz, used for chakra balancing and deep meditation.",
    images: ["/Daily Practices/Mantra Chanting.png", "/mantrasPrayers.png", "/Daily Practices/Vedic Hymns.png"],
  },
  {
    id: 7,
    category: "AARTI",
    title: "Temple Camphor Kit",
    price: "₹449",
    description: "Pure natural camphor tablets with a brass camphor holder for evening aarti and puja ceremonies.",
    images: ["/Daily Practices/Aarti.png", "/pujaRituals.png", "/pujaRituals.png"],
  },
  {
    id: 8,
    category: "FRAGRANCE",
    title: "Nag Champa Sacred Oil",
    price: "₹799",
    description: "Cold-pressed Nag Champa essential oil extracted from rare flowers at Mysore's sacred gardens.",
    images: ["/anionting.jpeg", "/anionting.jpeg", "/temple(4).jpeg"],
  },
  {
    id: 9,
    category: "MURTI",
    title: "Ganesha Brass Idol",
    price: "₹3,999",
    description: "Hand-forged solid brass Ganesha idol — remover of obstacles, blessed at a Siddhi Vinayak temple.",
    images: ["/temple.png", "/templeBlessed.png", "/templeTraditions.png"],
  },
  {
    id: 10,
    category: "VESSEL",
    title: "Puja Copper Kalash",
    price: "₹1,499",
    description: "Pure copper sacred kalash engraved with auspicious symbols, used for Varuna puja and festivals.",
    images: ["/pujaRituals.png", "/pujaRituals.png", "/Daily Practices/Aarti.png"],
  },
  {
    id: 11,
    category: "AYURVEDA",
    title: "Vedic Herbs Bundle",
    price: "₹1,199",
    description: "Twelve sacred Ayurvedic herbs — Ashwagandha, Tulsi, Brahmi and more — for puja and wellness.",
    images: ["/Daily Practices/Vedic Hymns.png", "/vedicScriptures.png", "/Daily Practices/Meditation.png"],
  },
  {
    id: 12,
    category: "SCRIPTURE",
    title: "Bhagavad Gita (Sacred Ed.)",
    price: "₹649",
    description: "Illustrated Sanskrit–English Bhagavad Gita with commentary by Swami Prabhupada on handmade paper.",
    images: ["/Daily Practices/Gita Reading.png", "/vedicScriptures.png", "/vedicScriptures.png"],
  },
  {
    id: 13,
    category: "YOGA",
    title: "Surya Namaskar Kit",
    price: "₹2,499",
    description: "Eco jute yoga mat with printed Surya Namaskar guide, copper water bottle and sandalwood beads.",
    images: ["/Daily Practices/Kurya Namaskar.png", "/yogaWithOm.png", "/Learning Paths/Yoga Philosophy.png"],
  },
  {
    id: 14,
    category: "TILAK",
    title: "Sandalwood Tilak Set",
    price: "₹549",
    description: "Pure chandan paste with Kumkum, Vibhuti and Gopichandan — all four sacred tilak traditions.",
    images: ["/anionting.jpeg", "/anionting.jpeg", "/pujaRituals.png"],
  },
  {
    id: 15,
    category: "MEDITATION",
    title: "Meditation Cushion Set",
    price: "₹1,799",
    description: "Organic buckwheat-filled zafu cushion with zabuton mat, embroidered with Om and lotus patterns.",
    images: ["/Daily Practices/Meditation.png", "/meditation.png", "/yogaWithOm.png"],
  },
  {
    id: 16,
    category: "SACRED WATER",
    title: "Ganga Jal & Holy Herbs",
    price: "₹599",
    description: "Authentic Gangotri Ganga Jal in copper vessel with Panchamrit blend for abhishekam rituals.",
    images: ["/templeBlessed.png", "/temple.png", "/pujaRituals.png"],
  },
  {
    id: 17,
    category: "LAMP",
    title: "Himalayan Crystal Lamp",
    price: "₹3,499",
    description: "Hand-carved pink Himalayan salt lamp that emits negative ions, promoting calm and healing energy.",
    images: ["/Daily Practices/Meditation.png", "/Daily Practices/Meditation.png", "/meditation.png"],
  },
  {
    id: 18,
    category: "ULTRA PREMIUM",
    title: "Platinum Devotion Box",
    price: "₹4,999",
    description: "Limited edition curated selection — offerings from 12 sacred temples across India in one gift box.",
    images: ["/temple(4).jpeg", "/anionting.jpeg", "/anionting.jpeg"],
  },
  {
    id: 19,
    category: "MEDITATION KIT",
    title: "108-Day Sadhana Kit",
    price: "₹3,299",
    description: "Complete 108-day spiritual practice kit with mala, journal, incense, and daily intention cards.",
    images: ["/108-Day Mantra Sadhana.png", "/21 Dhyan Challenge.png", "/40 Day Gita Wisdom Path.png"],
  },
];

const FILTERS = ["All", "Pooja", "Meditation", "Mala", "Incense", "Scripture", "Yoga"];

const filterMap = {
  Pooja:      ["POOJA", "AARTI", "VESSEL", "SACRED WATER"],
  Meditation: ["MEDITATION", "SOUND HEALING", "LAMP", "MEDITATION KIT"],
  Mala:       ["MALA BEADS"],
  Incense:    ["INCENSE", "SAMBRANI", "DHOOP", "FRAGRANCE"],
  Scripture:  ["SCRIPTURE"],
  Yoga:       ["YOGA"],
};

function Products() {
  const { addToCart } = useCart();
  const [activeSlide, setActiveSlide] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const intervalRefs = useRef({});

  const handleAddToCart = (card) => {
    addToCart({
      productId: card.id,
      title: card.title,
      price: card.price,
      image: card.images[0] || "",
      category: card.category,
      quantity: 1,
    });
    setAddedId(card.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => filterMap[activeFilter]?.includes(p.category));

  useEffect(() => {
    if (hoveredCard !== null) {
      intervalRefs.current[hoveredCard] = setInterval(() => {
        setActiveSlide((prev) => {
          const cur = prev[hoveredCard] || 0;
          return { ...prev, [hoveredCard]: (cur + 1) % 3 };
        });
      }, 1500);
    }
    return () => {
      if (hoveredCard !== null && intervalRefs.current[hoveredCard]) {
        clearInterval(intervalRefs.current[hoveredCard]);
      }
    };
  }, [hoveredCard]);

  const handleMouseEnter = (id) => setHoveredCard(id);

  const handleMouseLeave = (id) => {
    setHoveredCard(null);
    if (intervalRefs.current[id]) clearInterval(intervalRefs.current[id]);
    setActiveSlide((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleDotClick = (id, idx) =>
    setActiveSlide((prev) => ({ ...prev, [id]: idx }));

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Sacred <span className={styles.heroAccent}>Products</span>
        </h1>
        <p className={styles.heroSub}>
          Authentic spiritual items curated from temples and artisans across India
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {filtered.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={() => handleMouseLeave(card.id)}
            >
              {/* Image slider */}
              <div className={styles.imageWrapper}>
                <div
                  className={styles.imageSlider}
                  style={{ transform: `translateX(-${(activeSlide[card.id] || 0) * 100}%)` }}
                >
                  {card.images.map((src, i) => (
                    <div key={i} className={styles.imageSlide}>
                      <img src={src} alt={`${card.title} view ${i + 1}`} />
                    </div>
                  ))}
                </div>

                {/* Add to Cart */}
                <button
                  className={`${styles.addToCart} ${addedId === card.id ? styles.addedToCart : ""}`}
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(card); }}
                >
                  {addedId === card.id ? "✓ Added!" : "Add to Cart"}
                </button>

                {/* Dots */}
                <div className={styles.dots}>
                  {card.images.map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.dot} ${(activeSlide[card.id] || 0) === i ? styles.dotActive : ""}`}
                      onClick={() => handleDotClick(card.id, i)}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <p className={styles.category}>{card.category}</p>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{card.title}</h3>
                  <span className={styles.price}>{card.price}</span>
                </div>
                <p className={styles.description}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
