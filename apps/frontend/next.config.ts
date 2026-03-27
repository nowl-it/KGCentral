import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['@kgcentral/ui', '@kgcentral/types', '@kgcentral/config'],
	images: {
		qualities: [75, 85, 100],
	},
};

export default nextConfig;
