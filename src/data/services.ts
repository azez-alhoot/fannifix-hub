import { Service } from './types';
import servicesData from './services.json';

export const services: Service[] = servicesData as Service[];

export const getServiceById = (id: string) => 
  services.find(s => s.id === id);

export const getServiceBySlug = (slug: string) =>
  services.find(s => s.slug === slug);

export const getServiceByKey = (key: string) =>
  services.find(s => s.key === key);

export const getKuwaitServices = () => services;
