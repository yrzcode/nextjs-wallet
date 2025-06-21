"use client";
import TablePagination from "./TablePagination";
import TableFilter from "./TableFilter";
import TableActions from "./TableActions";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type Row,
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
import { useState } from "react";
import AmountTotal from "../AmountTotal";
import type { Transaction } from "@/types/transaction";

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

const DataTable = <TData, TValue>({
  columns,
  data,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
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
          id: "createdAt",
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
    <>
      <div className="flex justify-between items-center mb-4">
        <TableActions />
        <TableFilter table={table} />
      </div>

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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="">
        <TablePagination table={table} />
      </div>

      {/* Amount totals based on filtered data */}
      <div className="mt-4">
        <AmountTotal
          transactions={table
            .getFilteredRowModel()
            .rows.map((row) => row.original as Transaction)}
        />
      </div>
    </>
  );
};

export default DataTable;
