-- CMS foundation. Additive and safe to replay on an existing database.

ALTER TABLE art_categories ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE tattoo_style_categories ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE tattoo_styles ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS thumbnail_path text;
ALTER TABLE tattoos ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE tattoos ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE exhibitions ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE exhibitions ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE exhibitions ADD COLUMN IF NOT EXISTS location varchar(255);
ALTER TABLE aftercare_sections ADD COLUMN IF NOT EXISTS icon_name varchar(100);
ALTER TABLE aftercare_sections ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

ALTER TABLE about_sections ADD COLUMN IF NOT EXISTS section_type varchar(50);
ALTER TABLE about_sections ADD COLUMN IF NOT EXISTS title varchar(255);
ALTER TABLE about_sections ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE about_sections ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE about_sections ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
UPDATE about_sections
SET section_type = COALESCE(section_type, section),
    content = COALESCE(content, bio_text),
    title = COALESCE(title, section)
WHERE section_type IS NULL OR content IS NULL OR title IS NULL;
ALTER TABLE about_sections ALTER COLUMN section_type SET NOT NULL;
ALTER TABLE about_sections ALTER COLUMN title SET NOT NULL;
ALTER TABLE about_sections ALTER COLUMN content SET NOT NULL;
-- Legacy columns superseded by section_type/content. Relax their NOT NULL so
-- the reconciled seed (which only writes the new shape) can insert. Safe and
-- idempotent; a later cleanup may drop them once no rows depend on them.
ALTER TABLE about_sections ALTER COLUMN section DROP NOT NULL;
ALTER TABLE about_sections ALTER COLUMN bio_text DROP NOT NULL;

CREATE TABLE IF NOT EXISTS scenic_works (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  slug varchar(255) UNIQUE NOT NULL,
  description text,
  media_kind varchar(10) NOT NULL CHECK (media_kind IN ('image', 'video')),
  media_key text NOT NULL,
  media_url text NOT NULL,
  poster_url text,
  thumbnail_path text,
  sort_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  year integer,
  project_label varchar(255),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scenic_works ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read scenic_works" ON scenic_works;
CREATE POLICY "Public read scenic_works" ON scenic_works FOR SELECT TO anon USING (is_published = true);

DROP POLICY IF EXISTS "Public read artworks" ON artworks;
CREATE POLICY "Public read artworks" ON artworks FOR SELECT TO anon USING (is_published = true);
DROP POLICY IF EXISTS "Public read tattoos" ON tattoos;
CREATE POLICY "Public read tattoos" ON tattoos FOR SELECT TO anon USING (is_published = true);
DROP POLICY IF EXISTS "Public read exhibitions" ON exhibitions;
CREATE POLICY "Public read exhibitions" ON exhibitions FOR SELECT TO anon USING (is_published = true);

CREATE INDEX IF NOT EXISTS idx_artworks_published_order ON artworks(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_tattoos_published_order ON tattoos(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_exhibitions_published_order ON exhibitions(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_scenic_works_published_order ON scenic_works(is_published, sort_order);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'artworks_sort_order_nonnegative') THEN
    ALTER TABLE artworks ADD CONSTRAINT artworks_sort_order_nonnegative CHECK (sort_order >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tattoos_sort_order_nonnegative') THEN
    ALTER TABLE tattoos ADD CONSTRAINT tattoos_sort_order_nonnegative CHECK (sort_order >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'exhibitions_sort_order_nonnegative') THEN
    ALTER TABLE exhibitions ADD CONSTRAINT exhibitions_sort_order_nonnegative CHECK (sort_order >= 0);
  END IF;
END $$;
