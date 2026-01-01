import { Country } from './types';
import countriesData from './countries.json';

export const countries: Country[] = countriesData as Country[];

export const getCountryByCode = (code: string) => 
  countries.find(c => c.code === code);

export const getActiveCountries = () => 
  countries.filter(c => c.active);
