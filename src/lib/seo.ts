// SEO utility functions for structured data (Schema.org)

export const generateLocalBusinessSchema = (technician: {
  name: string;
  description: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  areaName: string;
  serviceName: string;
  url?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: technician.name,
  description: technician.description,
  telephone: technician.phone,
  url: technician.url || 'https://fannifix.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: technician.areaName,
    addressCountry: 'KW',
    addressRegion: 'الكويت',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: technician.rating,
    reviewCount: technician.reviewsCount,
    bestRating: 5,
    worstRating: 1,
  },
  areaServed: {
    '@type': 'City',
    name: technician.areaName,
    addressCountry: 'KW',
  },
  serviceType: technician.serviceName,
  priceRange: '$$',
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'فني تصليح - FanniFix',
    url: 'https://fannifix.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'الكويت',
    addressCountry: 'KW',
  },
  url: `https://fannifix.com/kw/${service.slug}`,
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

