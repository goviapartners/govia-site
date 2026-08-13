import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client for the lead-capture insert. Uses the anon key —
 * `leads_whitepaper` RLS only grants INSERT to anon, no SELECT/UPDATE/DELETE,
 * so this never needs the service role key.
 */
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — ver .env.example"
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
