"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction";
import { FaArrowUp, FaArrowDown, FaWallet, FaList } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BalanceCardProps {
  totalIncome: number;
  totalExpenditure: number;
  balance: number;
  transactions: Transaction[];
  filter: string;
}

const BalanceCard = ({
  totalIncome,
  totalExpenditure,
  balance,
  transactions,
  filter,
}: BalanceCardProps) => {
  const router = useRouter();

  // Format amount as Japanese Yen
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year} / ${month} / ${day}`;
  };

  // Get filter display text
  const getFilterDisplayText = (filterType: string) => {
    switch (filterType) {
      case "income":
        return "Income";
      case "expenditure":
        return "Expenditure";
      default:
        return "All";
    }
  };

  // Handle card click navigation
  const handleCardClick = (filterType: string) => {
    if (filterType === "all") {
      router.push("/balance");
    } else {
      router.push(`/balance?filter=${filterType}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main balance info card */}
      <section aria-labelledby="balance-header">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle
              id="balance-header"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-8 bg-green-800 rounded-full"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-green-800">
                    Wallet Balance
                  </span>
                  <FaWallet
                    className="text-green-800 text-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="ml-auto px-3 py-1 text-sm font-semibold border border-gray-300 bg-white text-gray-900 rounded-md">
                Showing:{" "}
                <span className="font-bold text-gray-900">
                  {getFilterDisplayText(filter)}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Income - Clickable */}
              <button
                type="button"
                className="text-center p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 hover:shadow-md transition-all duration-200 hover:scale-105 w-full"
                onClick={() => handleCardClick("income")}
                aria-label={`Total income: ${formatAmount(
                  totalIncome
                )}. Click to view income transactions`}
                aria-describedby="income-amount"
              >
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <FaArrowUp className="text-lg" aria-hidden="true" />
                  <span className="font-semibold">Total Income</span>
                </div>
                <div
                  id="income-amount"
                  className="text-2xl font-bold text-green-700"
                  aria-live="polite"
                >
                  {formatAmount(totalIncome)}
                </div>
              </button>

              {/* Total Expenditure - Clickable */}
              <button
                type="button"
                className="text-center p-4 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 hover:shadow-md transition-all duration-200 hover:scale-105 w-full"
                onClick={() => handleCardClick("expenditure")}
                aria-label={`Total expenditure: ${formatAmount(
                  totalExpenditure
                )}. Click to view expenditure transactions`}
                aria-describedby="expenditure-amount"
              >
                <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                  <FaArrowDown className="text-lg" aria-hidden="true" />
                  <span className="font-semibold">Total Expenditure</span>
                </div>
                <div
                  id="expenditure-amount"
                  className="text-2xl font-bold text-red-700"
                  aria-live="polite"
                >
                  {formatAmount(totalExpenditure)}
                </div>
              </button>

              {/* Net Balance - Clickable */}
              <button
                type="button"
                className={`text-center p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 w-full ${
                  balance >= 0
                    ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                    : "bg-orange-50 border-orange-200 hover:bg-orange-100"
                }`}
                onClick={() => handleCardClick("all")}
                aria-label={`Current balance: ${
                  balance >= 0 ? "+" : ""
                }${formatAmount(balance)}. Click to view all transactions`}
                aria-describedby="balance-amount"
              >
                <div
                  className={`flex items-center justify-center gap-2 mb-2 ${
                    balance >= 0 ? "text-blue-600" : "text-orange-600"
                  }`}
                >
                  <FaWallet className="text-lg" aria-hidden="true" />
                  <span className="font-semibold">Current Balance</span>
                </div>
                <div
                  id="balance-amount"
                  className={`text-2xl font-bold ${
                    balance >= 0 ? "text-blue-700" : "text-orange-700"
                  }`}
                  aria-live="polite"
                >
                  {balance >= 0 ? "+" : ""}
                  {formatAmount(balance)}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Transaction overview card */}
      <section aria-labelledby="transaction-overview-header">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle
              id="transaction-overview-header"
              className="flex items-center gap-2 text-lg"
            >
              <FaList className="text-gray-600" aria-hidden="true" />
              <span>Transaction Overview</span>
              <div
                className="ml-auto px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                aria-label={`${transactions.length} total transactions`}
              >
                {transactions.length} Transactions
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                <ul
                  aria-label={`Recent transactions (showing first 5 of ${transactions.length})`}
                  className="space-y-2"
                >
                  {transactions.slice(0, 5).map((transaction) => (
                    <li
                      key={transaction.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md gap-3"
                      aria-describedby={`transaction-${transaction.id}-details`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Date */}
                        <time
                          className="text-xs text-gray-500 whitespace-nowrap"
                          dateTime={transaction.date.toISOString()}
                        >
                          {formatDate(transaction.date)}
                        </time>

                        {/* Icon */}
                        {transaction.type === "Deposit" ? (
                          <FaArrowUp
                            className="text-green-500 flex-shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <FaArrowDown
                            className="text-red-500 flex-shrink-0"
                            aria-hidden="true"
                          />
                        )}

                        {/* Transaction Info */}
                        <div
                          id={`transaction-${transaction.id}-details`}
                          className="flex items-center gap-2 min-w-0 flex-1"
                        >
                          <span className="font-medium">
                            {transaction.type === "Deposit"
                              ? "Income"
                              : "Expenditure"}
                          </span>
                          {transaction.content && (
                            <span className="text-gray-600 text-sm truncate">
                              - {transaction.content}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amount */}
                      <div
                        className={`font-semibold whitespace-nowrap ${
                          transaction.type === "Deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        aria-label={`Amount: ${
                          transaction.type === "Deposit" ? "+" : "-"
                        }${formatAmount(transaction.amount)}`}
                      >
                        {transaction.type === "Deposit" ? "+" : "-"}
                        {formatAmount(transaction.amount)}
                      </div>
                    </li>
                  ))}
                </ul>
                {transactions.length > 5 && (
                  <div
                    className="text-center text-gray-500 text-sm pt-2"
                    aria-live="polite"
                  >
                    {transactions.length - 5} more transactions...
                  </div>
                )}
              </div>
            ) : (
              <div
                className="text-center text-gray-500 text-sm py-8"
                aria-live="polite"
              >
                No transactions available
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BalanceCard;
