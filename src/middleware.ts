import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "./lib/auth";

const authPaths = ["/", "/forgot-password", "/verify-otp", "/reset-password"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!isAuthenticated(request) && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (isAuthenticated(request) && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    return NextResponse.rewrite(new URL(request.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
