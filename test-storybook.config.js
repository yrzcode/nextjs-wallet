module.exports = {
	storybookUrl: "http://localhost:6006",

	// Browser configuration
	browsers: ["chromium"],

	// Test timeout
	testTimeout: 15000,

	// Number of concurrent workers
	maxWorkers: process.env.CI ? 2 : undefined,

	// Story files to test
	include: ["**/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

	// Excluded story files
	exclude: ["**/stories/**/Introduction.stories.mdx"],

	// A11y configuration
	a11y: {
		test: "error", // Treat a11y violations as errors and show detailed information
	},
};
