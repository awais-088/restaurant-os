import { NextResponse } from "next/server";
import mongoose from "mongoose";
import MenuItem from "@/models/MenuItem";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// UPDATE
export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        {
          status: 400,
        },
      );
    }

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

    const duplicate = await MenuCategory.findOne({
      _id: { $ne: id },
      $or: [{ name }, { slug }],
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another category with this name already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const category = await MenuCategory.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        isActive,
        sortOrder,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error("Admin category PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category.",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE
export async function DELETE(request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        {
          status: 400,
        },
      );
    }

    const category = await MenuCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    const menuItemCount = await MenuItem.countDocuments({
      category: id,
    });

    if (menuItemCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete this category because ${menuItemCount} menu item(s) belong to it.`,
        },
        {
          status: 409,
        },
      );
    }

    await MenuCategory.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Admin category DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category.",
      },
      {
        status: 500,
      },
    );
  }
}
