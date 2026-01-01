import { MetadataRoute } from 'next';
import { services, getKuwaitAreas, getTechniciansByCountry } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fannifix.com';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/kw`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/kw/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Service + Area pages
  const kuwaitAreas = getKuwaitAreas();
  const serviceAreaPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    kuwaitAreas.map((area) => ({
      url: `${baseUrl}/kw/${service.slug}/${area.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  );

  // Technician pages (only Kuwait technicians)
  const kuwaitTechnicians = getTechniciansByCountry('kw');
  const technicianPages: MetadataRoute.Sitemap = kuwaitTechnicians
    .filter((tech) => tech.status === 'active')
    .map((tech) => ({
      url: `${baseUrl}/technician/${tech.id}`,
      lastModified: tech.createdAt || currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...serviceAreaPages,
    ...technicianPages,
  ];
}

