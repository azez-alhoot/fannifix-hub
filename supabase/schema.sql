-- FanniFix Supabase Schema
-- Run this in Supabase SQL Editor to create all tables

-- ============================================
-- Table: technicians
-- Purpose: Store technician profiles and data
-- ============================================
CREATE TABLE IF NOT EXISTS technicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name TEXT NOT NULL,
  name_en TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  
  -- Location
  country_code TEXT NOT NULL DEFAULT 'kw',
  area_ids TEXT[] NOT NULL DEFAULT '{}',
  
  -- Services
  service_ids TEXT[] NOT NULL DEFAULT '{}',
  
  -- Profile
  description TEXT,
  experience_years INTEGER DEFAULT 0,
  price_estimate TEXT,
  
  -- Images
  images TEXT[] DEFAULT '{}',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- Metadata
  views_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT technicians_country_code_check CHECK (country_code IN ('kw', 'sa', 'ae', 'qa'))
);

-- Indexes for technicians
CREATE INDEX IF NOT EXISTS idx_technicians_country_code ON technicians(country_code);
CREATE INDEX IF NOT EXISTS idx_technicians_status ON technicians(status);
CREATE INDEX IF NOT EXISTS idx_technicians_featured ON technicians(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_technicians_verified ON technicians(verified) WHERE verified = true;
CREATE INDEX IF NOT EXISTS idx_technicians_area_ids ON technicians USING GIN(area_ids);
CREATE INDEX IF NOT EXISTS idx_technicians_service_ids ON technicians USING GIN(service_ids);
CREATE INDEX IF NOT EXISTS idx_technicians_created_at ON technicians(created_at DESC);

-- ============================================
-- Table: leads (Optional)
-- Purpose: Log WhatsApp clicks for admin review
-- Note: GA4 remains source of truth for analytics
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Lead Info
  technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
  technician_name TEXT NOT NULL,
  service TEXT,
  area TEXT,
  
  -- Source Tracking (matches GA4)
  source TEXT NOT NULL DEFAULT 'direct',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Contact Info (if captured)
  phone TEXT,
  whatsapp TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ
);

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_technician_id ON leads(technician_id);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- Table: areas
-- Purpose: Store area/governorate data
-- ============================================
CREATE TABLE IF NOT EXISTS areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  country_code TEXT NOT NULL,
  governorate TEXT,
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT NOT NULL UNIQUE,
  
  -- Metadata
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for areas
CREATE INDEX IF NOT EXISTS idx_areas_country_code ON areas(country_code);
CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_areas_country_slug ON areas(country_code, slug);
CREATE INDEX IF NOT EXISTS idx_areas_active ON areas(active) WHERE active = true;

-- ============================================
-- Table: services
-- Purpose: Store service categories
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  
  -- Display
  icon TEXT,
  slug TEXT NOT NULL UNIQUE,
  color TEXT,
  
  -- Metadata
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for services
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_key ON services(key);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active) WHERE active = true;

-- ============================================
-- Table: admin_users (Optional)
-- Purpose: Admin authentication and management
-- Note: Supabase Auth handles authentication, this extends it
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Auth (Supabase Auth handles this, but we can extend)
  email TEXT UNIQUE NOT NULL,
  
  -- Profile
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'moderator', 'viewer')),
  
  -- Permissions
  can_edit_technicians BOOLEAN DEFAULT false,
  can_approve_technicians BOOLEAN DEFAULT false,
  can_view_leads BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Indexes for admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for technicians (active only)
CREATE POLICY "Public can view active technicians"
  ON technicians FOR SELECT
  USING (status = 'active');

-- Public read access for areas
CREATE POLICY "Public can view active areas"
  ON areas FOR SELECT
  USING (active = true);

-- Public read access for services
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (active = true);

-- Leads: Only admins can view (adjust based on your auth setup)
CREATE POLICY "Admins can view leads"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated'); -- Adjust based on your auth setup

-- Admin users: Only admins can view
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated'); -- Adjust based on your auth setup

-- ============================================
-- Functions & Triggers
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for technicians
CREATE TRIGGER update_technicians_updated_at
  BEFORE UPDATE ON technicians
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Notes
-- ============================================
-- 1. This schema is designed to work alongside GA4
-- 2. GA4 remains the source of truth for analytics
-- 3. Leads table is optional and mirrors GA4 events
-- 4. Adjust RLS policies based on your authentication setup
-- 5. All tables have proper indexes for performance

