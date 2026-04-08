import express from "express";
import { listTiles, getTile } from "../controllers/tileController.js";

const router = express.Router();

// Public endpoint to list tiles by category
// GET /api/tiles?category=Sacred%20Wisdom
router.get("/", listTiles);

// Public endpoint to get a single tile by ID
// GET /api/tiles/:id
router.get("/:id", getTile);

export default router;
