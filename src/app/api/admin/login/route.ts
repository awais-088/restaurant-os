import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import Admin from "@/models/Admin";
import { connectDB } from "@/lib/mongodb";
import { createAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const admin = await Admin.findOne({
      email,
      isActive: true,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    await createAdminSession(admin._id.toString());

    return NextResponse.json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to login.",
      },
      {
        status: 500,
      },
    );
  }
}
