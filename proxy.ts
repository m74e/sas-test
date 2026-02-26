import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  LOGIN_PATH,
  DEFAULT_AUTHED_REDIRECT,
  isPublicPath,
} from "@/lib/auth-routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token?.trim());

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const publicPath = isPublicPath(pathname);

  if (publicPath) {
    if (isAuthenticated && pathname.startsWith(LOGIN_PATH)) {
      const url = request.nextUrl.clone();
      url.pathname = DEFAULT_AUTHED_REDIRECT;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
