// Data access layer - reads from JSON files
// Later: Replace JSON imports with API calls for backend migration

import kwCountry from './countries/kw.json';
import saCountry from './countries/sa.json';
import aeCountry from './countries/ae.json';
import qaCountry from './countries/qa.json';
import servicesData from './services/services.json';
import kwAreasData from './areas/kw-areas.json';
import techniciansData from './technicians/technicians.json';
import kwSeoData from './seo/kw-seo.json';

// Types matching JSON structure (future DB schema)
export interface Country {
  code: string;
  name: string;
  nameEn: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  language: string;
  enabled: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  governorate?: string; // Optional for grouping
}

export interface Technician {
  id: string;
  name: string;
  nameEn?: string;
  service_id: string;
  serviceIds?: string[]; // For backward compatibility
  areas: string[];
  areaIds?: string[]; // For backward compatibility
  countryCode?: string;
  phone?: string;
  whatsapp: string;
  description?: string;
  experienceYears?: number;
  priceEstimate?: string;
  price_range?: string;
  rating?: number;
  reviewsCount?: number;
  viewsCount?: number;
  verified?: boolean;
  featured: boolean;
  status?: 'active' | 'pending' | 'inactive';
  images?: string[];
  createdAt?: string;
}

export interface SeoData {
  default: {
    title: string;
    description: string;
    keywords?: string;
  };
  services: Record<string, {
    title: string;
    description: string;
    keywords?: string;
    service_description?: string;
  }>;
  areas: Record<string, {
    title: string;
    description: string;
    keywords?: string;
  }>;
  service_area: Record<string, {
    title: string;
    description: string;
    keywords?: string;
  }>;
  content: {
    faqs: {
      default: Array<{ question: string; answer: string }>;
      service: Array<{ question_template: string; answer_template: string }>;
      service_area: Array<{ question_template: string; answer_template: string }>;
    };
    pricing: {
      inspection: string;
      basic_maintenance: string;
      comprehensive_maintenance: string;
      installation: string;
      disclaimer: string;
    };
    hero: {
      headline: string;
      subheadline: string;
      search_placeholder: string;
    };
    cta: {
      technician: string;
      technician_description: string;
      user: string;
      user_description: string;
    };
  };
}

// Countries
const countries: Record<string, Country> = {
  kw: kwCountry as Country,
  sa: saCountry as Country,
  ae: aeCountry as Country,
  qa: qaCountry as Country,
};

export const getCountryByCode = (code: string): Country | undefined => {
  return countries[code];
};

export const getEnabledCountries = (): Country[] => {
  return Object.values(countries).filter(c => c.enabled);
};

// Services
export const services: Service[] = servicesData as Service[];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(s => s.id === id);
};

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(s => s.slug === slug);
};

// Areas (country-specific)
const areasByCountry: Record<string, Area[]> = {
  kw: kwAreasData as Area[],
};

export const getAreasByCountry = (countryCode: string): Area[] => {
  return areasByCountry[countryCode] || [];
};

// Compatibility function (for backward compatibility)
export const getKuwaitAreas = (): Area[] => {
  return getAreasByCountry('kw');
};

export const getAreaById = (id: string, countryCode: string): Area | undefined => {
  const areas = getAreasByCountry(countryCode);
  return areas.find(a => a.id === id);
};

export const getAreaBySlug = (slug: string, countryCode: string): Area | undefined => {
  const areas = getAreasByCountry(countryCode);
  return areas.find(a => a.slug === slug);
};

// Get areas by governorate
export const getAreasByGovernorate = (governorate: string, countryCode: string = 'kw'): Area[] => {
  const areas = getAreasByCountry(countryCode);
  return areas.filter(a => a.governorate === governorate);
};

// Get all governorates for a country
export const getGovernoratesByCountry = (countryCode: string = 'kw'): string[] => {
  const areas = getAreasByCountry(countryCode);
  const governorates = new Set<string>();
  areas
    .filter(a => a.governorate)
    .forEach(a => governorates.add(a.governorate!));
  return Array.from(governorates);
};

// Group areas by governorate
export const getKuwaitAreasByGovernorate = () => {
  const governorates = getGovernoratesByCountry('kw');
  return governorates.map(governorate => ({
    governorate,
    areas: getAreasByGovernorate(governorate, 'kw')
  }));
};

// Technicians - Normalize data for backward compatibility
const normalizeTechnician = (tech: any): Technician => {
  return {
    ...tech,
    serviceIds: tech.serviceIds || (tech.service_id ? [tech.service_id] : []),
    areaIds: tech.areaIds || tech.areas || [],
    countryCode: tech.countryCode || 'kw',
    priceEstimate: tech.priceEstimate || tech.price_range,
  };
};

export const technicians: Technician[] = (techniciansData as any[]).map(normalizeTechnician);

export const getTechnicianById = (id: string): Technician | undefined => {
  return technicians.find(t => t.id === id);
};

export const getTechniciansByCountry = (countryCode: string): Technician[] => {
  // Filter by country - in real DB this would be a query
  // For now, assume all technicians are in Kuwait
  return technicians;
};

export const getTechniciansByService = (serviceId: string): Technician[] => {
  return technicians.filter(t => t.service_id === serviceId);
};

export const getTechniciansByArea = (areaId: string): Technician[] => {
  return technicians.filter(t => t.areas.includes(areaId));
};

export const getFeaturedTechnicians = (): Technician[] => {
  return technicians.filter(t => t.featured);
};

export const searchTechnicians = (filters: {
  serviceId?: string;
  countryCode?: string;
  areaId?: string;
}): Technician[] => {
  let results = technicians;

  if (filters.serviceId) {
    results = results.filter(t => t.service_id === filters.serviceId);
  }
  if (filters.areaId) {
    results = results.filter(t => t.areas.includes(filters.areaId));
  }

  return results;
};

// SEO Data
const seoDataByCountry: Record<string, SeoData> = {
  kw: kwSeoData as SeoData,
};

export const getSeoData = (countryCode: string): SeoData | undefined => {
  return seoDataByCountry[countryCode];
};

export const getSeoForPage = (
  countryCode: string,
  type: 'default' | 'service' | 'area' | 'service_area',
  key?: string,
  key2?: string
): { title: string; description: string; keywords?: string } | undefined => {
  const seo = getSeoData(countryCode);
  if (!seo) return undefined;

  switch (type) {
    case 'default':
      return seo.default;
    case 'service':
      return key ? seo.services[key] : undefined;
    case 'area':
      return key ? seo.areas[key] : undefined;
    case 'service_area':
      return key && key2 ? seo.service_area[`${key}_${key2}`] : undefined;
    default:
      return seo.default;
  }
};

// Content helpers
export const getContent = (countryCode: string) => {
  const seo = getSeoData(countryCode);
  return seo?.content;
};

export const getFaqs = (
  countryCode: string,
  type: 'default' | 'service' | 'service_area' = 'default',
  serviceName?: string,
  areaName?: string
) => {
  const content = getContent(countryCode);
  if (!content) return [];

  if (type === 'default') {
    return content.faqs.default;
  }

  if (type === 'service' && serviceName) {
    return content.faqs.service.map(faq => ({
      question: faq.question_template.replace('{service}', serviceName),
      answer: faq.answer_template.replace('{service}', serviceName),
    }));
  }

  if (type === 'service_area' && serviceName && areaName) {
    return content.faqs.service_area.map(faq => ({
      question: faq.question_template
        .replace('{service}', serviceName)
        .replace('{area}', areaName),
      answer: faq.answer_template
        .replace('{service}', serviceName)
        .replace('{area}', areaName),
    }));
  }

  return [];
};

export const getPricing = (countryCode: string) => {
  const content = getContent(countryCode);
  return content?.pricing;
};

export const getHeroContent = (countryCode: string) => {
  const content = getContent(countryCode);
  return content?.hero;
};

export const getCtaContent = (countryCode: string) => {
  const content = getContent(countryCode);
  return content?.cta;
};

