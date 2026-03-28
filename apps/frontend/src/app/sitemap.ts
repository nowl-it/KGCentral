import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

	const routes = ['', '/wiki', '/team-builder', '/tier-list', '/altar', '/relic'].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: route === '' ? 1 : 0.8,
		})
	);

	return routes;
}
