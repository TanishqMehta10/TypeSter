import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
