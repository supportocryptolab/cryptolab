import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client (server-side only).
 * Uses service_role key for full DB + Storage access.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * Generate a signed download URL for the PDF.
 * @param expiresIn Seconds until expiry (default 24h)
 */
export async function generateSignedUrl(expiresIn = 86400): Promise<string> {
  const supabase = getSupabaseAdmin();
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "downloads";
  const file = process.env.SUPABASE_STORAGE_FILE || "tradingbook.pdf";

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(file, expiresIn);

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to generate signed URL: ${error?.message}`);
  }

  return data.signedUrl;
}
