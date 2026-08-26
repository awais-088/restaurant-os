import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const gallery = await Gallery.find({})
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Admin gallery GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery items.",
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

    if (!Number.isInteger(sortOrder) || sortOrder < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Sort order must be a positive number.",
        },
        {
          status: 400,
        },
      );
    }

    const galleryItem = await Gallery.create({
      title,
      description,
      category,
      image,
      isActive,
      sortOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery item created successfully.",
        data: galleryItem,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Admin gallery POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create gallery item.",
      },
      {
        status: 500,
      },
    );
  }
}
