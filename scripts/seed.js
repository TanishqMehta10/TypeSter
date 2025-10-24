import { createClient } from '@supabase/supabase-js';

// Usage (PowerShell):
// $env:SUPABASE_URL = "https://..."; $env:SUPABASE_KEY = "your-key"; npm run seed

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables.');
  console.error('Set SUPABASE_URL and SUPABASE_KEY in your shell and re-run this script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleSnippets = [
  {
    language: 'python',
    category: 'random',
    topic: null,
    code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Simple Greeting Function'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'arrays',
    code: `def find_max(arr):\n    if not arr:\n        return None\n    max_val = arr[0]\n    for num in arr:\n        if num > max_val:\n            max_val = num\n    return max_val`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Find Maximum in Array'
  },
  {
    language: 'java',
    category: 'random',
    topic: null,
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Hello World Program'
  }
];

async function run() {
  try {
    console.log('Checking for existing snippets...');
    const { data: existing, error: existErr } = await supabase
      .from('code_snippets')
      .select('id')
      .limit(1);

    if (existErr) {
      console.error('Error checking existing data:', existErr);
      process.exit(1);
    }

    if (existing && existing.length > 0) {
      console.log('Database already has snippets — aborting seed.');
      process.exit(0);
    }

    console.log('Seeding sample snippets...');
    const { data, error } = await supabase.from('code_snippets').insert(sampleSnippets);
    if (error) {
      console.error('Error inserting seed data:', error);
      process.exit(1);
    }

    console.log('Seed complete. Inserted', data?.length ?? 0, 'rows.');
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error during seed:', err);
    process.exit(1);
  }
}

run();
