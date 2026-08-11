import { NextResponse } from "next/server";

/**
 * Read-only Elysium status for operators.
 * Does not expose secrets.
 */
export function GET() {
  const enabled =
    process.env.ELYSIUM_AUDIT_LOOP === "1" ||
    process.env.ELYSIUM_AUDIT_LOOP === "true";
  const ledger =
    Boolean(
      process.env.VERIDEX_SUPABASE_URL &&
        process.env.VERIDEX_SUPABASE_SERVICE_ROLE_KEY
    )
      ? "supabase"
      : "local_only";

  return NextResponse.json(
    {
      service: "web-replycontrol",
      elysium: {
        auditLoopEnabled: enabled,
        ledger,
        layers: ["aurelia", "lumenforge", "veridex"],
        contract: "helix/v1/profit-audit",
        edge: "middleware_mounted",
        docs: [
          "docs/ELYSIUM_STACK.md",
          "docs/ELYSIUM_RUNTIME.md",
          "docs/HUMAN_SIGNAL_LEXICON.md",
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
