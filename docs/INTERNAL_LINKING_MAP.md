# Internal Linking Structure Map - FanniFix

## Overview
This document outlines the internal linking strategy to distribute page authority and improve SEO.

---

## Homepage (/kw)

### Links TO:
- **All Service Pages** (9 services)
  - `/kw/ac-technician`
  - `/kw/refrigerator`
  - `/kw/washing-machine`
  - `/kw/electrician`
  - `/kw/plumber`
  - `/kw/satellite`
  - `/kw/carpenter`
  - `/kw/general-maintenance`
  - `/kw/camera-installation`

- **Top Area Pages** (6-8 most popular areas)
  - `/kw/ac-technician/hawalli`
  - `/kw/electrician/salmiya`
  - `/kw/plumber/farwaniya`
  - `/kw/ac-technician/kuwait-city`
  - `/kw/washing-machine/salmiya`
  - `/kw/refrigerator/hawalli`

- **Featured Technicians** (6 technicians)
  - `/technician/{id}` (for each featured tech)

- **Other Pages**
  - `/kw/add-listing` (CTA for technicians)

---

## Service Page (/kw/{serviceSlug})

### Links FROM:
- Homepage (`/kw`)
- Other service pages (related services)
- Area pages (same service, different areas)

### Links TO:
- **All Area Pages for This Service** (all Kuwait areas)
  - `/kw/{serviceSlug}/hawalli`
  - `/kw/{serviceSlug}/salmiya`
  - `/kw/{serviceSlug}/farwaniya`
  - `/kw/{serviceSlug}/kuwait-city`
  - ... (all areas)

- **Related Services** (3-4 related services)
  - Example: `/kw/ac-technician` links to:
    - `/kw/refrigerator`
    - `/kw/washing-machine`
    - `/kw/electrician`

- **Featured Technicians for This Service**
  - `/technician/{id}` (top 3-6 technicians)

- **Other Pages**
  - `/kw` (homepage)
  - `/kw/add-listing` (CTA)

---

## Service + Area Page (/kw/{serviceSlug}/{areaSlug})

### Links FROM:
- Service page (`/kw/{serviceSlug}`)
- Other area pages (same service, different areas)
- Homepage (top areas)

### Links TO:
- **Other Areas for Same Service** (all other areas)
  - Example: `/kw/ac-technician/hawalli` links to:
    - `/kw/ac-technician/salmiya`
    - `/kw/ac-technician/farwaniya`
    - `/kw/ac-technician/kuwait-city`
    - ... (all other areas)

- **Related Services in Same Area** (2-3 related services)
  - Example: `/kw/ac-technician/hawalli` links to:
    - `/kw/electrician/hawalli`
    - `/kw/plumber/hawalli`

- **All Technicians on Page**
  - `/technician/{id}` (each technician card links to profile)

- **Other Pages**
  - `/kw/{serviceSlug}` (parent service page)
  - `/kw` (homepage)

---

## Technician Page (/technician/{id})

### Links FROM:
- Service pages
- Service + Area pages
- Homepage (featured)
- Other technician pages (related)

### Links TO:
- **Service Page** (primary service)
  - `/kw/{serviceSlug}`

- **Area Page** (primary area)
  - `/kw/{serviceSlug}/{areaSlug}`

- **Related Technicians** (same service/area)
  - `/technician/{id}` (2-3 related technicians)

- **Other Services** (if technician offers multiple)
  - `/kw/{otherServiceSlug}`

---

## Linking Best Practices

### 1. Anchor Text
- Use descriptive Arabic anchor text
- Include keywords naturally
- Example: "فني تكييف في حولي" not just "هنا"

### 2. Link Placement
- **Above the fold:** Important links (services, top areas)
- **In content:** Contextual links (related services/areas)
- **Footer:** Site-wide navigation

### 3. Link Density
- **Homepage:** 20-30 internal links
- **Service page:** 15-25 internal links
- **Area page:** 10-20 internal links
- **Technician page:** 5-10 internal links

### 4. Link Types
- **Navigation links:** Always visible (header, footer)
- **Contextual links:** Within content sections
- **Related links:** "خدمات أخرى", "مناطق أخرى"
- **CTA links:** "أضف إعلانك", "تواصل الآن"

---

## Priority Linking Strategy

### Tier 1 Pages (Highest Priority)
- Homepage (`/kw`)
- Top service pages (AC, Electrician, Plumber)
- Top area pages (Hawalli, Salmiya, Farwaniya)

### Tier 2 Pages (Medium Priority)
- Other service pages
- Other area pages
- Featured technician pages

### Tier 3 Pages (Standard Priority)
- Regular technician pages
- Less popular area combinations

---

## Implementation Checklist

- [x] Homepage links to all services
- [x] Service pages link to all areas
- [x] Area pages link to other areas
- [x] Technician cards link to profiles
- [x] Related services sections added
- [x] Breadcrumbs implemented
- [ ] Related technicians section (to add)
- [ ] Footer site map links (to review)

---

## Expected Impact

1. **Page Authority Distribution:** Links from homepage boost service pages
2. **Crawlability:** All pages accessible within 2-3 clicks
3. **User Experience:** Easy navigation between related content
4. **Keyword Coverage:** Internal links reinforce keyword relevance
5. **Indexing Speed:** Faster discovery of new pages

---

## Monitoring

Track:
- Internal link clicks (GA4)
- Pages per session
- Bounce rate by page type
- Time on site
- Conversion paths

