import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['@kgcentral/ui', '@kgcentral/types', '@kgcentral/config'],
};

export default nextConfig;
