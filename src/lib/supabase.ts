import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If env vars are present, create a real Supabase client.
// Otherwise export a safe stub that provides the minimal API used by the app
// so the site doesn't crash when VITE_* envs are missing (e.g. during a static build without envs).
let supabase: any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Minimal no-op/stub implementation that mirrors the parts of supabase-js used in this project.
  const makeFromBuilder = () => {
    const builder: any = {
      _table: null,
      select() { return builder; },
      eq() { return builder; },
      lte() { return builder; },
      gte() { return builder; },
      limit() { return builder; },
      insert: async (_rows: any) => ({ data: [], error: null }),
      // Make the builder thenable so `await supabase.from(...).select(...);` resolves to a { data, error } shape
      then(resolve: any) {
        return Promise.resolve({ data: [], error: null }).then(resolve);
      },
      catch() { return Promise.resolve({ data: [], error: null }); }
    };
    return builder;
  };

  supabase = {
    // auth stub
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
      signOut: async () => ({ error: null })
    },
    from: (_table: string) => makeFromBuilder()
  };

  // warn once in console so maintainers know envs are missing
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing — using a stubbed Supabase client. Add VITE_ envs to enable Supabase.');
}

export { supabase };

export interface CodeSnippet {
  id: string;
  language: string;
  category: string;
  topic: string | null;
  code: string;
  difficulty: string;
  estimated_time: number;
  title: string;
  created_at: string;
}

export interface PracticeSession {
  id?: string;
  snippet_id: string;
  duration: number;
  accuracy: number;
  cpm: number;
  wpm: number;
  total_chars: number;
  typed_chars: number;
  mistakes: number;
  user_id?: string | null;
  is_guest?: boolean;
  completed_at?: string;
  created_at?: string;
}
