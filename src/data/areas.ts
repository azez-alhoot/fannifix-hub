import { Area } from './types';
import areasData from './areas.json';

// Kuwait areas - Primary launch market
// Other countries are defined but NOT active for Phase 1
export const areas: Area[] = areasData as Area[];

export const getAreasByCountry = (countryCode: string) => 
  areas.filter(a => a.countryCode === countryCode);

export const getAreaById = (id: string) => 
  areas.find(a => a.id === id);

export const getAreaBySlug = (slug: string, countryCode?: string) =>
  countryCode 
    ? areas.find(a => a.slug === slug && a.countryCode === countryCode)
    : areas.find(a => a.slug === slug);

// Phase 1: Kuwait only
export const getKuwaitAreas = () => getAreasByCountry('kw');

// Get areas by governorate
export const getAreasByGovernorate = (governorate: string, countryCode: string = 'kw') =>
  areas.filter(a => a.countryCode === countryCode && a.governorate === governorate);

// Get all governorates for a country
export const getGovernoratesByCountry = (countryCode: string = 'kw'): string[] => {
  const governorates = new Set<string>();
  areas
    .filter(a => a.countryCode === countryCode && a.governorate)
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

// For future expansion
export const getActiveAreas = () => getAreasByCountry('kw'); // Only Kuwait for now
