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
			"http://localhost:6006/?path=/story/ui-rangedatepicker--with-preset-buttons",
		);
		await page.waitForSelector('input[placeholder="Select start date"]', {
			timeout: 10000,
		});

		await expect(page.locator('button:has-text("Last 7 Days")')).toBeVisible();
		await expect(page.locator('button:has-text("Last 30 Days")')).toBeVisible();
		await expect(
			page.locator('button:has-text("Last 3 Months")'),
		).toBeVisible();
	});

	test("should handle last 7 days preset", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/ui-rangedatepicker--with-preset-buttons",
		);
		await page.waitForSelector('button:has-text("Last 7 Days")', {
			timeout: 10000,
		});

		const last7DaysButton = page.locator('button:has-text("Last 7 Days")');
		await last7DaysButton.click();
		await page.waitForTimeout(500);

		const fromInput = page.locator('input[placeholder="Select start date"]');
		const toInput = page.locator('input[placeholder="Select end date"]');

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
});
