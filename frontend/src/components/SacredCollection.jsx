import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./SacredCollection.module.css";
import { useCart } from "../context/CartContext";

const GAP = 20;
const VISIBLE = 4;
const STEP = 2;
const INTERVAL = 3000; // ms between each slide

const cards = [
  {
    id: 0,
    category: "INCENSE",
    title: "Vedic Incense Series",
    price: "₹1,299",
    description: "Hand-rolled using 16th-century temple recipes, infused with Himalayan herbs and sacred mantras.",
    image: "./incense.jpeg",
  },
  {
    id: 1,
    category: "SAMBRANI",
    title: "Sacred Sambrani Cups",
    price: "₹899",
    description: "Purified resin sambrani with aromatic woods, perfect for daily pujas and sacred rituals.",
    image: "./incense.jpeg",
  },
  {
    id: 2,
    category: "DHOOP",
    title: "Temple Dhoop Sticks",
    price: "₹749",
    description: "Crafted from 108 medicinal herbs, each stick carries the blessing of traditional temple practitioners.",
    image: "./incense.jpeg",
  },
  {
    id: 3,
    category: "WELLNESS",
    title: "Sacred Anointing Oil",
    price: "₹1,599",
    description: "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
    image: "./anionting.jpeg",
  },
  {
    id: 4,
    category: "MEDITATION",
    title: "Meditation Ritual Kit",
    price: "₹2,499",
    description: "Complete set for daily sadhana with premium incense, oil, and guided dharma cards.",
    image: "./anionting.jpeg",
  },
  {
    id: 5,
    category: "ULTRA PREMIUM",
    title: "Platinum Devotion Box",
    price: "₹4,999",
    description: "Limited edition curated selection—offerings from 12 sacred temples across India.",
    image: "./anionting.jpeg",
  },
];

// Duplicate for seamless infinite loop
// loopedCards[0..5] = original, loopedCards[6..11] = clone
// When rawIndex reaches 6, snap back to 0 invisibly (same visual)
const loopedCards = [...cards, ...cards];

function FlipCard({ card, width, onHoverStart, onHoverEnd, onAddToCart }) {
  const [flipped, setFlipped] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(card);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className={styles.cardOuter}
      style={width ? { flex: `0 0 ${width}px`, width } : {}}
      onMouseEnter={() => { setFlipped(true); onHoverStart(); }}
      onMouseLeave={() => { setFlipped(false); onHoverEnd(); }}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* BACK — image face, visible by default */}
        <div className={styles.cardBack}>
          <img src={card.image} alt={card.title} className={styles.cardBackImg} />
          <div className={styles.cardBackOverlay}>
            <span className={styles.cardBackCategory}>{card.category}</span>
            <p className={styles.cardBackTitle}>{card.title}</p>
          </div>
        </div>

        {/* FRONT — details face, revealed on hover flip */}
        <div className={styles.cardFront}>
          <div className={styles.cardFrontContent}>
            <div className={styles.frontTop}>
              <span className={styles.frontCategory}>{card.category}</span>
              <h3 className={styles.frontTitle}>{card.title}</h3>
              <p className={styles.frontPrice}>{card.price}</p>
            </div>
            <div className={styles.frontBottom}>
              <p className={styles.frontDescription}>{card.description}</p>
              <button
                className={`${styles.frontBtn} ${added ? styles.frontBtnAdded : ""}`}
                onClick={handleAdd}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SacredCollection() {
  const { addToCart } = useCart();
  const [cardWidth, setCardWidth] = useState(0);
  const [rawIndex, setRawIndex] = useState(0); // increases: 0 → 2 → 4 → 6, then snaps to 0
  const [animated, setAnimated] = useState(true); // false during instant snap-back
  const isPaused = useRef(false);
  const wrapperRef = useRef(null);

  const translateX = cardWidth ? -rawIndex * (cardWidth + GAP) : 0;

  // Measure wrapper width → card width
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        const w = wrapperRef.current.clientWidth;
        setCardWidth((w - GAP * (VISIBLE - 1)) / VISIBLE);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance — skips tick entirely when a card is hovered
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused.current) return;
      setRawIndex((prev) => prev + STEP);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // When rawIndex reaches cards.length (6), wait for the slide animation to
  // finish, then instantly snap back to 0 — loopedCards[6..9] visually
  // matches loopedCards[0..3] so the jump is invisible to the user.
  useEffect(() => {
    if (rawIndex < cards.length) return;
    const snapTimer = setTimeout(() => {
      setAnimated(false);
      setRawIndex((prev) => prev - cards.length);
    }, 700); // slightly longer than the 0.65s slide
    return () => clearTimeout(snapTimer);
  }, [rawIndex]);

  // Re-enable animation on the very next frame after the snap
  useEffect(() => {
    if (animated) return;
    const t = setTimeout(() => setAnimated(true), 30);
    return () => clearTimeout(t);
  }, [animated]);

  return (
    <div className={styles.sacredCollectionSection}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          Our Sacred <span className={styles.highlight}>Collections</span>
        </h1>

        <div className={styles.sliderWrapper} ref={wrapperRef}>
          <motion.div
            className={styles.sliderTrack}
            animate={{ x: translateX }}
            transition={{
              duration: animated ? 0.65 : 0,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {loopedCards.map((card, idx) => (
              <FlipCard
                key={`${card.id}-${idx}`}
                card={card}
                width={cardWidth}
                onHoverStart={() => { isPaused.current = true; }}
                onHoverEnd={() => { isPaused.current = false; }}
                onAddToCart={(c) => addToCart({
                  productId: `home-${c.id}`,
                  title: c.title,
                  price: c.price,
                  image: c.image,
                  category: c.category,
                  quantity: 1,
                })}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SacredCollection;
