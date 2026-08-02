import type { NextAuthConfig } from "next-auth";

// Edge-safe config shared with middleware — no DB imports here.
export const authConfig = {
  // Fallback keeps local zero-secret dev working; set AUTH_SECRET in production.
  secret: process.env.AUTH_SECRET ?? "family-diary-dev-secret",
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/login")) {
        if (isLoggedIn) return Response.redirect(new URL("/", request.nextUrl));
        return true;
      }
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) token.userId = (user as { id?: string }).id;
      return token;
    },
    session({ session, token }) {
      if (token.userId && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  providers: [], // filled in by lib/auth.ts (needs DB, not edge-safe)
} satisfies NextAuthConfig;
