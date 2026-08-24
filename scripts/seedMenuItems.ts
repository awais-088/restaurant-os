import { connectDB } from "../src/lib/mongodb";
import MenuCategory from "../src/models/MenuCategory";
import MenuItem from "../src/models/MenuItem";

const menuItems = [
  {
    name: "Chicken Karahi",
    slug: "chicken-karahi",
    categorySlug: "pakistani",
    description:
      "A classic Pakistani karahi prepared with rich spices and traditional flavors.",
    price: 1800,
    sortOrder: 1,
    isFeatured: true,
  },

  {
    name: "Chicken Handi",
    slug: "chicken-handi",
    categorySlug: "pakistani",
    description:
      "A rich and creamy chicken handi prepared for a memorable dining experience.",
    price: 1800,
    sortOrder: 2,
    isFeatured: true,
  },

  {
    name: "Chicken Sulemani Karahi",
    slug: "chicken-sulemani-karahi",
    categorySlug: "pakistani",
    description:
      "A flavorful chicken karahi with a bold traditional character.",
    price: 1800,
    sortOrder: 3,
    isFeatured: true,
  },
];

async function seedMenuItems() {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");

    for (const item of menuItems) {
      const category = await MenuCategory.findOne({
        slug: item.categorySlug,
        isActive: true,
      });

      if (!category) {
        console.error(`Category not found: ${item.categorySlug}`);

        continue;
      }

      await MenuItem.findOneAndUpdate(
        {
          slug: item.slug,
        },
        {
          $set: {
            name: item.name,
            slug: item.slug,
            description: item.description,
            category: category._id,
            price: item.price,
            sortOrder: item.sortOrder,
            isFeatured: item.isFeatured,
            isAvailable: true,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        },
      );

      console.log(`Menu item seeded: ${item.name}`);
    }

    console.log("Menu items seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Menu item seed failed:", error);

    process.exit(1);
  }
}

seedMenuItems();
