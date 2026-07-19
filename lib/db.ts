import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/lib/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDb() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!dbInstance) {
    const pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      connectionLimit: 5,
    });
    dbInstance = drizzle(pool, { schema, mode: "default" });
  }

  return dbInstance as ReturnType<typeof drizzle<typeof schema>>;
}
