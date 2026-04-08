# Category Mapping System - Documentation

## Overview

The Category Mapping system connects admin panel categories to frontend section display titles. When content is created in the admin panel with a category code, it appears on the frontend under the correct section with a mapped display title.

## Category Mappings

| Admin Category     | Frontend Display Title           | Frontend Subtitle                                          |
| ------------------ | -------------------------------- | ---------------------------------------------------------- |
| `Sacred Wisdom`    | "Sacred Wisdom for Daily Living" | "Ancient teaching that illuminate modern devotional life." |
| `Daily Sacred`     | "Daily Sacred Rhythm"            | "Ancient disciplines for modern spiritual life."           |
| `Paths of Dharmic` | "Paths of Dharmic Wisdom"        | "Timeless paths to righteous living."                      |
| `Living Wisdom`    | "Living Wisdom"                  | "Wisdom for everyday living."                              |
| `Products`         | "Products"                       | "Sacred products for your spiritual journey."              |

## How It Works

### 1. Admin Panel Creates Content

- User goes to Admin Dashboard
- Selects a **Category** from the dropdown (e.g., "Sacred Wisdom")
- Fills in content details (title, subtitle, image, etc.)
- Clicks "Create"
- Content is saved to the database with the category code

### 2. Backend Stores and Serves Data

- **Tiles Model** (`backend/models/Tile.js`): Stores content with the category code
- **Tiles Controller** (`backend/controllers/tileController.js`): Handles CRUD operations
- **Public Tiles Route** (`backend/routes/tilesRoutes.js`): Exposes `/api/tiles` endpoint
  - Query: `GET /api/tiles?category=Sacred%20Wisdom`
  - Returns all tiles matching that category

### 3. Frontend Components Display Mapped Titles

Frontend components fetch data and use the category mapping function:

**Example: TrendingTeachings component**

```javascript
import { getDisplayTitle, getSubtitle } from "../utils/categoryMapping";

const CATEGORY = "Sacred Wisdom";

// Component fetches:
const url = `${API_BASE}/api/tiles?category=${encodeURIComponent(CATEGORY)}`;

// Component displays mapped title:
<h2>{getDisplayTitle(CATEGORY)}</h2>  // → "Sacred Wisdom for Daily Living"
<p>{getSubtitle(CATEGORY)}</p>         // → "Ancient teaching that illuminate..."
```

## Updated Components

The following frontend components have been updated to use the category mapping system:

1. **TrendingTeachings** (`src/knowledge/TrendingTeachings.jsx`)
   - Category: "Sacred Wisdom"
   - Displays in the "Sacred Wisdom for Daily Living" section

2. **DailyPractices** (`src/knowledge/DailyPractices.jsx`)
   - Category: "Daily Sacred"
   - Displays in the "Daily Sacred Rhythm" section

3. **LatestTeachings** (`src/knowledge/LatestTeachings.jsx`)
   - Category: "Living Wisdom"
   - Displays in the "Living Wisdom" section

4. **LearningPaths** (`src/knowledge/LearningPaths.jsx`)
   - Category: "Paths of Dharmic"
   - Displays in the "Paths of Dharmic Wisdom" section

## API Endpoints

### Public Endpoints (No Authentication Required)

```
GET /api/tiles
  - Query: ?category=CategoryName
  - Returns: All tiles matching the category
  - Example: /api/tiles?category=Sacred%20Wisdom

GET /api/tiles/:id
  - Returns: Single tile by ID
```

### Admin Endpoints (Authentication Required)

```
GET /api/admin/tiles?category=CategoryName
POST /api/admin/tiles (create)
GET /api/admin/tiles/:id
PUT /api/admin/tiles/:id (update)
DELETE /api/admin/tiles/:id (delete)
```

## Category Mapping Utility

**File:** `frontend/src/utils/categoryMapping.js`

### Functions:

```javascript
// Get display title for a category
getDisplayTitle(categoryCode);
// Example: getDisplayTitle("Sacred Wisdom") → "Sacred Wisdom for Daily Living"

// Get subtitle for a category
getSubtitle(categoryCode);
// Example: getSubtitle("Sacred Wisdom") → "Ancient teaching that illuminate..."

// Get all category mappings
getAllCategories();
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  ADMIN PANEL                                │
│  User creates content with category: "Sacred Wisdom"        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─▶ File upload (image)
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND DATABASE                               │
│  Tile {                                                     │
│    _id: "...",                                              │
│    title: "Karma Yoga",                                     │
│    subtitle: "Path of Action",                              │
│    category: "Sacred Wisdom",  ◄─── Category code stored   │
│    imageUrl: "/uploads/...",                                │
│    duration: "12 min",                                       │
│    badgeText: "8 sessions",                                  │
│    summary: "The discipline..."                              │
│  }                                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         PUBLIC API:  GET /api/tiles                         │
│  Query: ?category=Sacred%20Wisdom                           │
│  Returns: Array of matching tiles                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND COMPONENT                             │
│  TrendingTeachings.jsx                                      │
│                                                             │
│  1. Fetch: /api/tiles?category=Sacred%20Wisdom             │
│  2. Map tiles to display format                            │
│  3. Display mapped title + tiles:                          │
│     ┌─────────────────────────────────────────────┐        │
│     │ Sacred Wisdom for Daily Living              │        │
│     │ Ancient teaching that illuminate...          │        │
│     ├─────────────────────────────────────────────┤        │
│     │ [Card] Karma Yoga                           │        │
│     │ [Card] Bhakti Sutras                        │        │
│     │ [Card] Yoga Darshana                        │        │
│     └─────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Create Content in Admin Dashboard

- Navigate to `/admin`
- Login with admin credentials
- Select "Sacred Wisdom" from the Category dropdown
- Fill in Content Title, Image, Duration, Badge Status, Summary
- Click "Create"

### 2. Content Appears on Frontend

- Home page displays "Sacred Wisdom for Daily Living" section
- Your created content appears as cards in the section
- More content created = more cards visible

### 3. Mapping Updates

To add new categories or change display titles:

- Edit `frontend/src/utils/categoryMapping.js`
- Update the `categoryMapping` object
- Update components to use new category codes

## Example: Adding a New Category

1. **Add to categoryMapping.js:**

```javascript
"Community Wisdom": {
  displayTitle: "Community Wisdom & Connection",
  subtitle: "Sacred teachings through community engagement.",
},
```

2. **Create a new component or update existing:**

```javascript
const CATEGORY = "Community Wisdom";
```

3. **Component automatically fetches and displays with correct title**

## Troubleshooting

### Issue: Component shows "No teachings available"

- **Check:** Are there tiles with this category in the database?
- **Fix:** Use admin panel to create content with correct category name

### Issue: Content not appearing after creating in admin

- **Check:** Verify category matches exactly (case-sensitive)
- **Check:** Verify the tile was created successfully (check database)
- **Fix:** Clear browser cache and refresh

### Issue: Wrong title displaying

- **Check:** Verify categoryMapping.js has correct mapping
- **Check:** Verify component uses getDisplayTitle() function
- **Fix:** Update the mapping in categoryMapping.js

## Files Modified/Created

- ✅ `frontend/src/utils/categoryMapping.js` (NEW)
- ✅ `frontend/src/knowledge/TrendingTeachings.jsx` (UPDATED)
- ✅ `frontend/src/knowledge/DailyPractices.jsx` (UPDATED)
- ✅ `frontend/src/knowledge/LatestTeachings.jsx` (UPDATED)
- ✅ `frontend/src/knowledge/LearningPaths.jsx` (UPDATED)
- ✅ `backend/routes/tilesRoutes.js` (NEW)
- ✅ `backend/server.js` (UPDATED - added tilesRoutes)

## Future Enhancements

- Add category validation in admin panel
- Add category filtering in admin tiles list
- Cache category data on frontend for performance
- Add analytics to track which categories are most viewed
- Create admin dashboard for managing categories
