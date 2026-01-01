# Data-Driven Architecture - FanniFix

## Overview

This document describes the data-driven architecture refactoring that makes FanniFix:
- ✅ Easy to maintain (all content in JSON)
- ✅ Easy to migrate to backend (JSON structure matches DB schema)
- ✅ SEO-scalable for multiple countries

## Folder Structure

```
/data
  /countries
    kw.json          # Kuwait country data
    sa.json          # Saudi Arabia (disabled, ready)
    ae.json          # UAE (disabled, ready)
    qa.json          # Qatar (disabled, ready)
  
  /services
    services.json    # All services (id, name, slug)
  
  /areas
    kw-areas.json    # Kuwait areas (id, name, slug)
    # Future: sa-areas.json, ae-areas.json, etc.
  
  /technicians
    technicians.json # All technicians (normalized structure)
  
  /seo
    kw-seo.json      # All SEO metadata + content for Kuwait
    # Future: sa-seo.json, ae-seo.json, etc.
```

## Data Structure

### Countries (`/data/countries/kw.json`)

```json
{
  "code": "kw",
  "name": "الكويت",
  "nameEn": "Kuwait",
  "flag": "🇰🇼",
  "currency": "KWD",
  "currencySymbol": "د.ك",
  "language": "ar",
  "enabled": true
}
```

**Rules:**
- `code` is the country code (kw, sa, ae, qa)
- `enabled` controls if country is active
- Other countries are disabled but ready

### Services (`/data/services/services.json`)

```json
[
  {
    "id": "ac",
    "name": "فني تكييف",
    "slug": "ac-technician"
  }
]
```

**Rules:**
- `id` must NEVER change (used in URLs, relations)
- `slug` is SEO-safe, can change
- `name` is localized

### Areas (`/data/areas/kw-areas.json`)

```json
[
  {
    "id": "hawalli",
    "name": "حولي",
    "slug": "hawalli"
  }
]
```

**Rules:**
- Areas belong to a country (file name: `{country}-areas.json`)
- `id` must NEVER change
- Reusable for SEO pages

### Technicians (`/data/technicians/technicians.json`)

```json
[
  {
    "id": "tech_001",
    "name": "أحمد محمد العنزي",
    "service_id": "ac",
    "areas": ["hawalli", "salmiya"],
    "whatsapp": "96550123456",
    "price_range": "15-30 د.ك",
    "featured": true
  }
]
```

**Rules:**
- Pure data only (no UI logic)
- Structure matches future DB table exactly
- `service_id` references service.id
- `areas` array references area.id

### SEO Data (`/data/seo/kw-seo.json`)

```json
{
  "default": {
    "title": "فني فيكس الكويت | فنيين موثوقين تواصل مباشر",
    "description": "...",
    "keywords": "..."
  },
  "services": {
    "ac": {
      "title": "فني تكييف الكويت | فني فيكس",
      "description": "...",
      "service_description": "تركيب وصيانة أجهزة التكييف..."
    }
  },
  "areas": {
    "hawalli": {
      "title": "فنيين في حولي | فني فيكس",
      "description": "..."
    }
  },
  "service_area": {
    "ac_hawalli": {
      "title": "فني تكييف في حولي | فني فيكس الكويت",
      "description": "..."
    }
  },
  "content": {
    "faqs": { ... },
    "pricing": { ... },
    "hero": { ... },
    "cta": { ... }
  }
}
```

**Rules:**
- All SEO metadata is data-driven
- Content (FAQs, pricing, hero text) is also in JSON
- Fallback to default if missing
- Supports: `/kw`, `/kw/{service}`, `/kw/{service}/{area}`

## Data Access Layer

The `/data/index.ts` file provides a clean API:

```typescript
// Countries
getCountryByCode(code: string): Country | undefined
getEnabledCountries(): Country[]

// Services
getServiceById(id: string): Service | undefined
getServiceBySlug(slug: string): Service | undefined

// Areas
getAreasByCountry(countryCode: string): Area[]
getAreaById(id: string, countryCode: string): Area | undefined
getAreaBySlug(slug: string, countryCode: string): Area | undefined

// Technicians
getTechnicianById(id: string): Technician | undefined
getTechniciansByService(serviceId: string): Technician[]
getTechniciansByArea(areaId: string): Technician[]
searchTechnicians(filters): Technician[]

// SEO
getSeoForPage(countryCode, type, key?, key2?): SeoData | undefined
getFaqs(countryCode, type, serviceName?, areaName?): FAQ[]
getPricing(countryCode): Pricing | undefined
getHeroContent(countryCode): HeroContent | undefined
getCtaContent(countryCode): CtaContent | undefined
```

## Component Rules

✅ **DO:**
- Read data via props
- Use data access functions from `/data/index.ts`
- Render data dynamically
- Support any country (not hardcoded to Kuwait)

❌ **DON'T:**
- Hardcode any text/content
- Fetch from APIs (use JSON)
- Include UI logic in JSON
- Duplicate content

## Migration to Backend

### Step 1: Database Schema

Create tables matching JSON structure exactly:

```sql
-- Countries table
CREATE TABLE countries (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(255),
  name_en VARCHAR(255),
  flag VARCHAR(10),
  currency VARCHAR(3),
  currency_symbol VARCHAR(10),
  language VARCHAR(2),
  enabled BOOLEAN
);

-- Services table
CREATE TABLE services (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(255) UNIQUE
);

-- Areas table
CREATE TABLE areas (
  id VARCHAR(50) PRIMARY KEY,
  country_code VARCHAR(2) REFERENCES countries(code),
  name VARCHAR(255),
  slug VARCHAR(255)
);

-- Technicians table
CREATE TABLE technicians (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  service_id VARCHAR(50) REFERENCES services(id),
  areas JSONB, -- Array of area IDs
  whatsapp VARCHAR(20),
  price_range VARCHAR(50),
  featured BOOLEAN
);

-- SEO table (or separate tables)
CREATE TABLE seo_data (
  country_code VARCHAR(2),
  page_type VARCHAR(50), -- 'default', 'service', 'area', 'service_area'
  page_key VARCHAR(100), -- service ID, area ID, or 'service_area' combo
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  content JSONB -- FAQs, pricing, etc.
);
```

### Step 2: API Endpoints

Create REST/GraphQL endpoints:

```typescript
// GET /api/countries
// GET /api/countries/:code
// GET /api/services
// GET /api/services/:id
// GET /api/areas?country=kw
// GET /api/technicians?service=ac&area=hawalli
// GET /api/seo?country=kw&type=service&key=ac
```

### Step 3: Replace JSON Imports

**Before (JSON):**
```typescript
import servicesData from './services/services.json';
export const services = servicesData;
```

**After (API):**
```typescript
// In /data/index.ts
export const getServices = async () => {
  const response = await fetch('/api/services');
  return response.json();
};
```

### Step 4: Update Components

Components don't need to change! They already use the data access layer:

```typescript
// This works with both JSON and API
const service = getServiceBySlug('ac-technician');
```

### Step 5: Caching Strategy

For production, add caching:

```typescript
// Cache JSON data in memory
let cachedServices: Service[] | null = null;

export const getServices = async () => {
  if (cachedServices) return cachedServices;
  
  const response = await fetch('/api/services');
  cachedServices = await response.json();
  return cachedServices;
};
```

## Benefits

1. **Zero Component Changes**: Components already read from data layer
2. **Same Structure**: JSON structure = DB schema
3. **Type Safety**: TypeScript types match both JSON and DB
4. **Easy Testing**: Mock JSON files for tests
5. **SEO Scalable**: Add new country = add new JSON files

## Adding a New Country

1. Create `/data/countries/{code}.json`
2. Create `/data/areas/{code}-areas.json`
3. Create `/data/seo/{code}-seo.json`
4. Update `/data/index.ts` to load new files
5. Enable country in JSON (`enabled: true`)

**That's it!** No component changes needed.

## File Locations

- **Data Files**: `/data/` (root level)
- **Data Access**: `/data/index.ts`
- **Type Definitions**: `/data/index.ts` (exported interfaces)
- **Pages**: `/app/**/page.tsx` (use data access functions)

## Next Steps

1. ✅ JSON structure created
2. ✅ Data access layer created
3. ✅ Pages updated to use JSON
4. ⏳ Update remaining components (if any hardcoded content)
5. ⏳ Add more countries (sa, ae, qa)
6. ⏳ Backend migration (when ready)

