import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import MenuCategory from "@/models/MenuCategory";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await requireAdmin();

    await connectDB();

    const items = await MenuItem.find()
      .populate("category", "name slug")
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Admin menu items GET error:", error);

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

export async function POST(request: Request) {
  try {
    await requireAdmin();

    await connectDB();

    const body = await request.json();

    const { name, categoryId, price, description, isAvailable, isFeatured } =
      body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!name || !categoryId || price === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, category and price are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category.",
        },
        {
          status: 400,
        },
      );
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Price must be a valid positive number.",
        },
        {
          status: 400,
        },
      );
    }

    // -----------------------------
    // Check category
    // -----------------------------

    const category = await MenuCategory.findById(categoryId);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected category was not found.",
        },
        {
          status: 404,
        },
      );
    }

    // -----------------------------
    // Create slug
    // -----------------------------

    const slug = createSlug(name);

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid item name.",
        },
        {
          status: 400,
        },
      );
    }

    // -----------------------------
    // Prevent duplicate slug
    // -----------------------------

    const existingItem = await MenuItem.findOne({ slug });

    if (existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: "A menu item with this name already exists.",
        },
        {
          status: 409,
        },
      );
    }

    // -----------------------------
    // Determine sort order
    // -----------------------------

    const lastItem = await MenuItem.findOne()
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();

    const sortOrder = lastItem?.sortOrder ? lastItem.sortOrder + 1 : 1;

    // -----------------------------
    // Create item
    // -----------------------------

    const item = await MenuItem.create({
      name: name.trim(),
      slug,
      category: category._id,
      description: description?.trim() || "",
      price: numericPrice,
      isAvailable: isAvailable !== false,
      isFeatured: isFeatured === true,
      sortOrder,
    });

    const populatedItem = await MenuItem.findById(item._id)
      .populate("category", "name slug")
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Menu item created successfully.",
        data: populatedItem,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Admin menu items POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create menu item.",
      },
      {
        status: 500,
      },
    );
  }
}
