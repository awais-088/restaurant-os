import { connectDB } from "../src/lib/mongodb";
import Restaurant from "../src/models/Restaurant";

async function seed() {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");

    const restaurantData = {
      name: "MUSA Cafe & Restaurant",

      slug: "musa-cafe-layyah",

      tagline: "A taste worth gathering for.",

      description:
        "MUSA Cafe & Restaurant is a dining destination in Layyah serving Pakistani, BBQ, cafe, fast food and continental favorites.",

      phone: "03013777777",

      whatsapp: "923013777777",

      address: "03, Block A Housing Colony, Madni Chowk",

      city: "Layyah",

      country: "Pakistan",

      googleMapsUrl: "",

      openingHours: [
        {
          day: "Monday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Tuesday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Wednesday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Thursday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Friday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Saturday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
        {
          day: "Sunday",
          open: "10:30",
          close: "01:00",
          isClosed: false,
        },
      ],

      socialLinks: {},

      isActive: true,
    };

    const restaurant = await Restaurant.findOneAndUpdate(
      {
        slug: "musa-cafe-layyah",
      },
      restaurantData,
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      },
    );

    console.log("Restaurant seeded:", restaurant?.name);

    console.log("Restaurant seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    process.exit(1);
  }
}

seed();
