import express from "express";
import { getMission } from "../controllers/missionController.js";

const router = express.Router();

// GET /api/mission
router.get("/", getMission);

export default router;
