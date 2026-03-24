import express from "express";
import protect, { adminOnly } from "../middleware/authMiddleware.js";
import {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/careerController.js";

const router = express.Router();

// Public
router.post("/", submitApplication);

// Admin protected
router.get("/", protect, adminOnly, getApplications);
router.get("/:id", protect, adminOnly, getApplicationById);
router.patch("/:id/status", protect, adminOnly, updateApplicationStatus);
router.delete("/:id", protect, adminOnly, deleteApplication);

export default router;