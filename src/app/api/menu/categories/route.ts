import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";

export async function GET() {
  try {
    await connectDB();

    const categories = await MenuCategory.find({
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        name: 1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Menu categories API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu categories.",
      },
      {
        status: 500,
      },
    );
  }
}
