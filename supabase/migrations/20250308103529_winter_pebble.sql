-- 1. Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL DEFAULT auth.uid(),
  category text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Anyone (anonymous or authenticated) can view published blogs
CREATE POLICY "Anyone can view published blogs"
  ON blogs
  FOR SELECT
  USING (published = true);

-- Authenticated users (authors) can perform all operations (CRUD) on their own blogs
CREATE POLICY "Authors can manage their own blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- 4. Create Indexes for optimized query execution
-- Speeds up listing the latest published blogs (used on home/blog pages)
CREATE INDEX IF NOT EXISTS blogs_published_created_at_idx ON blogs (published, created_at DESC);

-- Speeds up single-article queries based on the unique URL slug
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs (slug);

-- 5. Automatically handle updating the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE
  ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();