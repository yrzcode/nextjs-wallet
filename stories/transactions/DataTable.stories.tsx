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
import ColumnHeader from "@/components/transactions/DataTable/Columns/ColumnHeader";
import AmountCell from "@/components/transactions/DataTable/Columns/AmountCell";
import DateCell from "@/components/transactions/DataTable/Columns/DateCell";
import type { Row } from "@tanstack/react-table";

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
    header: ({ column }) => <ColumnHeader title="Type" column={column} />,
    size: 100,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <ColumnHeader title="Amount" column={column} sortable />
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
      <ColumnHeader title="Content" column={column} sortable />
    ),
    size: 9999,
    minSize: 200,
    enableResizing: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <ColumnHeader title="Date" column={column} sortable />
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
      <div className="rounded-md border">
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
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
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
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
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
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
    data: mockTransactions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default data table displaying complete transaction record data.",
      },
    },
  },
};

// Few items
export const WithFewItems: Story = {
  args: {
    data: fewTransactions,
  },
  parameters: {
    docs: {
      description: {
        story: "Data table displaying a small number of transaction records.",
      },
    },
  },
};

// Deposits only
export const DepositsOnly: Story = {
  args: {
    data: depositsOnly,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays only deposit type transaction records.",
      },
    },
  },
};

// Withdrawals only
export const WithdrawalsOnly: Story = {
  args: {
    data: withdrawalsOnly,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays only withdrawal type transaction records.",
      },
    },
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: emptyTransactions,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state display when there is no data.",
      },
    },
  },
};

// Single row
export const SingleRow: Story = {
  args: {
    data: [mockTransactions[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "Table displaying only a single row of data.",
      },
    },
  },
};

// Large dataset for performance testing
export const LargeDataset: Story = {
  args: {
    data: mockTransactions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with large amount of data for testing pagination and performance.",
      },
    },
  },
};
