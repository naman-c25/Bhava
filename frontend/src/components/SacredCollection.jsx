import { useState, useEffect, useRef } from "react";
import styles from "./SacredCollection.module.css";

const CARDS_PER_PAGE = 3;

function SacredCollection() {
  const [activeSlide, setActiveSlide] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [page, setPage] = useState(0);
  const intervalRefs = useRef({});

  useEffect(() => {
    if (hoveredCard !== null) {
      intervalRefs.current[hoveredCard] = setInterval(() => {
        setActiveSlide((prev) => {
          const currentSlide = prev[hoveredCard] || 0;
          const nextSlide = (currentSlide + 1) % 3;
          return {
            ...prev,
            [hoveredCard]: nextSlide,
          };
        });
      }, 1500);
    }

    return () => {
      if (hoveredCard !== null && intervalRefs.current[hoveredCard]) {
        clearInterval(intervalRefs.current[hoveredCard]);
      }
    };
  }, [hoveredCard]);

  const handleMouseEnter = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  const handleMouseLeave = (cardIndex) => {
    setHoveredCard(null);
    if (intervalRefs.current[cardIndex]) {
      clearInterval(intervalRefs.current[cardIndex]);
    }
    setActiveSlide((prev) => ({
      ...prev,
      [cardIndex]: 0,
    }));
  };

  const handleDotClick = (cardIndex, slideIndex) => {
    setActiveSlide((prev) => ({
      ...prev,
      [cardIndex]: slideIndex,
    }));
  };

  const cards = [
    {
      id: 0,
      category: "INCENSE",
      title: "Vedic Incense Series",
      price: "₹1,299",
      description: "Hand-rolled using 16th-century temple recipes, infused with Himalayan herbs and sacred mantras.",
      image: "./incense.jpeg",
      imageClass: styles.productImageEmoji
    },
    {
      id: 1,
      category: "SAMBRANI",
      title: "Sacred Sambrani Cups",
      price: "₹899",
      description: "Purified resin sambrani with aromatic woods, perfect for daily pujas and sacred rituals.",
      image: "./incense.jpeg",
      imageClass: styles.productImageEmoji
    },
    {
      id: 2,
      category: "DHOOP",
      title: "Temple Dhoop Sticks",
      price: "₹749",
      description: "Crafted from 108 medicinal herbs, each stick carries the blessing of traditional temple practitioners.",
      image: "./incense.jpeg",
      imageClass: styles.productImageEmoji
    },
    {
      id: 3,
      category: "WELLNESS",
      title: "Sacred Anointing Oil",
      price: "₹1,599",
      description: "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
      image: "./anionting.jpeg",
      imageClass: styles.productImagePhoto
    },
    {
      id: 4,
      category: "MEDITATION",
      title: "Meditation Ritual Kit",
      price: "₹2,499",
      description: "Complete set for daily sadhana with premium incense, oil, and guided dharma cards.",
      image: "./anionting.jpeg",
      imageClass: styles.productImagePhoto
    },
    {
      id: 5,
      category: "ULTRA PREMIUM",
      title: "Platinum Devotion Box",
      price: "₹4,999",
      description: "Limited edition curated selection—offerings from 12 sacred temples across India.",
      image: "./anionting.jpeg",
      imageClass: styles.productImagePhoto
    }
  ];

  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const visibleCards = cards.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <div className={styles.sacredCollectionSection}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          Our Sacred <span className={styles.highlight}>Collections</span>
        </h1>

        <div className={styles.gridWrapper}>
          <div className={styles.productsGrid}>
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className={styles.productCard}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
              >
                <div className={styles.productImageWrapper}>
                  <div
                    className={styles.productImageSlider}
                    style={{
                      transform: `translateX(-${(activeSlide[card.id] || 0) * 100}%)`,
                    }}
                  >
                    <div className={`${styles.productImage} ${card.imageClass}`}>
                      <img src={card.image} alt={`${card.title} - View 1`} />
                    </div>
                    <div className={`${styles.productImage} ${card.imageClass}`}>
                      <img src={card.image} alt={`${card.title} - View 2`} />
                    </div>
                    <div className={`${styles.productImage} ${card.imageClass}`}>
                      <img src={card.image} alt={`${card.title} - View 3`} />
                    </div>
                  </div>
                  <button className={styles.btnAddCart}>Add to Cart</button>
                  <div className={styles.carouselDots}>
                    <span
                      className={`${styles.dot} ${(activeSlide[card.id] || 0) === 0 ? styles.active : ""}`}
                      onClick={() => handleDotClick(card.id, 0)}
                    />
                    <span
                      className={`${styles.dot} ${(activeSlide[card.id] || 0) === 1 ? styles.active : ""}`}
                      onClick={() => handleDotClick(card.id, 1)}
                    />
                    <span
                      className={`${styles.dot} ${(activeSlide[card.id] || 0) === 2 ? styles.active : ""}`}
                      onClick={() => handleDotClick(card.id, 2)}
                    />
                  </div>
                </div>
                <div className={styles.productContent}>
                  <p className={styles.productCategory}>{card.category}</p>
                  <div className={styles.productHeader}>
                    <h3 className={styles.productTitle}>{card.title}</h3>
                    <div className={styles.productPriceContainer}>
                      <span className={styles.productPrice}>{card.price}</span>
                    </div>
                  </div>
                  <p className={styles.productDescription}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowLeft} ${page === 0 ? styles.arrowHidden : ""}`}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous products"
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowRight} ${page === totalPages - 1 ? styles.arrowHidden : ""}`}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default SacredCollection;
