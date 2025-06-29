import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/nextjs-vite",
		options: {},
	},
	staticDirs: ["../public"],
	viteFinal: async (config) => {
		// Ensure CSS is properly handled
		if (config.css) {
			config.css.postcss = "../postcss.config.mjs";
		}
		return config;
	},
};
export default config;
