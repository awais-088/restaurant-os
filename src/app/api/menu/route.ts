import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";
import MenuItem from "@/models/MenuItem";

export async function GET() {
  try {
    await connectDB();

    const [categories, items] = await Promise.all([
      MenuCategory.find({
        isActive: true,
      })
        .sort({
          sortOrder: 1,
          name: 1,
        })
        .lean(),

      MenuItem.find({
        isAvailable: true,
      })
        .populate("category", "name slug")
        .sort({
          sortOrder: 1,
          name: 1,
        })
        .lean(),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        categories,
        items,
      },
    });
  } catch (error) {
    console.error("Menu API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu.",
      },
      {
        status: 500,
      },
    );
  }
}
