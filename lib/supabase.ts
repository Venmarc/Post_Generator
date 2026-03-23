import { createClient } from '@supabase/supabase-js';

// Fallback values for build-time to prevent "supabaseUrl is required" errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Initialize Supabase. During build without env vars, this will use the placeholders.
// Pages that don't actually call Supabase logic during prerendering will build fine.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
