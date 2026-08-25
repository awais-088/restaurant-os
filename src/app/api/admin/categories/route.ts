import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET categories
export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const categories = await MenuCategory.find({})
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Admin categories GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE category
export async function POST(request: Request) {
  try {
    await requireAdmin();
    await connectDB();

    const body = await request.json();

    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const isActive = body.isActive !== false;
    const sortOrder = Number(body.sortOrder || 0);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required.",
        },
        {
          status: 400,
        },
      );
    }

    const slug = createSlug(name);

    const existing = await MenuCategory.findOne({
      $or: [{ name }, { slug }],
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A category with this name already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const category = await MenuCategory.create({
      name,
      slug,
      description,
      isActive,
      sortOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Admin categories POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category.",
      },
      {
        status: 500,
      },
    );
  }
}
