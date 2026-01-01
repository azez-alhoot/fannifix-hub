import { Technician } from './types';
import techniciansData from './technicians.json';

export const technicians: Technician[] = techniciansData as Technician[];

export const getTechnicianById = (id: string) => 
  technicians.find(t => t.id === id);

export const getTechniciansByCountry = (countryCode: string) =>
  technicians.filter(t => t.countryCode === countryCode);

export const getTechniciansByService = (serviceId: string) =>
  technicians.filter(t => t.serviceIds.includes(serviceId));

export const getTechniciansByArea = (areaId: string) =>
  technicians.filter(t => t.areaIds.includes(areaId));

export const getFeaturedTechnicians = () =>
  technicians.filter(t => t.featured && t.status === 'active');

export const searchTechnicians = (filters: {
  serviceId?: string;
  countryCode?: string;
  areaId?: string;
  query?: string;
  sortBy?: 'rating' | 'reviews' | 'newest' | 'experience';
}) => {
  let results = technicians.filter(t => t.status === 'active');

  if (filters.countryCode) {
    results = results.filter(t => t.countryCode === filters.countryCode);
  }
  if (filters.serviceId) {
    results = results.filter(t => t.serviceIds.includes(filters.serviceId));
  }
  if (filters.areaId) {
    results = results.filter(t => t.areaIds.includes(filters.areaId));
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (filters.sortBy) {
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
    case 'experience':
      results.sort((a, b) => b.experienceYears - a.experienceYears);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      results.sort((a, b) => b.rating - a.rating);
  }

  return results;
};

export const getCountryStats = (countryCode: string) => {
  const countryTechnicians = technicians.filter(t => t.countryCode === countryCode);
  return {
    total: countryTechnicians.length,
    verified: countryTechnicians.filter(t => t.verified).length,
    avgRating: countryTechnicians.reduce((sum, t) => sum + t.rating, 0) / countryTechnicians.length || 0,
  };
};
