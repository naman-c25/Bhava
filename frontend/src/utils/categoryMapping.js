/**
 * Maps admin category codes to frontend display titles
 * Admin saves with category codes, frontend displays with mapped titles
 */
export const categoryMapping = {
  "Sacred Wisdom": {
    displayTitle: "Sacred Wisdom for Daily Living",
    subtitle: "Ancient teaching that illuminate modern devotional life.",
  },
  "Daily Sacred": {
    displayTitle: "Daily Sacred Rhythm",
    subtitle: "Ancient disciplines for modern spiritual life.",
  },
  "Paths of Dharmic": {
    displayTitle: "Paths of Dharmic Wisdom",
    subtitle: "Timeless paths to righteous living.",
  },
  "Living Wisdom": {
    displayTitle: "Living Wisdom",
    subtitle: "Wisdom for everyday living.",
  },
  Products: {
    displayTitle: "Products",
    subtitle: "Sacred products for your spiritual journey.",
  },
};

/**
 * Get the display title for a category
 * @param {string} categoryCode - The admin category code
 * @returns {string} The display title
 */
export function getDisplayTitle(categoryCode) {
  return categoryMapping[categoryCode]?.displayTitle || categoryCode;
}

/**
 * Get the subtitle for a category
 * @param {string} categoryCode - The admin category code
 * @returns {string} The subtitle
 */
export function getSubtitle(categoryCode) {
  return categoryMapping[categoryCode]?.subtitle || "";
}

/**
 * Get all category mappings
 * @returns {object} The complete category mapping
 */
export function getAllCategories() {
  return categoryMapping;
}
