import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = jwt.decode(token);
  // console.log(user)
  const path = req.nextUrl.pathname;

  // ADMIN ONLY
  if (path.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // ADMIN + MANAGER

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*"], // "/user/:path*"
};