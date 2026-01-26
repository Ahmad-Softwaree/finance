import "dotenv/config";
import { reset, seed } from "drizzle-seed";
import { db } from "./drizzle";
import { categories, transactions } from "./db/schema";

async function seedDb() {
  try {
    console.log("🌱 Seeding database...");

    // Reset tables
    await reset(db, { categories, transactions });

    // Seed with refine to handle relationships
    await seed(db, { categories, transactions }).refine((funcs) => ({
      categories: {
        count: 10,
        columns: {
          userId: funcs.default({
            defaultValue: "user_38boDM1bpJYvlOX4sBwbxKnx4Nd",
          }),
        },
      },
      transactions: {
        count: 100,
        columns: {
          userId: funcs.default({
            defaultValue: "user_38boDM1bpJYvlOX4sBwbxKnx4Nd",
          }),
          amount: funcs.number({ minValue: 10, maxValue: 5000, precision: 2 }),
          enDesc: funcs.loremIpsum({ sentencesCount: 1 }),
          arDesc: funcs.loremIpsum({ sentencesCount: 1 }),
          ckbDesc: funcs.loremIpsum({ sentencesCount: 1 }),
        },
      },
    }));

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seedDb()
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  })
  .then(() => {
    console.log("🎉 Seed script completed");
    process.exit(0);
  });
