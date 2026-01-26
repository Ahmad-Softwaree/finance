import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware = createMiddleware(routing);
const isApiRoute = createRouteMatcher(["/api(.*)"]);
const isProtectedPage = createRouteMatcher(["/:locale/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isApiRoute(req)) {
    return NextResponse.next();
  }
  if (isProtectedPage(req)) {
    const { userId } = await auth();
    if (!userId) {
      await auth.protect();
      return;
    }
  }
  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
