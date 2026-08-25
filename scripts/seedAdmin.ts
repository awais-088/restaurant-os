import bcrypt from "bcryptjs";
import Admin from "../src/models/Admin";
import { connectDB } from "../src/lib/mongodb";

async function seedAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email) {
      throw new Error("ADMIN_EMAIL is missing.");
    }

    if (!password) {
      throw new Error("ADMIN_PASSWORD is missing.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");

      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      name: "MUSA Admin",
      email: normalizedEmail,
      passwordHash,
      role: "admin",
      isActive: true,
    });

    console.log("Admin account created successfully.");
    console.log(`Email: ${normalizedEmail}`);

    process.exit(0);
  } catch (error) {
    console.error("Admin seed failed:", error);

    process.exit(1);
  }
}

seedAdmin();
