import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects(true);
  const baseUrl = 'https://your-domain.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const projectRoutes = projects
    .filter((p) => p.caseStudy)
    .map((project) => ({
      url: `${baseUrl}/case-studies/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}