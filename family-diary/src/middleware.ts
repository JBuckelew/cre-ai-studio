import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Everything except auth endpoints, media serving, and static assets.
  matcher: ["/((?!api/auth|api/media|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
