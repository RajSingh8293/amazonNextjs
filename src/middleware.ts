import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = [
  /^\/admin(\/.*)?$/,
  /^\/checkout$/,
  /^\/your-account(\/.*)?$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    ["/sign-in", "/sign-up", "/"].includes(pathname);

  if (isPublic) return NextResponse.next();

  // Only protect our listed paths
  const needsAuth = protectedPaths.some((rx) => rx.test(pathname));
  if (!needsAuth) return NextResponse.next();

  // Check session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log("token :", token);

  if (!token) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      encodeURI(request.nextUrl.pathname)
    );
    return NextResponse.redirect(loginUrl);
  }
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/your-account/:path*"],
};
