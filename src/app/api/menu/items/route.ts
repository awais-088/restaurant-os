import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import "@/models/MenuCategory";
export async function GET() {
  try {
    await connectDB();

    const items = await MenuItem.find({
      isAvailable: true,
    })
      .populate("category", "name slug")
      .sort({
        sortOrder: 1,
        name: 1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Menu items API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu items.",
      },
      {
        status: 500,
      },
    );
  }
}
