/**
 * A Little Forever — optional Supabase integration.
 *
 * Uncomment and configure when you want persistent, hosted storage for guest
 * wishes instead of the local JSON file store in lib/store.ts.
 *
 * npm install @supabase/supabase-js @supabase/ssr
 *
 * Then wire lib/store.ts's createWish/getWishes/updateWishStatus/deleteWish
 * to Supabase calls, keeping the same API-route surface.
 */

/* import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
*/
