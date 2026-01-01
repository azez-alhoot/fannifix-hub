# GA4 Event Tracking - Quick Reference

**Full Strategy:** See `GA4_EVENT_STRATEGY.md`

---

## 🎯 MVP Events (Track Now)

### `page_view`
- ✅ Automatic (GA4)
- Conversion: No
- Question: Which pages drive traffic?

### `whatsapp_click`
- ✅ Implemented
- Conversion: **YES** (Primary)
- Question: How many leads? Which sources convert?
- Parameters: `source`, `technician_id`, `technician_name`, `service_name`, `area_name`, `country_code`, `page_path`, `value`

### `phone_call`
- ⏳ To be implemented
- Conversion: **YES** (Secondary)
- Question: How many phone calls? WhatsApp vs Phone preference?
- Parameters: `source`, `technician_id`, `technician_name`, `service_name`, `area_name`, `country_code`, `page_path`, `value`

---

## 📈 Growth Events (Add Next)

### `technician_view`
- When: User views technician detail page
- Conversion: No
- Parameters: `technician_id`, `technician_name`, `service_id`, `area_id`, `is_featured`, `is_verified`

### `area_filter_click`
- When: User selects/clicks area filter
- Conversion: No
- Parameters: `area_id`, `area_name`, `filter_type`

### `service_filter_click`
- When: User selects/clicks service filter
- Conversion: No
- Parameters: `service_id`, `service_name`, `filter_type`

### `featured_technician_click`
- When: User clicks featured technician card
- Conversion: No
- Parameters: `technician_id`, `click_location`, `position`

---

## 🔮 Future Events (Phase 3+)

- `lead_submitted` - Form submissions
- `technician_signup` - New technician registrations
- `subscription_purchase` - Revenue events

---

## 📋 Naming Rules

### Events
- Format: `{object}_{action}` (snake_case)
- Examples: `whatsapp_click`, `technician_view`
- ❌ Never: `whatsappClick`, `whatsapp_click_v2`, `wa_click`

### Parameters
- Format: `{object}_{property}` (snake_case)
- Examples: `technician_id`, `service_name`, `country_code`
- ✅ Always include: `source`, `country_code`, `page_path`

---

## ❌ Don't Track

- Scroll depth
- Time on page (GA4 does this)
- Every button click
- Hover events
- Form field interactions
- Video plays (unless core to conversion)

**Rule:** If you can't answer "What business decision will this inform?" → Don't track it.

---

## 🛡️ History Protection

1. ✅ **Never rename events** - Once deployed, permanent
2. ✅ **Never remove parameters** - Can deprecate, not remove
3. ✅ **Use consistent names** - Same concept = same parameter name
4. ✅ **Version via parameters** - Not via event names
5. ✅ **Document everything** - Before deployment
6. ✅ **Use TypeScript types** - Enforce structure

---

## 🔧 Implementation

```typescript
import { trackWhatsAppClick } from '@/lib/analytics';

trackWhatsAppClick({
  technicianId: 'tech-123',
  technicianName: 'Ahmed Alenezi',
  service: 'AC Repair',
  serviceId: 'svc-456',
  area: 'Hawalli',
  areaId: 'area-789',
  countryCode: 'kw',
});
```

**Types:** See `src/lib/analytics-types.ts`

---

## 📊 Key Metrics

1. **Conversion Rate:** `whatsapp_click` / `page_view`
2. **View-to-Click:** `whatsapp_click` / `technician_view`
3. **Source Performance:** `whatsapp_click` by `source`
4. **Service Performance:** `whatsapp_click` by `service_name`
5. **Area Performance:** `whatsapp_click` by `area_name`

---

**Remember:** MVP first, no noise, future-proof naming.

