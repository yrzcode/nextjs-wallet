"use client";

import type { Transaction } from "@/types/transaction";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type TimePeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "10Y";

interface ChartData {
  date: string;
  value: number;
}

interface SummaryData {
  current: number;
  change: number;
  changePercent: number;
  chartData: ChartData[];
}

interface SummaryClientProps {
  transactions: Transaction[];
}

const SummaryClient = ({ transactions }: SummaryClientProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1M");

  const timePeriods: { label: string; value: TimePeriod; days: number }[] = [
    { label: "1M", value: "1M", days: 30 },
    { label: "3M", value: "3M", days: 90 },
    { label: "6M", value: "6M", days: 180 },
    { label: "1Y", value: "1Y", days: 365 },
    { label: "3Y", value: "3Y", days: 1095 },
    { label: "5Y", value: "5Y", days: 1825 },
    { label: "10Y", value: "10Y", days: 3650 },
  ];

  const getFilteredTransactions = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return transactions.filter((t) => new Date(t.date) >= cutoffDate);
  };

  const generateChartData = (
    filteredTransactions: Transaction[],
    type: "income" | "expense" | "balance"
  ) => {
    const selectedPeriodData = timePeriods.find(
      (p) => p.value === selectedPeriod
    );
    const days = selectedPeriodData?.days || 30;

    // Create data points for the chart
    const dataPoints = [];
    const pointCount = Math.min(10, days); // Maximum 10 points for readability
    const interval = Math.floor(days / pointCount);

    for (let i = 0; i < pointCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i * interval));

      const relevantTransactions = filteredTransactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate <= date;
      });

      let value = 0;
      if (type === "income") {
        value = relevantTransactions
          .filter((t) => t.type === "Deposit")
          .reduce((sum, t) => sum + t.amount, 0);
      } else if (type === "expense") {
        value = relevantTransactions
          .filter((t) => t.type === "Withdrawal")
          .reduce((sum, t) => sum + t.amount, 0);
      } else {
        const income = relevantTransactions
          .filter((t) => t.type === "Deposit")
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = relevantTransactions
          .filter((t) => t.type === "Withdrawal")
          .reduce((sum, t) => sum + t.amount, 0);
        value = income - expense;
      }

      dataPoints.push({
        date: date.toLocaleDateString(),
        value: value,
      });
    }

    return dataPoints;
  };

  const calculateSummaryData = (
    type: "income" | "expense" | "balance"
  ): SummaryData => {
    const selectedPeriodData = timePeriods.find(
      (p) => p.value === selectedPeriod
    );
    const days = selectedPeriodData?.days || 30;

    const currentPeriodTransactions = getFilteredTransactions(days);
    const previousPeriodTransactions = getFilteredTransactions(days * 2).filter(
      (t) => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return new Date(t.date) < cutoffDate;
      }
    );

    let current = 0;
    let previous = 0;

    if (type === "income") {
      current = currentPeriodTransactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + t.amount, 0);
      previous = previousPeriodTransactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + t.amount, 0);
    } else if (type === "expense") {
      current = currentPeriodTransactions
        .filter((t) => t.type === "Withdrawal")
        .reduce((sum, t) => sum + t.amount, 0);
      previous = previousPeriodTransactions
        .filter((t) => t.type === "Withdrawal")
        .reduce((sum, t) => sum + t.amount, 0);
    } else {
      const currentIncome = currentPeriodTransactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + t.amount, 0);
      const currentExpense = currentPeriodTransactions
        .filter((t) => t.type === "Withdrawal")
        .reduce((sum, t) => sum + t.amount, 0);
      current = currentIncome - currentExpense;

      const previousIncome = previousPeriodTransactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + t.amount, 0);
      const previousExpense = previousPeriodTransactions
        .filter((t) => t.type === "Withdrawal")
        .reduce((sum, t) => sum + t.amount, 0);
      previous = previousIncome - previousExpense;
    }

    const change = current - previous;
    const changePercent =
      previous !== 0 ? (change / Math.abs(previous)) * 100 : 0;

    const chartData = generateChartData(currentPeriodTransactions, type);

    return {
      current,
      change,
      changePercent,
      chartData,
    };
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    const sign = percent > 0 ? "+" : "";
    return `${sign}${percent.toFixed(1)}%`;
  };

  const incomeData = calculateSummaryData("income");
  const expenseData = calculateSummaryData("expense");
  const balanceData = calculateSummaryData("balance");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-green-800 rounded-full" />
          <h1 className="text-4xl font-bold text-green-800">
            Financial Summary
          </h1>
        </div>

        {/* Time Period Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {timePeriods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
              className={
                selectedPeriod === period.value
                  ? "bg-white shadow-sm text-black font-bold"
                  : ""
              }
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Income Card */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="h-5 w-5" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-800">
                  {formatAmount(incomeData.current)}
                </div>
                <div
                  className={`text-sm ${
                    incomeData.changePercent >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatPercent(incomeData.changePercent)} from last period
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Card */}
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <TrendingDown className="h-5 w-5" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-red-800">
                  {formatAmount(expenseData.current)}
                </div>
                <div
                  className={`text-sm ${
                    expenseData.changePercent >= 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {formatPercent(expenseData.changePercent)} from last period
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expenseData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Worth Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Wallet className="h-5 w-5" />
              Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-blue-800">
                  {formatAmount(balanceData.current)}
                </div>
                <div
                  className={`text-sm ${
                    balanceData.changePercent >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatPercent(balanceData.changePercent)} from last period
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={balanceData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryClient;
