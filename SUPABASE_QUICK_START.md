# Supabase Quick Start Guide
## Fast Track to Phase 1 Implementation

This is a condensed guide for implementing Phase 1 of the Supabase migration. For complete details, see [SUPABASE_MIGRATION_PLAN.md](./SUPABASE_MIGRATION_PLAN.md).

---

## ⚡ 5-Minute Setup

### Step 1: Install Supabase

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for project to initialize (~2 minutes)

### Step 3: Run SQL Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Open `supabase/schema.sql` from this project
3. Copy and paste entire contents
4. Click **Run**

### Step 4: Get Credentials

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5: Add Environment Variables

Create/update `.env.local`:

```bash
# Existing
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-LECCE2MK38

# New - Add these
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional - Enable lead logging later
NEXT_PUBLIC_ENABLE_LEAD_LOGGING=false
```

### Step 6: Verify Setup

```bash
npm run dev
```

Visit your site - it should work exactly as before. Supabase is now ready but not active yet.

---

## ✅ What's Ready Now

- ✅ Supabase client configured (`src/lib/supabase-client.ts`)
- ✅ Database schema created
- ✅ Lead logging function ready (disabled by default)
- ✅ No breaking changes to existing code
- ✅ GA4 tracking unchanged

---

## 🚀 Next Steps

### To Enable Supabase Data (When Ready)

1. Create migration script to move JSON → Supabase
2. Update data functions to use Supabase
3. Test thoroughly
4. Deploy

### To Enable Lead Logging (When Ready)

1. Set `NEXT_PUBLIC_ENABLE_LEAD_LOGGING=true`
2. WhatsApp clicks will log to Supabase
3. GA4 remains source of truth

---

## 📋 Files Created

- `src/lib/supabase-client.ts` - Supabase client (ready to use)
- `supabase/schema.sql` - Database schema (run in Supabase)
- `SUPABASE_MIGRATION_PLAN.md` - Complete migration guide

---

## 🔒 Safety Guarantees

- ✅ **GA4 always works** - Supabase failures don't affect analytics
- ✅ **Backward compatible** - JSON data remains as fallback
- ✅ **No breaking changes** - Existing code unchanged
- ✅ **Feature flags** - Control via environment variables

---

**Status**: Ready for Phase 1
**Risk**: Low (additive changes only)

