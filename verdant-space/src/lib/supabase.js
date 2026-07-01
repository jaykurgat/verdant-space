/**
 * Supabase client — gracefully degrades to localStorage when not configured.
 *
 * To enable:
 *  1. npm install @supabase/supabase-js
 *  2. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
 */

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(url && key && url.startsWith('https://'))

// Synchronous placeholder; dataStore always checks isSupabaseConfigured first.
export let supabase = null

// Attempt async init only when credentials exist
if (isSupabaseConfigured) {
  try {
    const mod = await import('@supabase/supabase-js')
    supabase = mod.createClient(url, key)
  } catch {
    console.warn('[VerdantSpace] Supabase package unavailable — using localStorage mode.')
  }
}
