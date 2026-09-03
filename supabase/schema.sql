-- ══════════════════════════════════════════════════════════
-- DTO PORTAL v3 — Full Database Schema
-- Run in Supabase SQL Editor → New Query
-- ══════════════════════════════════════════════════════════

CREATE TABLE patents (
  id                    SERIAL PRIMARY KEY,

  -- Core identity
  name                  TEXT NOT NULL,
  sector                TEXT NOT NULL,
  description           TEXT NOT NULL,
  holder                TEXT,

  -- Access classification
  access_type           TEXT NOT NULL DEFAULT 'Public Domain'
                        CHECK (access_type IN ('Public Domain','Patent Pool','Compulsory License')),
  available_since       TEXT,

  -- Value & geography
  saving                TEXT,
  countries             TEXT,
  jurisdiction_notes    TEXT,   -- per-country status variations

  -- Source & evidence
  source_link           TEXT,
  notes                 TEXT,   -- implementation notes

  -- DTO verification
  confidence            TEXT NOT NULL DEFAULT 'DTO Verified'
                        CHECK (confidence IN ('DTO Verified','Partially Verified','Legal Review Required')),
  verified_date         TEXT DEFAULT 'May 2026',

  -- Discovery metadata
  tags                  TEXT[],              -- e.g. ARRAY['HIV','antiretroviral','sub-saharan']
  implementation_difficulty TEXT DEFAULT 'Medium'
                        CHECK (implementation_difficulty IN ('Low','Medium','High')),
  related_entry_ids     INTEGER[],           -- IDs of related entries

  -- Publishing control
  is_published          BOOLEAN NOT NULL DEFAULT true,

  -- Analytics
  view_count            INTEGER NOT NULL DEFAULT 0,

  -- Timestamps
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES for fast queries
CREATE INDEX patents_sector_idx      ON patents(sector);
CREATE INDEX patents_access_type_idx ON patents(access_type);
CREATE INDEX patents_confidence_idx  ON patents(confidence);
CREATE INDEX patents_published_idx   ON patents(is_published);
CREATE INDEX patents_tags_idx        ON patents USING GIN(tags);
CREATE INDEX patents_fts_idx         ON patents
  USING GIN(to_tsvector('english', name || ' ' || description || ' ' || COALESCE(countries,'') || ' ' || COALESCE(notes,'')));

-- ── ROW LEVEL SECURITY
ALTER TABLE patents ENABLE ROW LEVEL SECURITY;

-- Public: read published entries only
CREATE POLICY "Public read published"
  ON patents FOR SELECT TO anon
  USING (is_published = true);

-- Admin: full access when authenticated
CREATE POLICY "Admin full access"
  ON patents FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── AUTO-UPDATE timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

CREATE TRIGGER patents_updated_at
  BEFORE UPDATE ON patents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── AUDIT LOG TABLE (tracks every add/edit/delete)
CREATE TABLE audit_log (
  id         SERIAL PRIMARY KEY,
  action     TEXT NOT NULL,         -- 'INSERT' | 'UPDATE' | 'DELETE'
  patent_id  INTEGER,
  patent_name TEXT,
  changed_by TEXT,                  -- email of admin
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  diff       JSONB                  -- what changed
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read audit" ON audit_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin write audit" ON audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- ── VIEW COUNT increment function (called from frontend)
CREATE OR REPLACE FUNCTION increment_view_count(patent_id INTEGER)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE patents SET view_count = view_count + 1 WHERE id = patent_id;
END; $$;

GRANT EXECUTE ON FUNCTION increment_view_count TO anon;

-- ── CONSULTATION REQUESTS TABLE
CREATE TABLE consultation_requests (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  organisation TEXT NOT NULL,
  country      TEXT NOT NULL,
  email        TEXT NOT NULL,
  sector       TEXT,
  message      TEXT,
  status       TEXT DEFAULT 'new' CHECK (status IN ('new','replied','closed')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon insert consult" ON consultation_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin read consult"  ON consultation_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update consult" ON consultation_requests FOR UPDATE TO authenticated USING (true);

-- ── NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT,              -- which form they signed up from
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon insert sub" ON subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin read sub"  ON subscribers FOR SELECT TO authenticated USING (true);

-- ══════════════════════════════════════════════════════════
-- VERIFY — run after seeding
-- ══════════════════════════════════════════════════════════
-- SELECT COUNT(*) FROM patents;
-- SELECT sector, COUNT(*) FROM patents GROUP BY sector ORDER BY COUNT(*) DESC;
