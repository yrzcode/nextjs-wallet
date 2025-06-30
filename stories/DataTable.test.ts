import { test, expect } from "@playwright/test";

test.describe("DataTable Stories", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/transactions-datatable--default",
		);
		await page.waitForSelector("table", { timeout: 10000 });
	});

	test("should render default DataTable with sample data", async ({ page }) => {
		const table = page.locator("table");
		await expect(table).toBeVisible();

		await expect(page.locator("th")).toContainText([
			"Date",
			"Content",
			"Amount",
			"Type",
		]);

		const rows = page.locator("tbody tr");
		await expect(rows.first()).toBeVisible();
	});

	test("should handle sorting functionality", async ({ page }) => {
		const amountHeader = page.locator('th:has-text("Amount")');
		await amountHeader.click();
		await page.waitForTimeout(500);

		const sortButton = page.locator('button:has-text("Amount")');
		await expect(sortButton).toBeVisible();
	});

	test("should display pagination controls", async ({ page }) => {
		const pagination = page.locator('[role="navigation"]');
		await expect(pagination).toBeVisible();
	});

	test("should handle empty state", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/transactions-datatable--empty-state",
		);
		await page.waitForSelector("table", { timeout: 10000 });

		await expect(page.locator("text=No transactions found")).toBeVisible();
	});

	test("should handle deposits only filter", async ({ page }) => {
		await page.goto(
			"http://localhost:6006/?path=/story/transactions-datatable--deposits-only",
		);
		await page.waitForSelector("table", { timeout: 10000 });

		const typeColumns = page.locator("td:nth-child(4)");
		const count = await typeColumns.count();

		if (count > 0) {
			const text = await typeColumns.first().textContent();
			expect(text).toContain("Deposit");
		}
	});

	test("should be keyboard accessible", async ({ page }) => {
		await page.keyboard.press("Tab");
		const focusedElement = page.locator(":focus");
		await expect(focusedElement).toBeVisible();
	});
});
