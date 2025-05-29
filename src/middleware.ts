import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = [
  /^\/admin(\/.*)?$/,
  /^\/checkout$/,
  /^\/your-account(\/.*)?$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isPublic =
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/";

  // Redirect logged-in users away from /sign-in and /sign-up
  const auth = ["/sign-in", "/sign-up"];
  if (auth.includes(pathname)) {
    if (token) {
      // if user has token and role is admin then redirect admin page otherwise hone page
      // const redirectUrl =
      // token.role === "admin"
      //   ? new URL("/admin", request.url)
      //   : // : new URL("/your-account", request.url);
      //     new URL("/", request.url);
      const redirectUrl = new URL("/", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (isPublic) return NextResponse.next();

  const needsAuth = protectedPaths.some((rx) => rx.test(pathname));
  if (!needsAuth) return NextResponse.next();

  if (!token) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if (pathname.startsWith("/admin") && token.role !== "admin") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout",
    "/your-account/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
