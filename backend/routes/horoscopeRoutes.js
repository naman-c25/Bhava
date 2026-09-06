import express from "express";
import { getDailyHoroscope, getMonthHoroscope } from "../controllers/horoscopeController.js";

const router = express.Router();

// Public endpoint for the Daily Horoscope page
// GET /api/horoscope/daily?sign=aries
router.get("/daily", getDailyHoroscope);

// Full-month calendar grid for the date picker
// GET /api/horoscope/month?sign=aries&month=2026-09
router.get("/month", getMonthHoroscope);

export default router;
