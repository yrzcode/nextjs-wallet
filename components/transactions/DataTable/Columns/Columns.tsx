"use client";

import ActionCell from "./ActionCell";
import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const TableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const type = row.getValue("type") as string;

      const formatted = new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(amount);

      const prefix = type === "Deposit" ? "+" : "-";
      const colorClass = type === "Deposit" ? "text-green-600" : "text-red-600";

      return (
        <div className={`font-medium ${colorClass}`}>
          {prefix}
          {formatted}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 9999,
    minSize: 200,
    enableResizing: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return <div className="text-left font-medium">{formatDate(date)}</div>;
    },
    filterFn: "dateRange",
    size: 180,
  },
  {
    id: "actions",
    cell: ActionCell,
    size: 80,
  },
];

export default TableColumns;
