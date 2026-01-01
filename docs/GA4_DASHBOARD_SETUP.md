# Google Analytics 4 Dashboard Setup Guide
## FanniFix WhatsApp Conversion Tracking

This guide will help you create a comprehensive GA4 dashboard to track WhatsApp click conversions by marketing source.

---

## 🎯 Dashboard Overview

**Primary Goal**: Identify which marketing channel (Google, Instagram, TikTok, Direct) generates the most WhatsApp leads.

**Key Metrics**:
- Total WhatsApp clicks (`whatsapp_click` events)
- Users by source
- Conversion rate (Users → WhatsApp clicks)
- Time comparison (7 days vs 30 days)

---

## 📊 Method 1: Free Form Exploration (Recommended)

### Step 1: Create New Exploration

1. Go to **GA4** → **Explore** (left sidebar)
2. Click **+ Blank** or **+ Free form**
3. Name it: **"WhatsApp Leads by Source"**

### Step 2: Configure Dimensions

In the **Dimensions** panel (left side), add:

1. **Session source / medium** (Primary dimension)
   - This shows: `google / cpc`, `instagram / referral`, `direct / (none)`, etc.

2. **Event name** (Optional - for filtering)
   - Use to filter only `whatsapp_click` events

### Step 3: Configure Metrics

In the **Metrics** panel, add:

1. **Event count** (Primary metric)
   - Shows total number of `whatsapp_click` events

2. **Total users**
   - Shows unique users per source

3. **Event count per user**
   - Calculated: `Event count / Total users`
   - This is your conversion rate

### Step 4: Add Filters

In the **Filters** section:

1. Click **+ Add filter**
2. Select **Event name**
3. Choose **equals**
4. Enter: `whatsapp_click`
5. Click **Apply**

### Step 5: Configure Rows & Columns

**Rows**:
- Drag **Session source / medium** to Rows

**Columns**:
- Drag **Event count** to Columns
- Drag **Total users** to Columns
- Drag **Event count per user** to Columns

### Step 6: Set Time Range

Create two tabs or use date comparison:

**Tab 1: Last 7 Days**
- Date range: Last 7 days

**Tab 2: Last 30 Days**
- Date range: Last 30 days

**OR** use Date Comparison:
- Select: Last 30 days
- Enable **Compare to**: Previous period

### Step 7: Final Layout

Your table should show:

| Session source / medium | Event count | Total users | Event count per user |
|------------------------|-------------|-------------|---------------------|
| google / cpc           | 45          | 120         | 0.38                |
| instagram / referral   | 32          | 89          | 0.36                |
| tiktok / referral      | 28          | 95          | 0.29                |
| direct / (none)        | 15          | 200         | 0.08                |

---

## 📈 Method 2: Standard Reports (Simpler)

### Report 1: Acquisition Overview

1. Go to **Reports** → **Acquisition** → **Traffic acquisition**
2. Click **+ Add comparison**
3. Add dimension: **Session source / medium**
4. Add metric: **Conversions** (select `whatsapp_click`)
5. Set date range: **Last 30 days**

**What you'll see**:
- Traffic sources ranked by WhatsApp conversions
- Conversion rate per source

### Report 2: Events Report

1. Go to **Reports** → **Engagement** → **Events**
2. Find `whatsapp_click` event
3. Click on it
4. Add dimension: **Session source / medium**
5. View breakdown by source

---

## 🔍 Method 3: Custom Dashboard (Most Visual)

### Create Custom Report

1. Go to **Reports** → **Library** (bottom of left sidebar)
2. Click **Create report** → **Create detail report**
3. Name: **"WhatsApp Conversion by Source"**

### Configure Report

**Report Data**:
- **Dimension**: Session source / medium
- **Metrics**: 
  - Event count (for `whatsapp_click`)
  - Total users
  - Event count per user

**Filters**:
- Event name = `whatsapp_click`

**Visualization**: Table

### Add to Dashboard

1. Go to **Reports** → **Library**
2. Create new **Collection**: "Marketing Performance"
3. Add your custom report to the collection
4. Pin to your dashboard

---

## 📋 Exact GA4 Configuration Steps

### Free Form Exploration Setup

```
1. Explore → + Blank → Free form
2. Name: "WhatsApp Leads by Source"

Dimensions:
  - Session source / medium
  - Event name (for filtering)

Metrics:
  - Event count
  - Total users
  - Event count per user

Filters:
  - Event name = whatsapp_click

Rows:
  - Session source / medium

Values:
  - Event count
  - Total users
  - Event count per user

Date Range:
  - Tab 1: Last 7 days
  - Tab 2: Last 30 days
```

---

## 🎨 Recommended Dashboard Layout

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  WhatsApp Conversion Dashboard                  │
│  Date Range: Last 30 days                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Summary Cards (Top Row)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Total    │ │ Total    │ │ Avg      │        │
│  │ Users    │ │ Clicks   │ │ Conv Rate│        │
│  │ 1,234    │ │ 456      │ │ 0.37     │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                 │
│  Main Table                                     │
│  ┌──────────────────────────────────────────┐  │
│  │ Source/Medium │ Clicks │ Users │ Rate   │  │
│  ├──────────────────────────────────────────┤  │
│  │ google/cpc    │ 145    │ 320   │ 0.45   │  │
│  │ instagram/... │ 98     │ 245   │ 0.40   │  │
│  │ tiktok/...    │ 76     │ 198   │ 0.38   │  │
│  │ direct/(none) │ 137    │ 471   │ 0.29   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Time Comparison                                │
│  ┌──────────────────────────────────────────┐  │
│  │ Last 7 days vs Last 30 days             │  │
│  │ (Side-by-side comparison)                │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 📊 Key Metrics Explained

### 1. Event Count
- **What**: Total number of `whatsapp_click` events
- **Why**: Shows raw conversion volume
- **Formula**: Count of all WhatsApp button clicks

### 2. Total Users
- **What**: Unique users per source
- **Why**: Shows traffic volume per channel
- **Formula**: Distinct user count by source

### 3. Event Count per User (Conversion Rate)
- **What**: Average WhatsApp clicks per user
- **Why**: Shows channel quality (higher = better)
- **Formula**: `Event count / Total users`
- **Interpretation**: 
  - 0.5 = 50% of users clicked WhatsApp
  - 0.1 = 10% of users clicked WhatsApp

---

## 🔧 Advanced: Create Calculated Metric

### Step 1: Create Conversion Rate Metric

1. Go to **Admin** → **Custom definitions** → **Custom metrics**
2. Click **Create custom metric**
3. Configure:
   - **Metric name**: WhatsApp Conversion Rate
   - **Scope**: Event
   - **Unit of measurement**: Standard
   - **Formula**: `whatsapp_click / users`
   - **Description**: Percentage of users who clicked WhatsApp

### Step 2: Use in Reports

- Add this calculated metric to your exploration
- Shows conversion rate directly without manual calculation

---

## 📱 Quick View: Real-time Monitoring

### Real-time Report Setup

1. Go to **Reports** → **Realtime**
2. Scroll to **Event count by Event name**
3. Find `whatsapp_click`
4. Click to expand
5. View **Event count by Session source / medium**

**Use case**: Monitor which sources are generating clicks right now

---

## 🎯 Interpreting Results

### What Good Performance Looks Like

**High Volume + High Conversion Rate** = Best Channel
- Example: `google / cpc`: 200 clicks, 0.45 rate
- **Action**: Increase budget here

**High Volume + Low Conversion Rate** = Needs Optimization
- Example: `direct / (none)`: 300 clicks, 0.15 rate
- **Action**: Improve landing page or targeting

**Low Volume + High Conversion Rate** = Scale Opportunity
- Example: `instagram / referral`: 50 clicks, 0.60 rate
- **Action**: Increase traffic to this channel

**Low Volume + Low Conversion Rate** = Poor Channel
- Example: `tiktok / referral`: 20 clicks, 0.10 rate
- **Action**: Pause or optimize

---

## 📈 Recommended Actions Based on Data

### If Google Performs Best:
- Increase Google Ads budget
- Create more ad variations
- Optimize landing pages for Google traffic

### If Instagram Performs Best:
- Increase Instagram ad spend
- Create more Instagram content
- Use Instagram Stories/Reels

### If TikTok Performs Best:
- Scale TikTok advertising
- Create viral content
- Partner with TikTok influencers

### If Direct Performs Best:
- Focus on brand awareness
- Improve SEO
- Build email marketing

---

## 🔄 Setting Up Automated Reports

### Email Reports

1. In your exploration, click **Share** (top right)
2. Select **Email**
3. Configure:
   - **Recipients**: Your email
   - **Frequency**: Weekly
   - **Format**: PDF or CSV
   - **Subject**: "FanniFix WhatsApp Leads Report"

### Scheduled Exports

1. Go to **Admin** → **Data export**
2. Set up BigQuery export (if needed)
3. Or use **Explore** → **Export** → Schedule

---

## ✅ Checklist

- [ ] Created Free Form exploration
- [ ] Added `whatsapp_click` filter
- [ ] Configured Session source / medium dimension
- [ ] Added Event count, Total users, Conversion rate metrics
- [ ] Set up 7-day and 30-day comparisons
- [ ] Created custom report (optional)
- [ ] Set up email reports (optional)
- [ ] Bookmarked dashboard for quick access

---

## 🚀 Quick Start (5 Minutes)

**Fastest way to see results**:

1. **GA4** → **Explore** → **+ Blank** → **Free form**
2. **Dimensions**: Drag `Session source / medium`
3. **Metrics**: Drag `Event count`
4. **Filters**: `Event name` = `whatsapp_click`
5. **Rows**: `Session source / medium`
6. **Values**: `Event count`
7. **Date**: Last 30 days
8. **Done!** You'll see WhatsApp clicks by source

---

## 📞 Support

If you need help:
1. Check GA4 Help Center
2. Review the `ANALYTICS_SETUP.md` file
3. Verify events are firing in Realtime reports
4. Check browser console for `gtag` errors

---

## 🎓 Pro Tips

1. **Bookmark your exploration** for quick access
2. **Compare periods** to see trends
3. **Export data** weekly for record keeping
4. **Set up alerts** for significant changes
5. **Review daily** during campaigns, weekly otherwise

---

**Last Updated**: January 2025
**GA4 Property**: FanniFix
**Primary Conversion**: `whatsapp_click`

