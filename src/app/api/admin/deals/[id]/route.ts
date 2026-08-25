import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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
          message: "Invalid deal ID.",
        },
        {
          status: 400,
        },
      );
    }

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

    const deal = await Deal.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        badge,
        image,
        isActive,
        sortOrder,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!deal) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deal updated successfully.",
      data: deal,
    });
  } catch (error) {
    console.error("Admin deals PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update deal.",
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
          message: "Invalid deal ID.",
        },
        {
          status: 400,
        },
      );
    }

    const deal = await Deal.findByIdAndDelete(id);

    if (!deal) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deal deleted successfully.",
    });
  } catch (error) {
    console.error("Admin deals DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete deal.",
      },
      {
        status: 500,
      },
    );
  }
}
