import NextAuth from "next-auth";
import "next-auth/jwt";
import { UserInterface } from "./user.type";

interface SafeUser {
  id: string;
  email: string;
  role: UserInterface["role"];
  name?: string; // map from username
  image?: string; // map from profileImage
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: SafeUser;
  }
  interface User extends SafeUser {
    _typeBrand?: "User";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: SafeUser["role"];
  }
}
