import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { dbConnect } from "@/lib/db/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user", // default role
  });

  return NextResponse.json(
    { message: "User registered", user: newUser },
    { status: 201 }
  );
}
