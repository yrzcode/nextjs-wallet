import { Card, CardContent } from "../ui/card";
import type { Transaction } from "@/types/transaction";

interface AmountTotalProps {
  transactions: Transaction[];
}

const AmountTotal = ({ transactions }: AmountTotalProps) => {
  // Calculate total income (Deposit transactions)
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Deposit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate total expenditure (Withdrawal transactions)
  const totalExpenditure = transactions
    .filter((transaction) => transaction.type === "Withdrawal")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Format amounts as Japanese Yen
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <Card className="flex flex-row gap-4 p-1 justify-evenly font-bold">
      <CardContent>
        <p className="text-green-600">
          Total Income: +{formatAmount(totalIncome)}
        </p>
      </CardContent>
      <CardContent>
        <p className="text-red-600">
          Total Expenditure: -{formatAmount(totalExpenditure)}
        </p>
      </CardContent>
    </Card>
  );
};

export default AmountTotal;
