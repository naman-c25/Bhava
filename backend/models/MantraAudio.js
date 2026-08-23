import mongoose from "mongoose";

const MantraAudioSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, unique: true, min: 1, max: 108 },
    audioUrl: { type: String },
    theme: { type: String },
    mantra: { type: String },
    note: { type: String },
  },
  { timestamps: true },
);

const MantraAudio = mongoose.model("MantraAudio", MantraAudioSchema);
export default MantraAudio;
