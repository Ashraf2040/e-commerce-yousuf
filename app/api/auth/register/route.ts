// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// Import your database client (example with Prisma)
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already in use." }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Make sure your User model has a password field
        // emailVerified: null, image: null, etc. if using NextAuth accounts
      },
    });

    return NextResponse.json({ message: "User created successfully.", user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}