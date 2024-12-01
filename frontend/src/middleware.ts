import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedPaths = ["/sign-up", "/sign-in"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = token !== undefined;

  if (isLoggedIn && allowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isLoggedIn && !allowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  const response = NextResponse.next();
  if (token) {
    response.headers.set("x-access-token", token);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
