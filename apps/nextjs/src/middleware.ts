import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};