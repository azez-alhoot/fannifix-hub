# FanniFix Analytics & Tracking Setup

This document explains the analytics and tracking implementation for FanniFix.

## 📊 Overview

The website uses Google Analytics 4 (GA4) to track:
- **Page views** (automatic)
- **WhatsApp clicks** (conversion events with source tracking)
- **UTM source detection** (for attribution)

## 🔧 Configuration

### Google Analytics Measurement ID

The GA4 Measurement ID is configured in `/src/lib/ga-config.ts`:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LECCE2MK38';
```

**To change the Measurement ID:**

1. **Option 1**: Set environment variable (recommended for production)
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID
   ```

2. **Option 2**: Edit `src/lib/ga-config.ts` directly

### GA4 Script Loading

GA4 loads automatically on every page via `/app/layout.tsx`:
- Loads after page becomes interactive (non-blocking)
- Tracks page views automatically
- Loads once globally

## 📱 WhatsApp Click Tracking

### How It Works

Every WhatsApp button click triggers a GA4 event with:
- **Event name**: `whatsapp_click`
- **Event category**: `engagement`
- **Parameters**:
  - `source`: UTM source (e.g., "google", "instagram", "tiktok") or "direct"
  - `technician_name`: Name of the technician
  - `service`: Service type (e.g., "AC Technician")
  - `area`: Area name (e.g., "Hawalli")
  - `technician_id`: Unique technician ID

### Implementation

All WhatsApp buttons use the centralized handler:

```typescript
import { handleWhatsAppClick } from "@/lib/analytics";

handleWhatsAppClick({
  phoneNumber: "965XXXXXXXX",
  technicianName: "Ahmed Alenezi",
  service: "AC Technician",
  area: "Hawalli",
  technicianId: "tech-1",
});
```

### WhatsApp Message Pre-filling

When users click WhatsApp, the message is automatically pre-filled:

```
مرحبا، وصلتكم من {source} عبر موقع FanniFix
```

Example:
- From Google: `مرحبا، وصلتكم من google عبر موقع FanniFix`
- Direct: `مرحبا، وصلتكم من direct عبر موقع FanniFix`

## 🔍 UTM Source Detection

### How It Works

1. **On page load**: Checks URL for `utm_source` parameter
2. **If found**: Stores in `sessionStorage` for persistence
3. **If missing**: Defaults to `"direct"`
4. **Persistence**: Source persists across internal page navigations

### Usage Example

```typescript
import { getUtmSource } from "@/lib/analytics";

const source = getUtmSource(); // Returns "google", "instagram", "direct", etc.
```

### URL Examples

- `https://fannifix.com/kw?utm_source=google` → Source: "google"
- `https://fannifix.com/kw?utm_source=instagram` → Source: "instagram"
- `https://fannifix.com/kw` → Source: "direct"

## 📁 File Structure

```
src/
├── lib/
│   ├── analytics.ts          # Core analytics functions
│   └── ga-config.ts          # GA4 Measurement ID config
└── components/
    ├── UtmTracker.tsx        # UTM source initialization
    ├── TechnicianCard.tsx    # Uses handleWhatsAppClick
    ├── ContactButtons.tsx    # Uses handleWhatsAppClick
    └── WhatsAppButton.tsx    # Uses handleWhatsAppClick
```

## 🎯 Setting Up Conversion Events in GA4

To mark `whatsapp_click` as a conversion event:

1. Go to **Google Analytics 4** → **Admin** → **Events**
2. Find `whatsapp_click` event
3. Toggle **Mark as conversion**

Or create a custom conversion:
1. Go to **Admin** → **Conversions**
2. Click **New conversion event**
3. Enter: `whatsapp_click`

## 📈 Viewing Data in GA4

### Realtime Reports

1. Go to **Reports** → **Realtime**
2. View `whatsapp_click` events as they happen
3. See source breakdown in event parameters

### Custom Reports

Create a custom report to see:
- WhatsApp clicks by source
- WhatsApp clicks by technician
- WhatsApp clicks by service
- WhatsApp clicks by area

**Dimensions to use:**
- `Event name`: whatsapp_click
- `Custom parameter: source`
- `Custom parameter: technician_name`
- `Custom parameter: service`
- `Custom parameter: area`

## ✅ Testing

### Test UTM Source Detection

1. Visit: `http://localhost:3000/kw?utm_source=test`
2. Open browser console
3. Run: `sessionStorage.getItem('fannifix_utm_source')`
4. Should return: `"test"`

### Test WhatsApp Tracking

1. Click any WhatsApp button
2. Check GA4 Realtime reports
3. Verify event appears with correct parameters
4. Verify WhatsApp opens with pre-filled message

### Test Direct Traffic

1. Visit site without UTM parameters
2. Click WhatsApp button
3. Verify source is tracked as `"direct"`
4. Verify message says `"من direct"`

## 🔒 Privacy & Compliance

- No personal data is sent to GA4
- Only technician names (public data) are tracked
- UTM sources are stored in sessionStorage (client-side only)
- Complies with GDPR (no PII tracking)

## 🚀 Production Checklist

- [ ] Update `GA_MEASUREMENT_ID` in `ga-config.ts` or set environment variable
- [ ] Test UTM source detection with real campaign URLs
- [ ] Verify WhatsApp messages include correct source
- [ ] Set up conversion event in GA4
- [ ] Create custom reports for source analysis
- [ ] Test on mobile devices
- [ ] Verify RTL compatibility

## 📝 Notes

- UTM source persists in sessionStorage for the browser session
- Source resets when user closes browser
- Page views are tracked automatically by GA4
- All tracking is client-side only (no backend required)

## 📊 Dashboard Setup

For detailed instructions on creating GA4 dashboards to track WhatsApp conversions by source, see:
- **[GA4_DASHBOARD_SETUP.md](./GA4_DASHBOARD_SETUP.md)** - Complete dashboard configuration guide

## 🗄️ Future Migration: Supabase Integration

For a future-safe migration plan to add Supabase without breaking GA4 tracking, see:
- **[SUPABASE_MIGRATION_PLAN.md](./SUPABASE_MIGRATION_PLAN.md)** - Complete migration strategy

