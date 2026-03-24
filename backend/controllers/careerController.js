import Career from "../models/Career.js";

// ─────────────────────────────────────────────
// POST /api/career  — submit a job application (public)
// ─────────────────────────────────────────────
export const submitApplication = async (req, res) => {
  try {
    const { fullName, email, mobile, position, experience, coverLetter, resumeUrl } = req.body;

    // ── Required field check ──
    if (!fullName || !email || !mobile || !position || !experience || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: "All fields except resume are required.",
      });
    }

    // ── Mobile validation ──
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    // ── Email validation ──
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    // ── Cover letter length check ──
    if (coverLetter.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Cover letter must be at least 20 characters.",
      });
    }

    // ── Experience enum check ──
    const validExperience = ["fresher", "1-2 years", "3-5 years", "5+ years"];
    if (!validExperience.includes(experience)) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience level selected.",
      });
    }

    const application = await Career.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      position: position.trim(),
      experience,
      coverLetter: coverLetter.trim(),
      resumeUrl: resumeUrl ? resumeUrl.trim() : "",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully! We will contact you soon.",
      id: application._id,
    });

  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────
// GET /api/career  — get all applications (protected, admin)
// ─────────────────────────────────────────────
export const getApplications = async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
// GET /api/career/:id  — get single application (protected, admin)
// ─────────────────────────────────────────────
export const getApplicationById = async (req, res) => {
  try {
    const application = await Career.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/career/:id/status  — update status (protected, admin)
// ─────────────────────────────────────────────
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "reviewed", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const application = await Career.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to "${status}".`,
      application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/career/:id  — delete application (protected, admin)
// ─────────────────────────────────────────────
export const deleteApplication = async (req, res) => {
  try {
    const application = await Career.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Application deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};