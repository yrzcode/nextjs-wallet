import React from "react";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";

const TableFilter = <TData,>({
  table,
  data,
}: {
  table: Table<TData>;
  data: TData[];
}) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter emails..."
        value={
          (table.getColumn("description")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("description")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};

export default TableFilter;
