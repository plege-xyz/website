import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path !== "/dashboard/login") {
    const session = request.cookies.get("session")?.value;
    const expiry = request.cookies.get("expiry")?.value;

    const BASE_URL = request.nextUrl.origin;
    const url = request.nextUrl.href;

    const redirect = new URL(`${BASE_URL}/dashboard/login?redirect=${url}`);

    if (session && expiry) {
      const expiryDate = new Date(expiry);
      if (expiryDate > new Date()) {
        return NextResponse.redirect(redirect);
      }
    } else {
      return NextResponse.redirect(redirect);
    }
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
