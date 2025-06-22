import type { Column } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const ColumnHeader = ({
  title,
  column,
  sortable,
}: {
  title?: string;
  sortable?: boolean;
  column: Column<Transaction>;
}) => {
  return (
    <>
      {(sortable && (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {title}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )) || <>{title}</>}
    </>
  );
};

export default ColumnHeader;
