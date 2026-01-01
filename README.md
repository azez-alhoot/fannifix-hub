# FanniFix - Technician Marketplace Platform

A data-driven marketplace platform connecting customers with trusted technicians in Kuwait and the GCC region. Built with Next.js, TypeScript, and a modern tech stack.

## 🌟 Features

- **Multi-Country Support**: Designed for Kuwait (active) with ready support for Saudi Arabia, UAE, and Qatar
- **Data-Driven Architecture**: All content managed through JSON files for easy maintenance
- **SEO Optimized**: Comprehensive SEO implementation for local search visibility
- **Direct Contact**: Customers connect directly with technicians via WhatsApp
- **Service Categories**: AC repair, electrical, plumbing, appliances, and more
- **Area-Based Search**: Find technicians by service type and location
- **Mobile-First**: Responsive design optimized for all devices

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4
- **State Management**: React Query (TanStack Query)

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── kw/                 # Kuwait-specific pages
│   ├── technician/         # Technician profile pages
│   └── ...
├── src/
│   ├── components/         # React components
│   ├── data/               # JSON data files
│   │   ├── countries/      # Country configurations
│   │   ├── services/       # Service definitions
│   │   ├── areas/          # Area/region data
│   │   ├── technicians/    # Technician data
│   │   └── seo/            # SEO metadata
│   └── lib/                # Utility functions
└── public/                 # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github-old:azez-alhoot/fannifix-hub.git

# Navigate to project directory
cd fannifix-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Data Architecture

The project uses a **data-driven architecture** where all content is stored in JSON files:

- **Countries**: `/src/data/countries/` - Country configurations
- **Services**: `/src/data/services/services.json` - Service types
- **Areas**: `/src/data/areas/kw-areas.json` - Geographic areas
- **Technicians**: `/src/data/technicians/technicians.json` - Technician profiles
- **SEO**: `/src/data/seo/kw-seo.json` - SEO metadata and content

This structure makes it:
- ✅ Easy to maintain (no code changes for content updates)
- ✅ Ready for backend migration (JSON structure matches DB schema)
- ✅ SEO-scalable (add new countries by adding JSON files)

See [DATA_DRIVEN_ARCHITECTURE.md](./DATA_DRIVEN_ARCHITECTURE.md) for detailed documentation.

## 🌍 Adding a New Country

1. Create `/src/data/countries/{code}.json`
2. Create `/src/data/areas/{code}-areas.json`
3. Create `/src/data/seo/{code}-seo.json`
4. Update `/src/data/index.ts` to load new files
5. Enable country in JSON (`enabled: true`)

No component changes needed!

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 Migration to Backend

The project is designed for easy migration to a backend (Supabase, PostgreSQL, etc.):

1. JSON structure matches future database schema
2. Data access layer (`/src/data/index.ts`) can be replaced with API calls
3. Components don't need changes - they already use the data layer

See [DATA_DRIVEN_ARCHITECTURE.md](./DATA_DRIVEN_ARCHITECTURE.md) for migration guide.

## 📚 Documentation

- [DATA_DRIVEN_ARCHITECTURE.md](./DATA_DRIVEN_ARCHITECTURE.md) - Architecture and data structure
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Refactoring summary
- [SEO_IMPLEMENTATION_SUMMARY.md](./SEO_IMPLEMENTATION_SUMMARY.md) - SEO implementation details
- [GA4_EVENT_STRATEGY.md](./GA4_EVENT_STRATEGY.md) - Analytics strategy

## 🎯 Key Pages

- `/kw` - Kuwait landing page
- `/kw/{service}` - Service-specific pages
- `/kw/{service}/{area}` - Service + area combination pages
- `/technician/{id}` - Technician profile pages
- `/kw/add-listing` - Contact page for new technicians

## 📄 License

Private project - All rights reserved

## 👥 Contributing

This is a private project. For questions or support, contact the project maintainer.

---

Built with ❤️ for connecting customers with trusted technicians in the GCC region.
