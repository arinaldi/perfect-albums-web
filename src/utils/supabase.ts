import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  typeof import.meta.env.VITE_SUPABASE_URL === 'string'
    ? import.meta.env.VITE_SUPABASE_URL
    : '';
const supabaseAnonKey =
  typeof import.meta.env.VITE_SUPABASE_ANON_KEY === 'string'
    ? import.meta.env.VITE_SUPABASE_ANON_KEY
    : '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
