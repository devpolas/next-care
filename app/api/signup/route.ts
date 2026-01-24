import dbConnect from "@/lib/dbConnect";
import User from "@/models/user-modal";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    const { username, email, password, image } = reqBody;
    console.log(reqBody);
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "all fields are required!" },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "user already exists!" },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      profileImage: image,
    });
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          image: user.profileImage,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "error creating user" },
      { status: 500 },
    );
  }
}
