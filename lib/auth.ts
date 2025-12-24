import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModal";
import bcrypt from "bcryptjs";

export async function verifyUserCredentials(email: string, password: string) {
  await dbConnect();

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };
}
