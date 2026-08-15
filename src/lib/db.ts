import { neon } from "@neondatabase/serverless";

/**
 * Server-only client for the public form inserts. Connects as the `anon`
 * Postgres role (NOBYPASSRLS) — leads_whitepaper/tms_assessments RLS only
 * grants INSERT to anon, no SELECT/UPDATE/DELETE, so this never needs the
 * neondb_owner (superuser-equivalent) connection string used for migrations.
 * Mirrors the Supabase anon-key boundary this replaced.
 */
export function getDb() {
  const url = process.env.ANON_DATABASE_URL;

  if (!url) {
    throw new Error("Falta ANON_DATABASE_URL — ver .env.example");
  }

  return neon(url);
}

/** Postgres error shape thrown by @neondatabase/serverless (NeonDbError). */
export type PgError = { code?: string; message: string };

export function isPgError(err: unknown): err is PgError {
  return typeof err === "object" && err !== null && "message" in err;
}
