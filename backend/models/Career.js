import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address."],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required."],
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."],
    },
    position: {
      type: String,
      required: [true, "Position applied for is required."],
      trim: true,
    },
    experience: {
      type: String,
      enum: ["fresher", "1-2 years", "3-5 years", "5+ years"],
      required: [true, "Experience level is required."],
    },
    coverLetter: {
      type: String,
      required: [true, "Cover letter / message is required."],
      minlength: [20, "Cover letter must be at least 20 characters."],
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerApplicationSchema);
export default Career;