import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Restaurant from "@/models/Restaurant";

export async function GET() {
  try {
    await connectDB();

    const restaurant = await Restaurant.findOne({
      isActive: true,
    }).lean();

    return NextResponse.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error("Restaurant API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch restaurant.",
      },
      {
        status: 500,
      },
    );
  }
}
