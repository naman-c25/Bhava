import mongoose from "mongoose";
import dotenv from "dotenv";
import Tile from "./models/Tile.js";

dotenv.config();

async function testTiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✓ Connected to MongoDB");

    // List all tiles
    const allTiles = await Tile.find({});
    console.log(`\n📊 Total tiles in database: ${allTiles.length}`);

    if (allTiles.length > 0) {
      console.log("\n🔍 First 3 tiles:");
      allTiles.slice(0, 3).forEach((tile, idx) => {
        console.log(`\n${idx + 1}. ID: ${tile._id}`);
        console.log(`   Title: ${tile.title}`);
        console.log(`   Category: ${tile.category}`);
        console.log(`   Image: ${tile.imageUrl}`);
      });

      // Test fetching a specific tile
      console.log("\n\n🧪 Testing getTile function...");
      const firstTile = allTiles[0];
      const testTile = await Tile.findById(firstTile._id);

      if (testTile) {
        console.log(`✓ Successfully fetched tile by ID: ${testTile._id}`);
        console.log(`  Title: ${testTile.title}`);
      } else {
        console.log(`❌ Failed to fetch tile by ID: ${firstTile._id}`);
      }
    } else {
      console.log("\n⚠️ No tiles found in database. Run seed.js first.");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testTiles();
