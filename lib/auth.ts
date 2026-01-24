import dbConnect from "@/lib/dbConnect";
import User from "@/models/user-modal";
import bcrypt from "bcryptjs";

export async function verifyUserCredentials(email: string, password: string) {
  await dbConnect();

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user._id.toString(),
    name: user.username,
    email: user.email,
    role: user.role,
    provider: user.provider,
    image: user.profileImage,
  };
}
