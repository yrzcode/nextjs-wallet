"use client";

import ColumnHeader from "./ColumnHeader";
import ActionCell from "./ActionCell";
import AmountCell from "./AmountCell";
import DateCell from "./DateCell";
import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";

const TableColumns: ColumnDef<Transaction>[] = [
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
    accessorKey: "description",
    header: ({ column }) => (
      <ColumnHeader title="Description" column={column} sortable />
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
  {
    id: "actions",
    header: ({ column }) => <ColumnHeader title="Action" column={column} />,
    cell: ActionCell,
    size: 80,
  },
];

export default TableColumns;
