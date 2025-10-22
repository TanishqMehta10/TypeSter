/*
  # Code Typing Practice Database Schema

  ## Overview
  This migration creates the database structure for a typing practice application
  that helps students improve their coding speed and accuracy.

  ## New Tables

  ### `code_snippets`
  Stores programming code snippets for typing practice
  - `id` (uuid, primary key) - Unique identifier for each snippet
  - `language` (text) - Programming language (c, cpp, java, python)
  - `category` (text) - Either 'random' or 'dsa'
  - `topic` (text, nullable) - DSA topic (arrays, strings, linked_lists, etc.)
  - `code` (text) - The actual code snippet to type
  - `difficulty` (text) - Snippet difficulty: easy, medium, hard
  - `estimated_time` (integer) - Estimated time in seconds to type this snippet
  - `title` (text) - Brief title/description of the snippet
  - `created_at` (timestamptz) - When the snippet was created

  ### `practice_sessions`
  Stores user practice session results
  - `id` (uuid, primary key) - Unique identifier for each session
  - `snippet_id` (uuid, foreign key) - Reference to the code snippet used
  - `duration` (integer) - Time limit chosen by user in seconds
  - `accuracy` (numeric) - Accuracy percentage (0-100)
  - `cpm` (numeric) - Characters per minute
  - `wpm` (numeric) - Words per minute
  - `total_chars` (integer) - Total characters in the snippet
  - `typed_chars` (integer) - Characters actually typed
  - `mistakes` (integer) - Number of mistakes made
  - `completed_at` (timestamptz) - When the session ended
  - `created_at` (timestamptz) - When the session started

  ## Security
  - RLS is enabled on both tables
  - Public read access for code_snippets (anyone can view snippets)
  - Public insert access for practice_sessions (anyone can record practice)
  - This allows the app to work without authentication while still having data protection

  ## Notes
  - Code snippets are pre-populated and managed by the application
  - Sessions are stored for statistics but don't require user accounts
  - The app is designed to be used without authentication for simplicity
*/

-- Create code_snippets table
CREATE TABLE IF NOT EXISTS code_snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  category text NOT NULL CHECK (category IN ('random', 'dsa')),
  topic text,
  code text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  estimated_time integer NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create practice_sessions table
CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snippet_id uuid REFERENCES code_snippets(id) ON DELETE CASCADE,
  duration integer NOT NULL,
  accuracy numeric(5,2) DEFAULT 0,
  cpm numeric(10,2) DEFAULT 0,
  wpm numeric(10,2) DEFAULT 0,
  total_chars integer DEFAULT 0,
  typed_chars integer DEFAULT 0,
  mistakes integer DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for code_snippets (public read access)
CREATE POLICY "Anyone can view code snippets"
  ON code_snippets FOR SELECT
  USING (true);

CREATE POLICY "Service can insert snippets"
  ON code_snippets FOR INSERT
  WITH CHECK (true);

-- Policies for practice_sessions (public insert access for recording practice)
CREATE POLICY "Anyone can insert practice sessions"
  ON practice_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view practice sessions"
  ON practice_sessions FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_snippets_language ON code_snippets(language);
CREATE INDEX IF NOT EXISTS idx_snippets_category ON code_snippets(category);
CREATE INDEX IF NOT EXISTS idx_snippets_topic ON code_snippets(topic);
CREATE INDEX IF NOT EXISTS idx_snippets_difficulty ON code_snippets(difficulty);
CREATE INDEX IF NOT EXISTS idx_sessions_snippet ON practice_sessions(snippet_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON practice_sessions(created_at DESC);