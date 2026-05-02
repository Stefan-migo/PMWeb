-- ============================================
-- PajaroMacaWeb — Initial Schema
-- ============================================
-- Run: npx supabase migration up
-- Description: Creates all tables for the tattoo + art portfolio site

-- ============================================
-- Categories / Taxonomies (shared)
-- ============================================

CREATE TABLE art_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tattoo_style_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

-- ============================================
-- Art Section
-- ============================================

CREATE TABLE artworks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  medium VARCHAR(100),
  year INTEGER,
  image_path TEXT NOT NULL,
  category_id INTEGER REFERENCES art_categories(id),
  is_featured BOOLEAN DEFAULT false,
  is_for_sale BOOLEAN DEFAULT false,
  price_cents INTEGER,
  width_cm NUMERIC(6,1),
  height_cm NUMERIC(6,1),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE exhibitions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  venue VARCHAR(255),
  description TEXT,
  image_path TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  is_upcoming BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Tattoo Section
-- ============================================

CREATE TABLE tattoo_styles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  category_id INTEGER REFERENCES tattoo_style_categories(id)
);

CREATE TABLE tattoos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_path TEXT NOT NULL,
  style_id INTEGER REFERENCES tattoo_styles(id),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE aftercare_sections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE about_sections (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  bio_text TEXT NOT NULL,
  image_path TEXT,
  style_tags TEXT[]
);

-- ============================================
-- Contact / Lead Forms
-- ============================================

CREATE TYPE quote_status AS ENUM ('pending', 'contacted', 'approved', 'completed', 'declined');

CREATE TABLE quote_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  description TEXT NOT NULL,
  placement VARCHAR(100),
  size_approx VARCHAR(100),
  status quote_status DEFAULT 'pending',
  admin_notes TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row-Level Security
-- ============================================

ALTER TABLE art_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read art_categories" ON art_categories FOR SELECT TO anon USING (true);

ALTER TABLE tattoo_style_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read style_categories" ON tattoo_style_categories FOR SELECT TO anon USING (true);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read artworks" ON artworks FOR SELECT TO anon USING (true);

ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exhibitions" ON exhibitions FOR SELECT TO anon USING (true);

ALTER TABLE tattoos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read tattoos" ON tattoos FOR SELECT TO anon USING (true);

ALTER TABLE tattoo_styles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read styles" ON tattoo_styles FOR SELECT TO anon USING (true);

ALTER TABLE aftercare_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read aftercare" ON aftercare_sections FOR SELECT TO anon USING (true);

ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about" ON about_sections FOR SELECT TO anon USING (true);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert quote" ON quote_requests FOR INSERT TO anon WITH CHECK (status IS NULL OR status = 'pending');

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_artworks_category ON artworks(category_id);
CREATE INDEX idx_artworks_slug ON artworks(slug);
CREATE INDEX idx_artworks_featured ON artworks(is_featured) WHERE is_featured = true;

CREATE INDEX idx_tattoos_style ON tattoos(style_id);
CREATE INDEX idx_tattoos_slug ON tattoos(slug);
CREATE INDEX idx_tattoos_featured ON tattoos(is_featured) WHERE is_featured = true;

CREATE INDEX idx_exhibitions_current ON exhibitions(is_current) WHERE is_current = true;
CREATE INDEX idx_exhibitions_dates ON exhibitions(start_date, end_date);

CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created ON quote_requests(created_at DESC);

CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);
