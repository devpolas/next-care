import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "./lib/dbConnect";

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${path}`, request.url),
    );
  }
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/login", "/signup", "/verifyemail"],
};
