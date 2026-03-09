export const MAX_WORD_SIZE = 5;
export const MAX_ATTEMPTS = 6;

// Values are injected by /runtime-config.js served by the backend.
export const VITE_SUPABASE_URL = globalThis.VITE_SUPABASE_URL ?? "";
export const VITE_SUPABASE_ANON_KEY = globalThis.VITE_SUPABASE_ANON_KEY ?? "";
