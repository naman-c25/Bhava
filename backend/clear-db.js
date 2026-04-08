import mongoose from "mongoose";
import dotenv from "dotenv";
import Tile from "./models/Tile.js";

dotenv.config();

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✓ Connected to MongoDB");

    // Delete all tiles
    const result = await Tile.deleteMany({});
    console.log(`✓ Deleted ${result.deletedCount} tiles`);

    console.log("\n✅ Database cleared successfully!");
    console.log("\nNow you can:");
    console.log("1. Go to http://localhost:5173/admin");
    console.log("2. Create tiles with REAL images from your computer");
    console.log("3. Use these categories:");
    console.log("   - Sacred Wisdom");
    console.log("   - Daily Sacred");
    console.log("   - Paths of Dharmic");
    console.log("   - Living Wisdom");
    console.log("   - Products");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error.message);
    process.exit(1);
  }
}

clearDatabase();
