"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  // Get badge color classes based on filter type
  const getBadgeColorClasses = (filterType: string) => {
    switch (filterType) {
      case "income":
        return "text-green-700";
      case "expenditure":
        return "text-red-700";
      default:
        return "text-blue-700";
    }
  };

  // Get filter text color
  const getFilterTextColor = (filterType: string) => {
    switch (filterType) {
      case "income":
        return "text-green-800";
      case "expenditure":
        return "text-red-800";
      default:
        return "text-blue-800";
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
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-green-800 rounded-full" />
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-green-800">
                  Wallet Balance
                </span>
                <FaWallet className="text-green-800 text-3xl" />
              </div>
            </div>
            <Badge
              variant="outline"
              className={`ml-auto px-3 py-1 text-sm font-semibold border-0 ${getBadgeColorClasses(
                filter
              )}`}
            >
              Showing:{" "}
              <span className={`font-bold ${getFilterTextColor(filter)}`}>
                {getFilterDisplayText(filter)}
              </span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Income - Clickable */}
            <button
              type="button"
              className="text-center p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 hover:shadow-md transition-all duration-200 hover:scale-105 w-full"
              onClick={() => handleCardClick("income")}
              aria-label="Click to view income transactions"
            >
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <FaArrowUp className="text-lg" />
                <span className="font-semibold">Total Income</span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {formatAmount(totalIncome)}
              </div>
            </button>

            {/* Total Expenditure - Clickable */}
            <button
              type="button"
              className="text-center p-4 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 hover:shadow-md transition-all duration-200 hover:scale-105 w-full"
              onClick={() => handleCardClick("expenditure")}
              aria-label="Click to view expenditure transactions"
            >
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <FaArrowDown className="text-lg" />
                <span className="font-semibold">Total Expenditure</span>
              </div>
              <div className="text-2xl font-bold text-red-700">
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
              aria-label="Click to view all transactions"
            >
              <div
                className={`flex items-center justify-center gap-2 mb-2 ${
                  balance >= 0 ? "text-blue-600" : "text-orange-600"
                }`}
              >
                <FaWallet className="text-lg" />
                <span className="font-semibold">Net Balance</span>
              </div>
              <div
                className={`text-2xl font-bold ${
                  balance >= 0 ? "text-blue-700" : "text-orange-700"
                }`}
              >
                {balance >= 0 ? "+" : ""}
                {formatAmount(balance)}
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction overview card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FaList className="text-gray-600" />
            Transaction Overview
            <Badge variant="secondary" className="ml-auto">
              {transactions.length} Transactions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Date */}
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </span>

                    {/* Icon */}
                    {transaction.type === "Deposit" ? (
                      <FaArrowUp className="text-green-500 flex-shrink-0" />
                    ) : (
                      <FaArrowDown className="text-red-500 flex-shrink-0" />
                    )}

                    {/* Transaction Info */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
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
                  >
                    {transaction.type === "Deposit" ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </div>
                </div>
              ))}
              {transactions.length > 5 && (
                <div className="text-center text-gray-500 text-sm pt-2">
                  {transactions.length - 5} more transactions...
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
