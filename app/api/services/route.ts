import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const services = [
  { id: "web", name: "Web experience", path: "/", status: "operational" },
  { id: "health", name: "Health", path: "/api/health", status: "operational" },
  { id: "readiness", name: "Readiness", path: "/api/ready", status: "operational" },
  { id: "version", name: "Version", path: "/api/version", status: "operational" },
  { id: "content", name: "Content system", path: "/", status: "operational" },
  { id: "control", name: "Control plane", path: "/", status: "integrated" },
];

export async function GET() {
  return NextResponse.json({
    service: "mindreply",
    generatedAt: new Date().toISOString(),
    services,
  }, { headers: { "Cache-Control": "no-store" } });
}
