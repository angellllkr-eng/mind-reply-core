import { NextResponse } from "next/server";

/**
 * Read-only Elysium status for operators and health dashboards.
 * Does not expose secrets or enable the loop.
 */
export function GET() {
  const enabled =
    process.env.ELYSIUM_AUDIT_LOOP === "1" ||
    process.env.ELYSIUM_AUDIT_LOOP === "true";

  return NextResponse.json(
    {
      service: "web-replycontrol",
      elysium: {
        auditLoopEnabled: enabled,
        layers: ["aurelia", "lumenforge", "veridex"],
        contract: "helix/v1/profit-audit",
        docs: [
          "/docs/ELYSIUM_STACK.md",
          "/docs/ELYSIUM_AUDIT_LOOP.md",
        ],
      },
      checkedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
