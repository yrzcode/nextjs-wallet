import type { Row } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { formatDate } from "@/lib/utils";

const DateCell = ({ row }: { row: Row<Transaction> }) => {
  const date = row.getValue("date") as Date;
  return <div className="text-left font-medium">{formatDate(date)}</div>;
};

export default DateCell;
