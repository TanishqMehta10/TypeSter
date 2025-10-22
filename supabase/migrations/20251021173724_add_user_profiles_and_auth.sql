/*
  # Add User Authentication and Profiles

  ## Overview
  This migration adds user profile support and updates the practice sessions
  to link with authenticated users while maintaining guest functionality.

  ## Changes to Existing Tables

  ### `practice_sessions`
  - Add `user_id` (uuid, nullable, foreign key to auth.users)
  - Add `is_guest` (boolean) - Flag to indicate guest sessions
  - Sessions can be linked to authenticated users or remain as guest sessions

  ## New Tables

  ### `user_profiles`
  Stores additional user information beyond auth
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text, nullable) - User's chosen display name
  - `total_sessions` (integer) - Total number of practice sessions
  - `best_wpm` (numeric) - Best words per minute achieved
  - `best_accuracy` (numeric) - Best accuracy percentage achieved
  - `created_at` (timestamptz) - When the profile was created
  - `updated_at` (timestamptz) - Last profile update

  ## Security
  - RLS is enabled on user_profiles
  - Users can read and update their own profiles
  - Practice sessions can be created by anyone (guests or authenticated users)
  - Authenticated users can view their own session history

  ## Notes
  - Guest sessions have user_id as NULL and is_guest as true
  - Authenticated user sessions have user_id set and is_guest as false
  - User profiles are automatically created via trigger when user signs up
*/

-- Add user_id and is_guest to practice_sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_sessions' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE practice_sessions ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_sessions' AND column_name = 'is_guest'
  ) THEN
    ALTER TABLE practice_sessions ADD COLUMN is_guest boolean DEFAULT true;
  END IF;
END $$;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  total_sessions integer DEFAULT 0,
  best_wpm numeric(10,2) DEFAULT 0,
  best_accuracy numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update practice_sessions policies
DROP POLICY IF EXISTS "Anyone can view practice sessions" ON practice_sessions;

CREATE POLICY "Users can view own sessions"
  ON practice_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Guests can view guest sessions"
  ON practice_sessions FOR SELECT
  USING (is_guest = true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_is_guest ON practice_sessions(is_guest);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user stats after practice
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS trigger AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    UPDATE user_profiles
    SET
      total_sessions = total_sessions + 1,
      best_wpm = GREATEST(best_wpm, NEW.wpm),
      best_accuracy = GREATEST(best_accuracy, NEW.accuracy),
      updated_at = now()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats on new session
DROP TRIGGER IF EXISTS on_practice_session_completed ON practice_sessions;
CREATE TRIGGER on_practice_session_completed
  AFTER INSERT ON practice_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();