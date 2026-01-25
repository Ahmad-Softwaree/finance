import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const isPublicRoute = createRouteMatcher([
  "/:locale",
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
  "/:locale/bots(.*)",
  "/:locale/bots/:id(.*)",
]);
const nextIntlMiddleware = createMiddleware(routing);
const isApiRoute = createRouteMatcher(["/api(.*)"]);
const isProtectedRoute = createRouteMatcher(["/:locale/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isApiRoute(req)) {
    // Only run Clerk auth for protected API routes
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return NextResponse.next();
  }

  const { userId } = await auth();

  // Redirect authenticated users from auth pages to dashboard
  // Handle admin route protection
  if (isProtectedRoute(req)) {
    if (!userId) {
      await auth.protect();
      return;
    }
    if (
      userId &&
      (req.nextUrl.pathname.startsWith("/sign-in") ||
        req.nextUrl.pathname.startsWith("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Skip all static files
    "/api/:path*", // Only JSON API
  ],
};
