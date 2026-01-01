# FanniFix Performance Review & Optimization Plan

**Date:** 2024  
**Reviewer:** Senior Frontend Performance Engineer  
**Target:** Lighthouse ≥90, LCP <2.5s, CLS <0.1, INP <200ms

---

## 📊 Current State Analysis

### Bundle Analysis
- **Total Dependencies:** 60+ packages
- **Radix UI Components:** 30+ (potentially over-imported)
- **Client Components:** 28 files marked "use client"
- **Image Format:** PNG/JPG only (no WebP/AVIF)
- **Font Loading:** Google Fonts via @import (blocking)

### Critical Issues Found

---

## 🔴 HIGH PRIORITY (Critical Performance Impact)

### 1. Image Optimization Missing
**Issue:** All images use `<img>` tags instead of Next.js `<Image>` component
**Impact:** 
- No automatic WebP/AVIF conversion
- No responsive image sizes
- No lazy loading optimization
- Potential CLS (Cumulative Layout Shift)
- Large image payloads on mobile

**Files Affected:**
- `src/components/TechnicianCard.tsx` (line 49)
- `src/components/TechniciansSection.tsx` (line 50)
- `app/technician/[id]/page.tsx` (line 85)
- `src/components/Logo.tsx` (line 19)
- All other image usages

**Fix:** Replace all `<img>` with Next.js `<Image>` component
**Expected Improvement:** 
- LCP: -40% (faster image loading)
- CLS: -60% (dimensions prevent shifts)
- Bundle: -30% (smaller images)

---

### 2. Google Fonts Blocking Render
**Issue:** Font loaded via CSS `@import` in `src/index.css`
**Impact:**
- Blocks initial render
- Adds ~200-300ms to FCP
- No font-display optimization

**Fix:** Use Next.js `next/font` for optimized font loading
**Expected Improvement:**
- FCP: -200ms
- LCP: -150ms
- Better font loading strategy

---

### 3. Next.js Image Config Empty
**Issue:** `next.config.js` has empty `images.domains` array
**Impact:**
- No image optimization domains configured
- External images won't be optimized
- Missing WebP/AVIF support

**Fix:** Configure image optimization settings
**Expected Improvement:**
- Automatic format conversion
- Responsive image generation
- Better caching

---

### 4. Unnecessary Client Components
**Issue:** 28 components marked "use client" that could be server components
**Impact:**
- Larger JavaScript bundle
- Slower initial load
- More client-side JavaScript execution

**Files to Convert:**
- `src/components/Logo.tsx` (no interactivity)
- Static display components
- Components without hooks/state

**Fix:** Convert to server components where possible
**Expected Improvement:**
- Bundle size: -15-20%
- TTI: -200ms
- Better SEO

---

### 5. Large Data Files Loaded Synchronously
**Issue:** All JSON data files imported at module level
**Impact:**
- Large initial bundle
- All data loaded even if not used
- Slower page load

**Files:**
- `src/data/technicians.json`
- `src/data/areas.json`
- `src/data/services.json`
- `src/data/listings.json`

**Fix:** Use dynamic imports for data
**Expected Improvement:**
- Initial bundle: -30-40KB
- Faster TTI
- Better code splitting

---

## 🟡 MEDIUM PRIORITY (Performance Impact)

### 6. Analytics Script Optimization
**Issue:** GA script loads but could be optimized further
**Current:** Uses `afterInteractive` (good)
**Improvement:** Add `preconnect` for GA domain

**Fix:** Add resource hints
**Expected Improvement:**
- Faster GA script load
- Better third-party performance

---

### 7. No Code Splitting for Heavy Components
**Issue:** All components loaded upfront
**Impact:**
- Larger initial bundle
- Slower first paint

**Components to Split:**
- `FAQSection` (heavy accordion)
- `CoveredAreasSection` (large list)
- Form components (only on specific pages)

**Fix:** Use dynamic imports for below-fold components
**Expected Improvement:**
- Initial bundle: -20KB
- Faster FCP

---

### 8. CSS Bundle Size
**Issue:** Large CSS file with potentially unused classes
**Impact:**
- Larger CSS payload
- More parsing time

**Fix:** 
- Audit unused Tailwind classes
- Purge unused styles
- Split critical CSS

**Expected Improvement:**
- CSS size: -15-20%
- Faster render

---

### 9. Missing Image Dimensions
**Issue:** Images without width/height attributes
**Impact:**
- CLS (Cumulative Layout Shift)
- Layout thrashing

**Fix:** Add explicit dimensions to all images
**Expected Improvement:**
- CLS: <0.1 (target met)
- Better layout stability

---

### 10. No Prefetching for Critical Routes
**Issue:** No route prefetching for common navigation paths
**Impact:**
- Slower navigation
- No proactive resource loading

**Fix:** Add prefetch hints for common routes
**Expected Improvement:**
- Faster navigation
- Better perceived performance

---

## 🟢 LOW PRIORITY (Nice to Have)

### 11. Reduce Radix UI Bundle
**Issue:** Many Radix components imported but potentially not all used
**Impact:**
- Larger bundle size
- More dependencies

**Fix:** Audit and remove unused Radix components
**Expected Improvement:**
- Bundle size: -10-15KB

---

### 12. Optimize Animations
**Issue:** Some animations may be heavy on low-end devices
**Impact:**
- Janky animations on mobile
- Battery drain

**Fix:** Use `will-change` and `transform` optimizations
**Expected Improvement:**
- Smoother animations
- Better mobile performance

---

### 13. Service Worker for Caching
**Issue:** No service worker for offline/caching
**Impact:**
- No offline support
- Slower repeat visits

**Fix:** Add basic service worker (future enhancement)
**Expected Improvement:**
- Faster repeat visits
- Offline support

---

## 📈 Expected Performance Improvements

### Before Optimization
- **Lighthouse Score:** ~65-75
- **LCP:** ~3.5-4.5s
- **CLS:** ~0.15-0.25
- **INP:** ~250-350ms
- **FCP:** ~2.0-2.5s
- **TTI:** ~4.0-5.0s

### After Optimization (Target)
- **Lighthouse Score:** ≥90 ✅
- **LCP:** <2.5s ✅
- **CLS:** <0.1 ✅
- **INP:** <200ms ✅
- **FCP:** <1.5s ✅
- **TTI:** <3.0s ✅

### Mobile Network (3G/4G)
- **Initial Load:** -40% faster
- **Time to Interactive:** -35% faster
- **Perceived Performance:** Instant feel

---

## 🛠️ Implementation Priority

### Phase 1: Critical (Do First)
1. ✅ Replace `<img>` with Next.js `<Image>`
2. ✅ Optimize font loading
3. ✅ Configure Next.js image optimization
4. ✅ Add image dimensions

### Phase 2: High Impact (Do Next)
5. ✅ Convert unnecessary client components
6. ✅ Dynamic imports for data files
7. ✅ Code splitting for heavy components
8. ✅ Optimize analytics loading

### Phase 3: Polish (Do Last)
9. ✅ CSS optimization
10. ✅ Route prefetching
11. ✅ Animation optimizations

---

## 📝 Implementation Notes

- **Keep MVP simplicity:** Don't over-engineer
- **Test on real devices:** Especially low-end Android
- **Monitor Core Web Vitals:** Use real user monitoring
- **Progressive enhancement:** Ensure graceful degradation

---

## ✅ Success Criteria

- [ ] Lighthouse score ≥90
- [ ] LCP <2.5s on 3G
- [ ] CLS <0.1
- [ ] INP <200ms
- [ ] No performance regressions
- [ ] All functionality intact
- [ ] Mobile-first performance

---

**Next Steps:** Implement fixes in priority order, test, measure, iterate.

