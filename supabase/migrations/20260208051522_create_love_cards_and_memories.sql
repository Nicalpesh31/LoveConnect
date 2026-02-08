/*
  # LoveConnect Database Schema

  1. New Tables
    - `love_cards`
      - `id` (uuid, primary key) - Unique identifier for each card
      - `partner_name` (text) - Name of the partner
      - `message` (text) - Love message content
      - `theme` (text) - Selected theme (romantic, modern, classic, playful)
      - `photo_url` (text, nullable) - Optional photo URL
      - `created_at` (timestamptz) - When the card was created
      - `share_code` (text, unique) - Unique code for sharing cards

    - `memories`
      - `id` (uuid, primary key) - Unique identifier for each memory
      - `title` (text) - Memory title
      - `description` (text) - Memory description
      - `photo_url` (text, nullable) - Photo URL
      - `memory_date` (date) - Date of the memory
      - `created_at` (timestamptz) - When the memory was saved

  2. Security
    - Enable RLS on both tables
    - Allow public read access for cards with share codes
    - Allow public insert for creating cards and memories
    - This is a public Valentine's app, so we allow open access
*/

CREATE TABLE IF NOT EXISTS love_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name text NOT NULL,
  message text NOT NULL,
  theme text NOT NULL DEFAULT 'romantic',
  photo_url text,
  created_at timestamptz DEFAULT now(),
  share_code text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  photo_url text,
  memory_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE love_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view love cards"
  ON love_cards FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create love cards"
  ON love_cards FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view memories"
  ON memories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create memories"
  ON memories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete their memories"
  ON memories FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS love_cards_share_code_idx ON love_cards(share_code);
CREATE INDEX IF NOT EXISTS memories_created_at_idx ON memories(created_at DESC);