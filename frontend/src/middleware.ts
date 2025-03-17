import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { fetchCurrentUser } from "./app/lib/session";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  const jwt = (await cookies()).get("session")?.value;

  // If no JWT and trying to access a protected route, redirect to login.
  if (isProtectedRoute && !jwt) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  let data : any = fetchCurrentUser();

  // Redirect to login if accessing a protected route without a confirmed user or if blocked.
  if (isProtectedRoute && (!data?.confirmed || data?.blocked)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If already authenticated and trying to access the login page, redirect to profile.
  if (isAuthRoute && data?.confirmed && !data?.blocked) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }
    
  return NextResponse.next();
}
