-- ============================================================
-- Verdant Space — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable Row Level Security
-- First, create tables

-- Hero table (now stores carousel slides as JSON)
CREATE TABLE IF NOT EXISTS hero (
  id BIGINT PRIMARY KEY DEFAULT 1,
  slides JSONB NOT NULL DEFAULT '[]',
  autoplay BOOLEAN DEFAULT true,
  interval_seconds INT DEFAULT 6,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Content table (About page, Footer, Contact — all editable text)
CREATE TABLE IF NOT EXISTS site_content (
  id BIGINT PRIMARY KEY DEFAULT 1,
  about_intro TEXT,
  origin_story_title TEXT,
  origin_story TEXT,
  origin_story_image_url TEXT,
  origin_story_quote TEXT,
  vision_title TEXT,
  vision_text TEXT,
  mission_title TEXT,
  mission_text TEXT,
  purpose_title TEXT,
  purpose_text TEXT,
  brand_promise TEXT,
  objectives JSONB DEFAULT '[]',
  contact_intro TEXT,
  contact_email TEXT,
  contact_location TEXT,
  footer_tagline TEXT,
  footer_quote TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Public can read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);

-- Authenticated write access (for admin)
CREATE POLICY "Auth can update hero" ON hero FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert hero" ON hero FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can update site_content" ON site_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert site_content" ON site_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert posts" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can update posts" ON posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can delete posts" ON posts FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- ── Optional: Full read for admin (all posts including unpublished) ──
CREATE POLICY "Auth can read all posts" ON posts FOR SELECT USING (auth.role() = 'authenticated');
