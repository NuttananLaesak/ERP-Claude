import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_PATHS = ["/login", "/api/auth"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!req.auth && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.auth) {
    const role = (req.auth.user as any)?.role ?? "ADMIN";

    if (pathname === "/login") {
      const dest = role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard";
      return NextResponse.redirect(new URL(dest, req.url));
    }

    // Employees: redirect root /dashboard to their portal
    if (role === "EMPLOYEE" && pathname === "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard/employee", req.url));
    }

    // Employees: block access to admin-only routes
    if (
      role === "EMPLOYEE" &&
      pathname.startsWith("/dashboard") &&
      !pathname.startsWith("/dashboard/employee") &&
      !pathname.startsWith("/dashboard/settings")
    ) {
      return NextResponse.redirect(new URL("/dashboard/employee", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
