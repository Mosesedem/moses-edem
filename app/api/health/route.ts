import { NextResponse } from "next/server";
import { getPoolInitError, isDatabaseConfigured } from "@/lib/db";
import {
  getAllPersonas,
  getProfile,
  getPublishedPosts,
  getProjects,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

/**
 * Lightweight production diagnostic. Does not expose secrets.
 * GET /api/health
 */
export async function GET() {
  const started = Date.now();
  const dbConfigured = isDatabaseConfigured();
  const checks: Record<string, { ok: boolean; ms: number; detail?: string }> =
    {};

  async function run(
    name: string,
    fn: () => Promise<unknown>
  ): Promise<void> {
    const t0 = Date.now();
    try {
      const result = await fn();
      const count = Array.isArray(result) ? result.length : result ? 1 : 0;
      checks[name] = { ok: true, ms: Date.now() - t0, detail: `n=${count}` };
    } catch (err) {
      checks[name] = {
        ok: false,
        ms: Date.now() - t0,
        detail: err instanceof Error ? err.message : String(err),
      };
    }
  }

  await Promise.all([
    run("personas", () => getAllPersonas()),
    run("profile", () => getProfile()),
    run("posts", () => getPublishedPosts()),
    run("projects", () => getProjects()),
  ]);

  const allOk = Object.values(checks).every((c) => c.ok);

  return NextResponse.json(
    {
      ok: allOk,
      dbConfigured,
      poolInitError: getPoolInitError(),
      forceFile:
        process.env.CMS_FORCE_FILE === "1" ||
        process.env.CMS_FORCE_FILE === "true",
      checks,
      totalMs: Date.now() - started,
      runtime: "nodejs",
    },
    { status: allOk ? 200 : 503 }
  );
}
