import { Listing } from './types';
import listingsData from './listings.json';

export const listings: Listing[] = listingsData as Listing[];

export const getListingById = (id: string) =>
  listings.find(l => l.id === id);

export const getListingsByCountry = (countryCode: string) =>
  listings.filter(l => l.countryCode === countryCode && l.status === 'active');

export const getLatestListings = (limit = 6) =>
  [...listings]
    .filter(l => l.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

export const getListingsByTechnician = (technicianId: string) =>
  listings.filter(l => l.technicianId === technicianId);
