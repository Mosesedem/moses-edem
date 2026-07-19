import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";
import * as schema from "@/lib/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;
let pool: Pool | null = null;
let poolInitError: string | null = null;

/**
 * Kill-switch: set CMS_FORCE_FILE=1 on Vercel to skip MySQL entirely
 * (use seed / file CMS). Also skips when DATABASE_URL is empty.
 */
export function isDatabaseConfigured(): boolean {
  if (process.env.CMS_FORCE_FILE === "1" || process.env.CMS_FORCE_FILE === "true") {
    return false;
  }
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getPoolInitError(): string | null {
  return poolInitError;
}

function attachPoolErrorHandler(p: Pool) {
  // Unhandled pool "error" events can crash the serverless isolate (500).
  // mysql2 Pool typing is incomplete for the "error" event.
  (p as unknown as NodeJS.EventEmitter).on("error", (err: Error) => {
    console.error(
      "[db] MySQL pool error (non-fatal):",
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
      const uri = process.env.DATABASE_URL!.trim();
      pool = mysql.createPool({
        uri,
        // Serverless-friendly: fail fast, few connections
        connectionLimit: 1,
        connectTimeout: 5_000,
        waitForConnections: true,
        enableKeepAlive: false,
        maxIdle: 0,
        idleTimeout: 5_000,
      });
      attachPoolErrorHandler(pool);
      dbInstance = drizzle(pool, { schema, mode: "default" });
      poolInitError = null;
    } catch (err) {
      poolInitError =
        err instanceof Error ? err.message : "Failed to create MySQL pool";
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
