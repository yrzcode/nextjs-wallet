const { injectAxe, checkA11y } = require("axe-playwright");

module.exports = {
	testTimeout: 60000,
	workers: process.env.CI ? 2 : undefined,

  async preRender(page, context) {
    await injectAxe(page);
  },
  
  async postRender(page, context) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  },

	async preVisit(page) {
		await injectAxe(page);
	},

	async postVisit(page) {
		const elementHandler = await page.$("#storybook-root");
		const innerHTML = await elementHandler?.innerHTML();

		if (innerHTML && innerHTML.trim()) {
			await checkA11y(page, "#storybook-root", {
				detailedReport: true,
				detailedReportOptions: { html: true },
				axeOptions: {
					rules: {
						"color-contrast": { enabled: false },
					},
				},
			});
		}
	},

	stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

	browsers: [
		{
			name: "chromium",
			use: {
				viewport: { width: 1280, height: 720 },
			},
		},
	],
};
