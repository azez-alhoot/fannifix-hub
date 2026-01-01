# FanniFix GA4 Event Tracking Strategy
## Long-term Analytics Plan: MVP → Full Marketplace

**Version:** 1.0  
**Last Updated:** 2024  
**Goal:** Scalable analytics that never requires event renaming or resetting

---

## 🎯 Core Principles

1. **MVP First**: Track only what matters for MVP decisions
2. **No Noise**: Every event must answer a specific business question
3. **Future-Proof**: Event names and parameters never change once deployed
4. **Conversion-Focused**: WhatsApp clicks are the primary conversion metric

---

## 📋 Event Naming Conventions

### Standard Format
```
{object}_{action}
```

### Rules
- ✅ Use `snake_case` (lowercase with underscores)
- ✅ Be descriptive but concise (2-3 words max)
- ✅ Use present tense verbs (`click`, `view`, `submit`)
- ✅ Never use abbreviations unless universally understood
- ✅ Never include dates, versions, or temporary qualifiers

### Examples
- ✅ `whatsapp_click` (good)
- ✅ `technician_view` (good)
- ✅ `area_filter_click` (good)
- ❌ `whatsappClick` (camelCase - wrong)
- ❌ `whatsapp_click_v2` (version - wrong)
- ❌ `whatsapp_click_2024` (date - wrong)
- ❌ `wa_click` (abbreviation - wrong)

---

## 📊 Parameter Naming Rules

### Standard Format
```
{object}_{property}
```

### Rules
- ✅ Use `snake_case` (lowercase with underscores)
- ✅ Be consistent across all events
- ✅ Use standard GA4 parameter names when available
- ✅ Never change parameter names after deployment
- ✅ Use `id` suffix for identifiers, `name` for display values

### Standard Parameters (Use Across All Events)
```typescript
// Attribution
source: string              // UTM source (e.g., "google", "direct")
medium?: string             // UTM medium (optional)
campaign?: string           // UTM campaign (optional)

// Location
country_code: string         // ISO country code (e.g., "kw", "sa")
area_id?: string            // Area identifier
area_name?: string          // Area display name

// Content
service_id?: string         // Service identifier
service_name?: string       // Service display name
technician_id?: string     // Technician identifier
technician_name?: string   // Technician display name

// Page Context
page_path: string          // Current page path
page_title?: string        // Page title (optional)
```

### GA4 Reserved Parameters (Don't Override)
- `event_category` ❌ (deprecated in GA4, use custom parameters)
- `event_label` ❌ (deprecated in GA4, use custom parameters)
- `value` ✅ (use for conversion value only)
- `currency` ✅ (use with value for e-commerce)

---

## 🚀 MVP Events (Phase 1)

### 1. `page_view`
**Status:** ✅ Already implemented (automatic via GA4)

**When it fires:**
- Automatically on every page navigation
- Fired by GA4 script in `app/layout.tsx`

**Required Parameters:**
- `page_path` (automatic)
- `page_title` (automatic)
- `source` (custom - add via gtag config)

**Is Conversion:** No

**Business Question:** 
- Which pages drive the most traffic?
- What's the user journey through the site?
- Which pages have the highest bounce rate?

**Implementation:**
```typescript
// Already in app/layout.tsx
gtag('config', GA_MEASUREMENT_ID, {
  page_path: window.location.pathname,
  // Add custom parameters here if needed
});
```

---

### 2. `whatsapp_click`
**Status:** ✅ Already implemented

**When it fires:**
- User clicks any WhatsApp button/link
- Before opening WhatsApp app/web

**Required Parameters:**
```typescript
{
  source: string,              // UTM source or "direct"
  technician_id: string,       // Technician ID or "unknown"
  technician_name: string,     // Technician display name
  service_id?: string,         // Service ID (if available)
  service_name: string,        // Service display name
  area_id?: string,           // Area ID (if available)
  area_name: string,          // Area display name
  country_code: string,       // Country code (e.g., "kw")
  page_path: string,          // Current page path
  value?: number             // Optional: conversion value (default: 1)
}
```

**Is Conversion:** ✅ **YES** (Primary conversion event)

**Business Question:**
- How many leads are generated?
- Which technicians get the most clicks?
- Which services/areas drive conversions?
- What's the conversion rate by traffic source?
- What's the average conversion value per click?

**Current Implementation:**
```typescript
// src/lib/analytics.ts - trackWhatsAppClick()
// ✅ Already tracking: source, technician_name, service, area, technician_id
// ⚠️ Needs update: Add service_id, area_id, country_code, page_path
```

**Recommended Update:**
```typescript
export function trackWhatsAppClick(params: {
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
  serviceId?: string;      // ADD
  areaId?: string;         // ADD
  countryCode?: string;    // ADD
}): void {
  if (typeof window === 'undefined') return;
  
  const source = getUtmSource();
  
  if ((window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      // Standard parameters
      source: source,
      technician_id: params.technicianId || 'unknown',
      technician_name: params.technicianName,
      service_id: params.serviceId || 'unknown',      // ADD
      service_name: params.service,                    // RENAME from 'service'
      area_id: params.areaId || 'unknown',            // ADD
      area_name: params.area,                          // RENAME from 'area'
      country_code: params.countryCode || 'kw',       // ADD
      page_path: window.location.pathname,             // ADD
      value: 1,                                        // Conversion value
    });
  }
}
```

---

### 3. `phone_call`
**Status:** ⏳ To be implemented

**When it fires:**
- User clicks any phone call button/link (`tel:` link)
- Before opening phone dialer

**Required Parameters:**
```typescript
{
  source: string,              // UTM source or "direct"
  technician_id: string,       // Technician ID or "unknown"
  technician_name: string,     // Technician display name
  service_id?: string,         // Service ID (if available)
  service_name: string,        // Service display name
  area_id?: string,           // Area ID (if available)
  area_name: string,          // Area display name
  country_code: string,       // Country code (e.g., "kw")
  page_path: string,          // Current page path
  value?: number             // Optional: conversion value (default: 1)
}
```

**Is Conversion:** ✅ **YES** (Secondary conversion event)

**Business Question:**
- How many phone calls are initiated?
- What's the WhatsApp vs Phone call preference?
- Which technicians get the most phone calls?
- Which services/areas drive phone calls?
- What's the phone call conversion rate by traffic source?

**Implementation Location:**
```typescript
// src/lib/analytics.ts - trackPhoneCall()
// src/components/ContactButtons.tsx - handleCall()
// src/components/TechnicianCard.tsx - handleCall()
// src/components/TechniciansSection.tsx - call button onClick
```

**Recommended Implementation:**
```typescript
export function trackPhoneCall(params: {
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
  serviceId?: string;
  areaId?: string;
  countryCode?: string;
}): void {
  if (typeof window === 'undefined') return;
  
  const source = getUtmSource();
  
  if ((window as any).gtag) {
    (window as any).gtag('event', 'phone_call', {
      source: source,
      technician_id: params.technicianId || 'unknown',
      technician_name: params.technicianName,
      service_id: params.serviceId || 'unknown',
      service_name: params.service,
      area_id: params.areaId || 'unknown',
      area_name: params.area,
      country_code: params.countryCode || 'kw',
      page_path: window.location.pathname,
      value: 1,
    });
  }
}

export function handlePhoneCall(params: {
  phoneNumber: string;
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
  serviceId?: string;
  areaId?: string;
  countryCode?: string;
}): void {
  // Track phone call event
  trackPhoneCall({
    technicianName: params.technicianName,
    service: params.service,
    area: params.area,
    technicianId: params.technicianId,
    serviceId: params.serviceId,
    areaId: params.areaId,
    countryCode: params.countryCode,
  });
  
  // Open phone dialer
  window.open(`tel:${params.phoneNumber}`, '_blank');
}
```

---

## 📈 Growth Events (Phase 2)

### 4. `technician_view`
**Status:** ⏳ To be implemented

**When it fires:**
- User views a technician detail page (`/technician/[id]`)
- Fires once per page load (not on scroll)

**Required Parameters:**
```typescript
{
  source: string,              // UTM source
  technician_id: string,       // Technician ID
  technician_name: string,     // Technician display name
  service_id?: string,         // Primary service ID
  service_name?: string,       // Primary service name
  area_id?: string,           // Primary area ID
  area_name?: string,         // Primary area name
  country_code: string,       // Country code
  page_path: string,          // "/technician/{id}"
  is_featured: boolean,       // Is technician featured?
  is_verified: boolean,       // Is technician verified?
}
```

**Is Conversion:** No (but can be used in funnel analysis)

**Business Question:**
- Which technicians get the most views?
- What's the view-to-click conversion rate?
- Do featured/verified technicians get more views?
- Which services/areas drive technician views?

**Implementation Location:**
```typescript
// app/technician/[id]/page.tsx
// Add useEffect to track on mount
```

---

### 5. `area_filter_click`
**Status:** ⏳ To be implemented

**When it fires:**
- User selects an area from a filter/dropdown
- User clicks an area chip/badge
- User navigates to an area-specific page via filter

**Required Parameters:**
```typescript
{
  source: string,              // UTM source
  area_id: string,            // Selected area ID
  area_name: string,          // Selected area name
  country_code: string,      // Country code
  page_path: string,         // Current page path
  filter_type: string,       // "dropdown" | "chip" | "search"
  previous_area_id?: string, // Previous selection (if applicable)
}
```

**Is Conversion:** No

**Business Question:**
- Which areas are most popular?
- How do users filter by area?
- What's the area selection pattern?
- Which areas drive the most engagement?

**Implementation Location:**
```typescript
// src/components/SearchBar.tsx - on area selection
// src/components/AreaChip.tsx - on chip click
// Any area filter component
```

---

### 6. `service_filter_click`
**Status:** ⏳ To be implemented

**When it fires:**
- User selects a service from a filter/dropdown
- User clicks a service card/badge
- User navigates to a service-specific page via filter

**Required Parameters:**
```typescript
{
  source: string,              // UTM source
  service_id: string,         // Selected service ID
  service_name: string,       // Selected service name
  country_code: string,      // Country code
  page_path: string,         // Current page path
  filter_type: string,      // "dropdown" | "card" | "search"
  previous_service_id?: string, // Previous selection (if applicable)
}
```

**Is Conversion:** No

**Business Question:**
- Which services are most searched?
- How do users filter by service?
- What's the service selection pattern?
- Which services drive the most engagement?

**Implementation Location:**
```typescript
// src/components/SearchBar.tsx - on service selection
// src/components/ServiceCard.tsx - on card click
// Any service filter component
```

---

### 7. `featured_technician_click`
**Status:** ⏳ To be implemented

**When it fires:**
- User clicks on a featured technician card/link
- From homepage, featured section, or any listing

**Required Parameters:**
```typescript
{
  source: string,              // UTM source
  technician_id: string,       // Technician ID
  technician_name: string,     // Technician name
  service_id?: string,         // Service ID
  service_name?: string,       // Service name
  area_id?: string,           // Area ID
  area_name?: string,         // Area name
  country_code: string,       // Country code
  page_path: string,         // Current page path
  click_location: string,     // "homepage" | "featured_section" | "listing" | "search_results"
  position?: number,          // Position in list (1-indexed)
}
```

**Is Conversion:** No (but indicates high intent)

**Business Question:**
- Do featured technicians get more clicks?
- What's the ROI of featuring technicians?
- Which featured positions perform best?
- What's the featured-to-whatsapp conversion rate?

**Implementation Location:**
```typescript
// src/components/TechnicianCard.tsx - on featured card click
// src/components/TechniciansSection.tsx - on featured section click
// src/components/LatestListings.tsx - on featured listing click
```

---

## 🔮 Future Events (Phase 3+)

### 8. `lead_submitted`
**Status:** 🔮 Future (when lead forms are added)

**When it fires:**
- User submits a lead form (not WhatsApp)
- Form submission is successful

**Required Parameters:**
```typescript
{
  source: string,
  technician_id?: string,
  service_id?: string,
  area_id?: string,
  country_code: string,
  page_path: string,
  form_type: string,         // "contact_form" | "quote_request" | "booking"
  value?: number,            // Lead value if applicable
}
```

**Is Conversion:** ✅ Yes (secondary conversion)

**Business Question:**
- How many leads come from forms vs WhatsApp?
- What's the form completion rate?
- Which form types convert best?

---

### 9. `technician_signup`
**Status:** 🔮 Future (when technician registration is added)

**When it fires:**
- New technician completes registration
- Registration is successful

**Required Parameters:**
```typescript
{
  source: string,
  country_code: string,
  signup_method: string,     // "direct" | "invite" | "referral"
  referral_code?: string,    // If applicable
  service_ids: string[],     // Services they offer
  area_ids: string[],        // Areas they cover
}
```

**Is Conversion:** ✅ Yes (business growth metric)

**Business Question:**
- How many technicians sign up?
- What's the signup source breakdown?
- Which services/areas need more technicians?

---

### 10. `subscription_purchase`
**Status:** 🔮 Future (when subscriptions are added)

**When it fires:**
- Technician purchases a subscription/plan
- Payment is successful

**Required Parameters:**
```typescript
{
  source: string,
  technician_id: string,
  plan_type: string,         // "basic" | "premium" | "enterprise"
  plan_duration: string,     // "monthly" | "yearly"
  value: number,             // Purchase amount
  currency: string,          // "KWD" | "SAR" | etc.
  country_code: string,
}
```

**Is Conversion:** ✅ Yes (revenue metric)

**Business Question:**
- What's the subscription conversion rate?
- Which plans are most popular?
- What's the average revenue per technician?

---

## ❌ What NOT to Track

### Don't Track These (Noise Events)

1. **Scroll depth** ❌
   - Why: Not actionable, creates noise
   - Exception: Only if you have a specific hypothesis to test

2. **Time on page** ❌
   - Why: GA4 already tracks this automatically
   - Use: Built-in GA4 metrics instead

3. **Every button click** ❌
   - Why: Too granular, not meaningful
   - Track: Only conversion-critical actions

4. **Hover events** ❌
   - Why: Not a conversion signal
   - Track: Clicks only

5. **Form field interactions** ❌
   - Why: Too noisy, not actionable
   - Track: Form submissions only

6. **Video plays** ❌
   - Why: Not relevant for MVP
   - Track: Only if videos are core to conversion

7. **Social shares** ❌
   - Why: Low priority for MVP
   - Track: Only if sharing is a key growth lever

8. **Search queries** ❌
   - Why: Privacy concerns, not actionable
   - Track: Search results clicks instead

### General Rule
**If you can't answer "What business decision will this data inform?" → Don't track it.**

---

## 🛡️ How to Avoid Breaking GA History

### 1. Never Rename Events
**Rule:** Once an event is deployed, it's permanent.

**Bad:**
```typescript
// Week 1
gtag('event', 'whatsapp_click');

// Week 2 (WRONG - breaks history)
gtag('event', 'whatsapp_click_v2');
```

**Good:**
```typescript
// Week 1
gtag('event', 'whatsapp_click');

// Week 2 (GOOD - add new parameter)
gtag('event', 'whatsapp_click', {
  ...existingParams,
  new_param: 'value', // Add new data, don't rename event
});
```

### 2. Never Remove Parameters
**Rule:** Parameters can be deprecated but never removed.

**Bad:**
```typescript
// Week 1
gtag('event', 'whatsapp_click', {
  technician_name: 'Ahmed',
  service: 'AC Repair',
});

// Week 2 (WRONG - breaks historical queries)
gtag('event', 'whatsapp_click', {
  technician_name: 'Ahmed',
  // service removed - breaks reports
});
```

**Good:**
```typescript
// Week 1
gtag('event', 'whatsapp_click', {
  technician_name: 'Ahmed',
  service_name: 'AC Repair', // Use consistent naming
});

// Week 2 (GOOD - keep old params, add new ones)
gtag('event', 'whatsapp_click', {
  technician_name: 'Ahmed',
  service_name: 'AC Repair', // Keep for backward compatibility
  service_id: 'svc-123',      // Add new param
});
```

### 3. Use Consistent Parameter Names
**Rule:** Same concept = same parameter name across all events.

**Bad:**
```typescript
// Event 1
gtag('event', 'whatsapp_click', { tech_name: 'Ahmed' });

// Event 2 (WRONG - inconsistent)
gtag('event', 'technician_view', { technician_name: 'Ahmed' });
```

**Good:**
```typescript
// Event 1
gtag('event', 'whatsapp_click', { technician_name: 'Ahmed' });

// Event 2 (GOOD - consistent)
gtag('event', 'technician_view', { technician_name: 'Ahmed' });
```

### 4. Version New Events, Not Existing Ones
**Rule:** If you need to change behavior, create a new event.

**Bad:**
```typescript
// Old behavior
gtag('event', 'whatsapp_click', { value: 1 });

// New behavior (WRONG - changes meaning)
gtag('event', 'whatsapp_click', { value: 10 });
```

**Good:**
```typescript
// Old behavior (keep as-is)
gtag('event', 'whatsapp_click', { value: 1 });

// New behavior (create new event if needed)
gtag('event', 'whatsapp_click_premium', { value: 10 });
// Or better: use a parameter
gtag('event', 'whatsapp_click', { 
  value: 10,
  click_type: 'premium', // Distinguish via parameter
});
```

### 5. Document All Events
**Rule:** Every event must be documented before deployment.

**Template:**
```markdown
### Event Name: `event_name`
- **Status:** MVP | Growth | Future
- **When it fires:** [Description]
- **Required Parameters:** [List]
- **Is Conversion:** Yes/No
- **Business Question:** [What it answers]
- **Implementation:** [File/function location]
```

### 6. Use TypeScript Types
**Rule:** Define event parameter types to prevent mistakes.

**Example:**
```typescript
// src/lib/analytics-types.ts
export interface WhatsAppClickParams {
  source: string;
  technician_id: string;
  technician_name: string;
  service_id?: string;
  service_name: string;
  area_id?: string;
  area_name: string;
  country_code: string;
  page_path: string;
  value?: number;
}

export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  // Implementation
}
```

---

## 📐 Implementation Checklist

### Phase 1: MVP (Current)
- [x] `page_view` - Automatic via GA4
- [x] `whatsapp_click` - Implemented
- [ ] Update `whatsapp_click` parameters (add IDs, country_code, page_path)
- [ ] `phone_call` - Add phone call tracking

### Phase 2: Growth (Next)
- [ ] `technician_view` - Add to technician detail pages
- [ ] `area_filter_click` - Add to SearchBar and AreaChip
- [ ] `service_filter_click` - Add to SearchBar and ServiceCard
- [ ] `featured_technician_click` - Add to TechnicianCard clicks

### Phase 3: Future
- [ ] `lead_submitted` - When forms are added
- [ ] `technician_signup` - When registration is added
- [ ] `subscription_purchase` - When subscriptions are added

---

## 🔧 Technical Implementation Guide

### Centralized Event Tracking Function

Create a centralized tracking function to ensure consistency:

```typescript
// src/lib/analytics.ts

/**
 * Standard event tracking wrapper
 * Ensures all events include required base parameters
 */
function trackEvent(
  eventName: string,
  params: Record<string, any>
): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  const source = getUtmSource();
  
  // Always include base parameters
  const baseParams = {
    source,
    country_code: params.country_code || 'kw',
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
  };

  // Merge with event-specific parameters
  const finalParams = {
    ...baseParams,
    ...params,
  };

  (window as any).gtag('event', eventName, finalParams);
}

// Export specific tracking functions
export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  trackEvent('whatsapp_click', {
    technician_id: params.technicianId || 'unknown',
    technician_name: params.technicianName,
    service_id: params.serviceId,
    service_name: params.service,
    area_id: params.areaId,
    area_name: params.area,
    country_code: params.countryCode || 'kw',
    value: 1,
  });
}

export function trackTechnicianView(params: TechnicianViewParams): void {
  trackEvent('technician_view', {
    technician_id: params.technicianId,
    technician_name: params.technicianName,
    service_id: params.serviceId,
    service_name: params.serviceName,
    area_id: params.areaId,
    area_name: params.areaName,
    country_code: params.countryCode,
    is_featured: params.isFeatured,
    is_verified: params.isVerified,
  });
}

// ... other tracking functions
```

---

## 📊 GA4 Dashboard Setup

### Recommended Custom Reports

1. **Conversion Funnel**
   - `page_view` → `technician_view` → `whatsapp_click`
   - Shows drop-off at each stage

2. **Source Performance**
   - `whatsapp_click` by `source`
   - Shows which traffic sources convert best

3. **Service Performance**
   - `whatsapp_click` by `service_name`
   - Shows which services drive most conversions

4. **Area Performance**
   - `whatsapp_click` by `area_name`
   - Shows which areas drive most conversions

5. **Technician Performance**
   - `whatsapp_click` by `technician_name`
   - Shows which technicians get most clicks

---

## ✅ Summary

### Event Naming
- ✅ Use `snake_case`
- ✅ Format: `{object}_{action}`
- ✅ Never include versions or dates

### Parameters
- ✅ Use `snake_case`
- ✅ Be consistent across events
- ✅ Never remove parameters
- ✅ Add new parameters as needed

### What to Track
- ✅ MVP: `page_view`, `whatsapp_click`
- ✅ Growth: `technician_view`, filter clicks, featured clicks
- ✅ Future: Lead forms, signups, subscriptions

### What NOT to Track
- ❌ Scroll depth, hover events, every click
- ❌ Anything that doesn't answer a business question

### History Protection
- ✅ Never rename events
- ✅ Never remove parameters
- ✅ Use TypeScript types
- ✅ Document everything

---

**This strategy is designed to scale from MVP to full marketplace without ever breaking GA4 history or requiring event renaming.**

