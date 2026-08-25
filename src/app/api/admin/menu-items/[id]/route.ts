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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid menu item ID.",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();

    const { name, categoryId, price, description, isAvailable, isFeatured } =
      body;

    // -----------------------------
    // Validation
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
    // Check existing item
    // -----------------------------

    const existingItem = await MenuItem.findById(id);

    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found.",
        },
        {
          status: 404,
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
    // Create new slug
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
    // Check duplicate slug
    // -----------------------------

    const duplicate = await MenuItem.findOne({
      slug,
      _id: {
        $ne: id,
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another menu item already uses this name.",
        },
        {
          status: 409,
        },
      );
    }

    // -----------------------------
    // Update
    // -----------------------------

    existingItem.name = name.trim();
    existingItem.slug = slug;
    existingItem.category = category._id;
    existingItem.price = numericPrice;
    existingItem.description = description?.trim() || "";
    existingItem.isAvailable = isAvailable !== false;
    existingItem.isFeatured = isFeatured === true;

    await existingItem.save();

    // -----------------------------
    // Return populated item
    // -----------------------------

    const updatedItem = await MenuItem.findById(existingItem._id)
      .populate("category", "name slug")
      .lean();

    return NextResponse.json({
      success: true,
      message: "Menu item updated successfully.",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Admin menu item PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update menu item.",
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid menu item ID.",
        },
        {
          status: 400,
        },
      );
    }

    const item = await MenuItem.findById(id);

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found.",
        },
        {
          status: 404,
        },
      );
    }

    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully.",
    });
  } catch (error) {
    console.error("Admin menu item DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete menu item.",
      },
      {
        status: 500,
      },
    );
  }
}
