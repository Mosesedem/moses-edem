import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;
let pool: Pool | null = null;
let poolInitError: string | null = null;

/**
 * Kill-switch: set CMS_FORCE_FILE=1 on Vercel to skip Postgres entirely
 * (use seed / file CMS). Also skips when DATABASE_URL is empty.
 */
export function isDatabaseConfigured(): boolean {
  if (
    process.env.CMS_FORCE_FILE === "1" ||
    process.env.CMS_FORCE_FILE === "true"
  ) {
    return false;
  }
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getPoolInitError(): string | null {
  return poolInitError;
}

function attachPoolErrorHandler(p: Pool) {
  // Unhandled pool "error" events can crash the serverless isolate (500).
  p.on("error", (err: Error) => {
    console.error(
      "[db] Postgres pool error (non-fatal):",
      err instanceof Error ? err.message : err
    );
  });
}

export function getDb() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (poolInitError && !dbInstance) {
    throw new Error(poolInitError);
  }

  if (!dbInstance) {
    try {
      const connectionString = process.env.DATABASE_URL!.trim();
      // Neon (and most managed Postgres) requires TLS. Disable only if
      // explicitly requested via sslmode=disable.
      const disableSsl =
        connectionString.includes("sslmode=disable") ||
        /localhost|127\.0\.0\.1/.test(connectionString);
      pool = new Pool({
        connectionString,
        ssl: disableSsl ? false : { rejectUnauthorized: false },
        // Serverless-friendly: a few concurrent connections for Promise.all
        max: 3,
        connectionTimeoutMillis: 3_000,
        idleTimeoutMillis: 10_000,
        allowExitOnIdle: true,
      });
      attachPoolErrorHandler(pool);
      dbInstance = drizzle(pool, { schema });
      poolInitError = null;
    } catch (err) {
      poolInitError =
        err instanceof Error ? err.message : "Failed to create Postgres pool";
      pool = null;
      dbInstance = null;
      throw new Error(poolInitError);
    }
  }

  return dbInstance as ReturnType<typeof drizzle<typeof schema>>;
}

/** Best-effort pool teardown (tests / hot reload). */
export async function closeDb(): Promise<void> {
  if (pool) {
    try {
      await pool.end();
    } catch {
      /* ignore */
    }
  }
  pool = null;
  dbInstance = null;
  poolInitError = null;
}
