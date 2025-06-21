"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { deleteTransaction } from "@/actions/transactions";

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
          Time of Transaction
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
    cell: ({ row }) => {
      const transactionId = row.original.id;
      const handleDeleteTransaction = () => {
        deleteTransaction(transactionId);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FaEdit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteTransaction}>
              <FaTrash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 80,
  },
];

export default TableColumns;
