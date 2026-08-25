import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

// GET
export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const deals = await Deal.find({})
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: deals,
    });
  } catch (error) {
    console.error("Admin deals GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch deals.",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE
export async function POST(request: Request) {
  try {
    await requireAdmin();
    await connectDB();

    const body = await request.json();

    const title = String(body.title || "").trim();

    const description = String(body.description || "").trim();

    const badge = String(body.badge || "").trim();

    const image = String(body.image || "").trim();

    const price =
      body.price === "" || body.price === null || body.price === undefined
        ? undefined
        : Number(body.price);

    const isActive = body.isActive !== false;

    const sortOrder = Number(body.sortOrder || 1);

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal title is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal description is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (price !== undefined && (Number.isNaN(price) || price < 0)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid price.",
        },
        {
          status: 400,
        },
      );
    }

    const deal = await Deal.create({
      title,
      description,
      price,
      badge,
      image,
      isActive,
      sortOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Deal created successfully.",
        data: deal,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Admin deals POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create deal.",
      },
      {
        status: 500,
      },
    );
  }
}
