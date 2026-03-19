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
    title: "Meditation Ritual Kit",
    price: "₹749",
    description: "Crafted from 108 medicinal herbs, each stick carries the blessing of traditional temple practitioners.",
    images: ["/incense.jpeg", "/incense.jpeg", "/incense.jpeg"],
  },
  {
    id: 3,
    category: "WELLNESS",
    title: "Platinum Devotion Box",
    price: "₹1,599",
    description: "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
    images: ["/anionting.jpeg", "/anionting.jpeg", "/temple(4).jpeg"],
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
  const [hasLoaded, setHasLoaded] = useState({});
  const [failedCounts, setFailedCounts] = useState({});
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
                      <img
                        src={src}
                        alt={`${card.title} view ${i + 1}`}
                        onLoad={() => setHasLoaded((p) => ({ ...p, [card.id]: true }))}
                        onError={() => setFailedCounts((p) => ({ ...p, [card.id]: (p[card.id] || 0) + 1 }))}
                      />
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
              {/* If all slides failed to load, show centered message */}
              {failedCounts[card.id] === card.images.length && (
                <div className={styles.comingSoonOverlay}>
                  <div className={styles.comingSoonText}>Product coming soon</div>
                </div>
              )}

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
        {filtered.length >= 6 && (
          <div style={{ textAlign: "center", margin: "18px 0 48px" , fontSize:"60px", color:"rgb(30, 58, 48)" , fontFamily:"Canela, Cormorant, serif",}} className={styles.comingSoonRow}>
            Product coming soon
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
