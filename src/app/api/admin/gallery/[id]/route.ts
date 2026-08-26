import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

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
          message: "Invalid gallery ID.",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const image = String(body.image || "").trim();

    const isActive = body.isActive !== false;
    const sortOrder = Number(body.sortOrder || 1);

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery title is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery category is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image URL is required.",
        },
        {
          status: 400,
        },
      );
    }

    const galleryItem = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        image,
        isActive,
        sortOrder,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item updated successfully.",
      data: galleryItem,
    });
  } catch (error) {
    console.error("Admin gallery PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gallery item.",
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
          message: "Invalid gallery ID.",
        },
        {
          status: 400,
        },
      );
    }

    const galleryItem = await Gallery.findByIdAndDelete(id);

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error("Admin gallery DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete gallery item.",
      },
      {
        status: 500,
      },
    );
  }
}
