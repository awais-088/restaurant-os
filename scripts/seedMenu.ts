import { connectDB } from "../src/lib/mongodb";
import MenuCategory from "../src/models/MenuCategory";

const categories = [
  {
    name: "Pakistani",
    slug: "pakistani",
    description: "Traditional Pakistani favorites.",
    sortOrder: 1,
  },

  {
    name: "BBQ",
    slug: "bbq",
    description: "Freshly grilled BBQ favorites.",
    sortOrder: 2,
  },

  {
    name: "Chinese",
    slug: "chinese",
    description: "Chinese-inspired restaurant favorites.",
    sortOrder: 3,
  },

  {
    name: "Fast Food",
    slug: "fast-food",
    description: "Burgers, sandwiches and quick favorites.",
    sortOrder: 4,
  },

  {
    name: "Pizza",
    slug: "pizza",
    description: "Freshly prepared pizzas.",
    sortOrder: 5,
  },

  {
    name: "Pasta",
    slug: "pasta",
    description: "Creamy and flavorful pasta dishes.",
    sortOrder: 6,
  },

  {
    name: "Steaks",
    slug: "steaks",
    description: "Premium steak selections.",
    sortOrder: 7,
  },

  {
    name: "Beverages",
    slug: "beverages",
    description: "Cold and refreshing beverages.",
    sortOrder: 8,
  },

  {
    name: "Desserts",
    slug: "desserts",
    description: "Sweet finishes to your meal.",
    sortOrder: 9,
  },
];

async function seedMenu() {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");

    for (const category of categories) {
      await MenuCategory.findOneAndUpdate(
        {
          slug: category.slug,
        },
        {
          $set: category,
          $setOnInsert: {
            isActive: true,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log("Menu categories seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Menu category seed failed:", error);

    process.exit(1);
  }
}

seedMenu();
