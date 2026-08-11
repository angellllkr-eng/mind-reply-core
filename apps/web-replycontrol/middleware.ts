import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lumenforge edge mount
 * - Stamps Elysium API responses with substrate headers
 * - Does not block public pages or Stripe CTA
 * - Heavy evaluation runs inside /api/elysium/gate (Node), not on every page
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  // Substrate identity on all responses (lightweight, no secrets)
  response.headers.set("x-elysium-substrate", "mind-reply");
  response.headers.set(
    "x-elysium-audit-loop",
    process.env.ELYSIUM_AUDIT_LOOP === "1" ||
      process.env.ELYSIUM_AUDIT_LOOP === "true"
      ? "enabled"
      : "disabled"
  );

  if (path.startsWith("/api/elysium")) {
    response.headers.set("x-lumenforge-edge", "1");
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/api/elysium/:path*",
    "/api/health",
  ],
};
