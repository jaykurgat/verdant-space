-- ============================================================
-- Verdant Space — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable Row Level Security
-- First, create tables

-- Hero table
CREATE TABLE IF NOT EXISTS hero (
  id BIGINT PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL DEFAULT 'Connecting People,\nNature & Knowledge',
  tagline TEXT NOT NULL DEFAULT 'A living archive of environmental thought, ecological storytelling, and the quiet intelligence of the natural world.',
  image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default hero row
INSERT INTO hero (id, title, tagline, image_url)
VALUES (1, 'Connecting People,\nNature & Knowledge', 'A living archive of environmental thought, ecological storytelling, and the quiet intelligence of the natural world.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80')
ON CONFLICT (id) DO NOTHING;

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'Verdant Space',
  published BOOLEAN DEFAULT true,
  read_time TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  location TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ──────────────────────────────────────────────

ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);

-- Authenticated write access (for admin)
CREATE POLICY "Auth can update hero" ON hero FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert posts" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can update posts" ON posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can delete posts" ON posts FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- ── Optional: Full read for admin (all posts including unpublished) ──
CREATE POLICY "Auth can read all posts" ON posts FOR SELECT USING (auth.role() = 'authenticated');
