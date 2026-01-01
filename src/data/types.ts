// Core TypeScript interfaces for FanniFix platform

export interface Country {
  id: string;
  code: 'kw' | 'sa' | 'ae' | 'qa';
  name: string;
  nameEn: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  active: boolean;
}

export interface Area {
  id: string;
  countryCode: string;
  governorate?: string; // Optional for backward compatibility
  name: string;
  nameEn: string;
  slug: string;
}

export interface Service {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  slug: string;
  color: string;
}

export interface Technician {
  id: string;
  name: string;
  nameEn: string;
  countryCode: string;
  areaIds: string[];
  serviceIds: string[];
  phone: string;
  whatsapp: string;
  description: string;
  experienceYears: number;
  priceEstimate: string;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  verified: boolean;
  featured: boolean;
  status: 'active' | 'pending' | 'inactive';
  images: string[];
  createdAt: string;
}

export interface Listing {
  id: string;
  title: string;
  technicianId: string;
  serviceId: string;
  areaId: string;
  countryCode: string;
  description: string;
  price: string;
  viewsCount: number;
  createdAt: string;
  status: 'active' | 'expired' | 'pending';
}

export interface SearchFilters {
  serviceId?: string;
  countryCode?: string;
  areaId?: string;
  query?: string;
  sortBy?: 'rating' | 'reviews' | 'newest' | 'experience';
}
