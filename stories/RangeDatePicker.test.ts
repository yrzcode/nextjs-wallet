import { test, expect } from "@playwright/test";

test.describe("RangeDatePicker Stories", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--default",
		);
		await page.waitForSelector('input[placeholder="Select start date"]', {
			timeout: 10000,
		});
	});

	test("should render default RangeDatePicker", async ({ page }) => {
		await expect(page.locator("text=From Date")).toBeVisible();
		await expect(page.locator("text=To Date")).toBeVisible();
		await expect(page.locator('button:has-text("Clear")')).toBeVisible();
	});

	test("should handle date selection", async ({ page }) => {
		const fromDateInput = page.locator(
			'input[placeholder="Select start date"]',
		);
		await fromDateInput.click();
		await page.waitForTimeout(1000);
	});

	test("should display clear functionality", async ({ page }) => {
		const clearButton = page.locator('button:has-text("Clear")');
		await clearButton.click();

		const fromInput = page.locator('input[placeholder="Select start date"]');
		const toInput = page.locator('input[placeholder="Select end date"]');

		await expect(fromInput).toHaveValue("");
		await expect(toInput).toHaveValue("");
	});

	test("should handle preset buttons story", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		// Check for all preset buttons
		await expect(page.locator('button:has-text("Last 7 days")')).toBeVisible();
		await expect(page.locator('button:has-text("Last 30 days")')).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 3 months")'),
		).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 6 months")'),
		).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 1 year")'),
		).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 5 years")'),
		).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 10 years")'),
		).toBeVisible();
	});

	test("should handle last 7 days preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 7 days")', {
			timeout: 10000,
		});

		const last7DaysButton = page.locator('button:has-text("Last 7 days")');
		await last7DaysButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle last 3 months preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 3 months")', {
			timeout: 10000,
		});

		const last3MonthsButton = page.locator('button:has-text("Last 3 months")');
		await last3MonthsButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle last 6 months preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 6 months")', {
			timeout: 10000,
		});

		const last6MonthsButton = page.locator('button:has-text("Last 6 months")');
		await last6MonthsButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle last 1 year preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 1 year")', {
			timeout: 10000,
		});

		const last1YearButton = page.locator('button:has-text("Last 1 year")');
		await last1YearButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle last 5 years preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 5 years")', {
			timeout: 10000,
		});

		const last5YearsButton = page.locator('button:has-text("Last 5 years")');
		await last5YearsButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle last 10 years preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--interactive-demo",
		);
		await page.waitForSelector('button:has-text("Last 10 years")', {
			timeout: 10000,
		});

		const last10YearsButton = page.locator('button:has-text("Last 10 years")');
		await last10YearsButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should handle disabled state", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--disabled",
		);
		await page.waitForSelector('input[placeholder="Select start date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="Select start date"]');
		const toInput = page.locator('input[placeholder="Select end date"]');

		await expect(fromInput).toBeDisabled();
		await expect(toInput).toBeDisabled();
	});

	test("should be keyboard accessible", async ({ page }) => {
		await page.keyboard.press("Tab");
		const clearButton = page.locator('button:has-text("Clear")');
		await page.keyboard.press("Tab");
		await page.keyboard.press("Tab");
		await expect(clearButton).toBeFocused();
	});

	test("should display Last 3 Months story correctly", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--last-3-months",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should display Last 6 Months story correctly", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--last-6-months",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should display Last 1 Year story correctly", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--last-1-year",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should display Last 5 Years story correctly", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--last-5-years",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});

	test("should display Last 10 Years story correctly", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--last-10-years",
		);
		await page.waitForSelector('input[placeholder="From date"]', {
			timeout: 10000,
		});

		const fromInput = page.locator('input[placeholder="From date"]');
		const toInput = page.locator('input[placeholder="To date"]');

		await expect(fromInput).not.toHaveValue("");
		await expect(toInput).not.toHaveValue("");
	});
});
