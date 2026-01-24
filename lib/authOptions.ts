import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyUserCredentials } from "./auth";
import { NextAuthOptions } from "next-auth";
import User from "@/models/userModal";
import { UserInterface } from "@/types/user.type";
import dbConnect from "./dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        // Add logic here to look up the user from the credentials supplied
        return await verifyUserCredentials(
          credentials.email,
          credentials.password,
        );
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true; // allow credentials login
      if (user) {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser?.provider === "credentials") {
          throw new Error("User already exists with credentials provider");
        }

        if (!existingUser) {
          await User.create({
            provider: "google",
            username: user.name,
            email: user.email,
            profileImage: user.image || "",
            role: "Patient", // default role
          });
        }
      }
      return true; // ✅ must return boolean
    },

    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token }) {
      session.user.role = token.role as UserInterface["role"];
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      // First login
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.role = dbUser ? dbUser.role : user.role;
        if (account?.access_token) token.accessToken = account.access_token;
      }
      // Subsequent calls: token already has id and role
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
