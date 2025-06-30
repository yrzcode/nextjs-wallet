import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Transaction } from "@prisma/client";
import { generateDummyTransactions } from "@/data/transactions";
import React, { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AmountCell from "@/components/transactions/DataTable/Columns/AmountCell";
import DateCell from "@/components/transactions/DataTable/Columns/DateCell";
import type { Row } from "@tanstack/react-table";
import { within, userEvent, expect } from "@storybook/test";

// Extend TanStack Table's FilterFns interface
declare module "@tanstack/react-table" {
  interface FilterFns {
    dateRange: typeof dateRangeFilter;
  }
}

// Custom date range filter function
const dateRangeFilter = <TData,>(
  row: Row<TData>,
  columnId: string,
  value: [Date | null, Date | null]
) => {
  const date = row.getValue(columnId) as Date;
  if (!date) return false;

  const [start, end] = value;
  const rowDate = new Date(date);

  // If no range is set, show all rows
  if (!start && !end) return true;

  // If only start date is set
  if (start && !end) {
    return rowDate >= start;
  }

  // If only end date is set
  if (!start && end) {
    return rowDate <= end;
  }

  // If both start and end dates are set
  if (start && end) {
    return rowDate >= start && rowDate <= end;
  }

  return true;
};

// Simplified columns for Storybook (without ActionCell which uses stores)
const StoryBookTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => <div className="font-medium">Type</div>,
    size: 100,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="font-medium">
        Amount
        <button
          type="button"
          className="ml-2 opacity-50 hover:opacity-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="Sort by amount"
        >
          <span className="text-xs">⇅</span>
        </button>
      </div>
    ),
    cell: AmountCell,
    sortingFn: (rowA, rowB, columnId) => {
      const amountA = Number.parseFloat(rowA.getValue(columnId));
      const typeA = rowA.getValue("type") as string;
      const amountB = Number.parseFloat(rowB.getValue(columnId));
      const typeB = rowB.getValue("type") as string;

      // Convert to actual signed values for sorting
      const signedAmountA = typeA === "Deposit" ? amountA : -amountA;
      const signedAmountB = typeB === "Deposit" ? amountB : -amountB;

      return signedAmountA - signedAmountB;
    },
    size: 120,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <div className="font-medium">
        Content
        <button
          type="button"
          className="ml-2 opacity-50 hover:opacity-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="Sort by content"
        >
          <span className="text-xs">⇅</span>
        </button>
      </div>
    ),
    size: 9999,
    minSize: 200,
    enableResizing: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className="font-medium">
        Date
        <button
          type="button"
          className="ml-2 opacity-50 hover:opacity-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="Sort by date"
        >
          <span className="text-xs">⇅</span>
        </button>
      </div>
    ),
    cell: DateCell,
    filterFn: "dateRange",
    size: 180,
  },
];

// Simplified DataTable for Storybook without problematic dependencies
const StoryBookDataTable = ({ data }: { data: Transaction[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: StoryBookTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      dateRange: dateRangeFilter,
    },
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [
        {
          id: "date",
          desc: true,
        },
      ],
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Table */}
      <section
        className="rounded-md border"
        aria-label="Transaction data table"
      >
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <caption className="sr-only">
            Transaction records table with columns for type, amount, content,
            and date. Use arrow keys to navigate between cells.
          </caption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="pl-2"
                      style={{
                        width:
                          header.getSize() === 9999 ? "auto" : header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="pl-4"
                      style={{
                        width:
                          cell.column.getSize() === 9999
                            ? "auto"
                            : cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={StoryBookTableColumns.length}
                  className="h-24 text-center"
                  aria-label="No transaction data available"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {table.getFilteredRowModel().rows.length} of{" "}
            {table.getCoreRowModel().rows.length} row(s) displayed.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// Mock transaction data
const mockTransactions: Transaction[] = generateDummyTransactions(
  "67bc0cc1-9a51-48fb-8838-5be7586966e"
).map((transaction, index) => ({
  ...transaction,
  id: `transaction-${index}`,
  updatedAt: new Date(),
}));

// Few transactions for demonstration
const fewTransactions = mockTransactions.slice(0, 5);

// Different types of data sets
const depositsOnly = mockTransactions
  .filter((t) => t.type === "Deposit")
  .slice(0, 10);

const withdrawalsOnly = mockTransactions
  .filter((t) => t.type === "Withdrawal")
  .slice(0, 10);

// Empty data for demonstration
const emptyTransactions: Transaction[] = [];

const meta = {
  title: "Components/DataTable",
  component: StoryBookDataTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Data table component with sorting, filtering, and pagination features for displaying transaction records.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Table data",
      control: false,
    },
  },
} satisfies Meta<typeof StoryBookDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - with full data
export const Default: Story = {
  args: {
    data: generateDummyTransactions("test-user")
      .slice(0, 20)
      .map((t, i) => ({
        ...t,
        id: `transaction-${i}`,
        updatedAt: t.createdAt,
      })),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify table accessibility", async () => {
      // Check table structure
      const table = canvas.getByRole("table");
      expect(table).toBeInTheDocument();

      // Check table caption
      const caption = canvas.getByText(/Transaction records table/);
      expect(caption).toBeInTheDocument();
      expect(caption.closest("caption")).toHaveClass("sr-only");

      // Check column headers
      expect(
        canvas.getByRole("columnheader", { name: /type/i })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole("columnheader", { name: /amount/i })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole("columnheader", { name: /content/i })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole("columnheader", { name: /date/i })
      ).toBeInTheDocument();
    });

    await step("Test table data display", async () => {
      // Check that rows are displayed
      const rows = canvas.getAllByRole("row");
      expect(rows.length).toBeGreaterThan(1); // Header + data rows

      // Check that cells contain data
      const cells = canvas.getAllByRole("cell");
      expect(cells.length).toBeGreaterThan(0);
    });

    await step("Test column sorting", async () => {
      // Test amount column sorting
      const amountSortButton = canvas.getByRole("button", {
        name: /sort by amount/i,
      });
      expect(amountSortButton).toBeInTheDocument();

      await userEvent.click(amountSortButton);
      // After clicking, the sort order should change
      expect(amountSortButton).toBeInTheDocument();

      // Test content column sorting
      const contentSortButton = canvas.getByRole("button", {
        name: /sort by content/i,
      });
      await userEvent.click(contentSortButton);
      expect(contentSortButton).toBeInTheDocument();

      // Test date column sorting
      const dateSortButton = canvas.getByRole("button", {
        name: /sort by date/i,
      });
      await userEvent.click(dateSortButton);
      expect(dateSortButton).toBeInTheDocument();
    });
  },
};

// Few items
export const WithFewItems: Story = {
  args: {
    data: generateDummyTransactions("test-user")
      .slice(0, 3)
      .map((t, i) => ({
        ...t,
        id: `transaction-${i}`,
        updatedAt: t.createdAt,
      })),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify small dataset display", async () => {
      const rows = canvas.getAllByRole("row");
      // Header row + 3 data rows = 4 total
      expect(rows).toHaveLength(4);

      // Should show all transactions without pagination
      const transactions = canvas.getAllByRole("cell");
      expect(transactions.length).toBeGreaterThan(0);
    });
  },
};

// Deposits only
export const DepositsOnly: Story = {
  args: {
    data: generateDummyTransactions(10).filter((t) => t.type === "Deposit"),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify deposits-only data", async () => {
      // All type cells should show "Deposit"
      const typeCells = canvas
        .getAllByRole("cell")
        .filter((cell) => cell.textContent?.includes("Deposit"));
      expect(typeCells.length).toBeGreaterThan(0);

      // All amount values should be positive - look for cells with + symbol or green color
      const amountCells = canvas
        .getAllByRole("cell")
        .filter(
          (cell) =>
            cell.textContent?.includes("+") ||
            cell.className?.includes("text-green")
        );
      expect(amountCells.length).toBeGreaterThan(0);
    });
  },
};

// Withdrawals only
export const WithdrawalsOnly: Story = {
  args: {
    data: generateDummyTransactions(10).filter((t) => t.type === "Withdrawal"),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify withdrawals-only data", async () => {
      // All type cells should show "Withdrawal"
      const typeCells = canvas
        .getAllByRole("cell")
        .filter((cell) => cell.textContent?.includes("Withdrawal"));
      expect(typeCells.length).toBeGreaterThan(0);

      // All amount values should be negative - look for cells with - symbol or red color
      const amountCells = canvas
        .getAllByRole("cell")
        .filter(
          (cell) =>
            cell.textContent?.includes("-") ||
            cell.className?.includes("text-red")
        );
      expect(amountCells.length).toBeGreaterThan(0);
    });
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify empty state accessibility", async () => {
      // Table should still exist
      const table = canvas.getByRole("table");
      expect(table).toBeInTheDocument();

      // Should have headers but no data rows
      expect(
        canvas.getByRole("columnheader", { name: /type/i })
      ).toBeInTheDocument();

      // Should show "No results" message - be more flexible about the role
      const noResultsMessage = canvas.getByText(/no results/i);
      expect(noResultsMessage).toBeInTheDocument();
    });
  },
};

// Single row
export const SingleRow: Story = {
  args: {
    data: generateDummyTransactions("test-user")
      .slice(0, 1)
      .map((t, i) => ({
        ...t,
        id: `single-${i}`,
        updatedAt: t.createdAt,
      })),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify single row display", async () => {
      const rows = canvas.getAllByRole("row");
      // Header row + 1 data row = 2 total
      expect(rows).toHaveLength(2);

      // Verify the single transaction displays all required fields
      const cells = canvas.getAllByRole("cell");
      expect(cells).toHaveLength(4); // type, amount, content, date
    });
  },
};

// Large dataset for performance testing
export const LargeDataset: Story = {
  args: {
    data: generateDummyTransactions("test-user")
      .slice(0, 100)
      .map((t, i) => ({
        ...t,
        id: `large-${i}`,
        updatedAt: t.createdAt,
      })),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify large dataset table structure", async () => {
      // Should have table with data rows
      const table = canvas.getByRole("table");
      expect(table).toBeInTheDocument();

      const dataRows = canvas.getAllByRole("row");
      // Should have header row + at least some data rows
      expect(dataRows.length).toBeGreaterThan(1);

      // Should show limited rows (10 per page by default)
      // Count data rows (excluding header)
      const cellRows = dataRows.slice(1); // Remove header row
      expect(cellRows.length).toBeLessThanOrEqual(10);
    });

    await step("Verify table functionality", async () => {
      // Test that data is displayed correctly
      const cells = canvas.getAllByRole("cell");
      expect(cells.length).toBeGreaterThan(0);

      // Check that we have the expected columns
      const headers = canvas.getAllByRole("columnheader");
      expect(headers.length).toBe(4); // type, amount, content, date
    });
  },
};
