/*
  # Blog System Schema

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `image_url` (text, required)
      - `author_id` (uuid, references auth.users)
      - `category` (text)
      - `tags` (text[])
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `blogs` table
    - Add policies for CRUD operations
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  category text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published blogs"
  ON blogs
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can manage their own blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE
  ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();