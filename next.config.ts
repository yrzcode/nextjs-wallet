import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	// Skip static generation during build to avoid database connections
	output: "standalone",
	experimental: {
		// Disable static optimization for pages that use database
		forceSwcTransforms: true,
	},
};

export default nextConfig;
