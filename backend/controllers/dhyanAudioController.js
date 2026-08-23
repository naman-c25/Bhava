import DhyanAudio from "../models/DhyanAudio.js";
import { uploadToBlob } from "../utils/uploadToBlob.js";

export const upsertDhyanAudio = async (req, res, next) => {
  try {
    const day = Number(req.params.day);
    if (!day || day < 1 || day > 21) {
      return res
        .status(400)
        .json({ success: false, message: "Day must be between 1 and 21" });
    }

    // Each field is independently optional — a request can carry just an
    // audio file, just the name/deity text, or any combination, without
    // clobbering fields it didn't touch.
    const update = {};
    if (req.file) update.audioUrl = await uploadToBlob(req.file, "dhyan-audio");
    if (req.body.name !== undefined) update.name = req.body.name;
    if (req.body.deity !== undefined) update.deity = req.body.deity;

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update — provide audio, name, or deity" });
    }

    const entry = await DhyanAudio.findOneAndUpdate(
      { day },
      { day, ...update },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
    );
    res.json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

export const listDhyanAudio = async (req, res, next) => {
  try {
    const items = await DhyanAudio.find().sort({ day: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

export const deleteDhyanAudio = async (req, res, next) => {
  try {
    const day = Number(req.params.day);
    const entry = await DhyanAudio.findOneAndDelete({ day });
    if (!entry)
      return res
        .status(404)
        .json({ success: false, message: "No audio found for that day" });
    res.json({ success: true, message: "Audio deleted" });
  } catch (err) {
    next(err);
  }
};
