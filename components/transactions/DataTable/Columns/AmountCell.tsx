import type { Row } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";

const AmountCell = ({ row }: { row: Row<Transaction> }) => {
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
};

export default AmountCell;
