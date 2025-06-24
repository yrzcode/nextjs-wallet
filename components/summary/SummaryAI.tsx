"use client";

import ReactMarkdown from "react-markdown";
import type { Transaction } from "@/types/transaction";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TimePeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "10Y";

const SummaryAI = ({
  transactions,
  selectedPeriod,
}: {
  transactions: Transaction[];
  selectedPeriod: TimePeriod;
}) => {
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  useEffect(() => {
    const getFilteredTransactions = (period: TimePeriod) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const cutoffDate = new Date(today);

      switch (period) {
        case "1M":
          cutoffDate.setMonth(today.getMonth() - 1);
          break;
        case "3M":
          cutoffDate.setMonth(today.getMonth() - 3);
          break;
        case "6M":
          cutoffDate.setMonth(today.getMonth() - 6);
          break;
        case "1Y":
          cutoffDate.setFullYear(today.getFullYear() - 1);
          break;
        case "3Y":
          cutoffDate.setFullYear(today.getFullYear() - 3);
          break;
        case "5Y":
          cutoffDate.setFullYear(today.getFullYear() - 5);
          break;
        case "10Y":
          cutoffDate.setFullYear(today.getFullYear() - 10);
          break;
        default:
          cutoffDate.setMonth(today.getMonth() - 1);
      }

      console.debug(
        "Filter period:",
        period,
        "Cutoff date:",
        cutoffDate.toISOString()
      );
      console.debug("Total transactions:", transactions.length);

      const filtered = transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        transactionDate.setHours(0, 0, 0, 0);
        return transactionDate >= cutoffDate;
      });

      console.debug("Filtered transactions:", filtered.length);

      return filtered;
    };

    const filteredTransactions = getFilteredTransactions(selectedPeriod);

    const prompt = `
    You are a financial assistant analyzing transactions for the past ${selectedPeriod}.
    Here are the filtered transactions for this period:
    ${filteredTransactions
      .map(
        (transaction) =>
          `${transaction.date} - ${transaction.type}: ${transaction.content} - $${transaction.amount}`
      )
      .join("\n")}
    Please provide a concise financial analysis for this ${selectedPeriod} period focusing on:
    - Spending patterns and trends
    - Major expense categories
    - Financial habits and behaviors
    - Key insights and observations
    
    DO NOT include specific amounts for total income, total expenses, or net balance.
    Focus on qualitative analysis rather than quantitative summaries.
    Use **bold** for important categories or insights.
    Keep it under 100 words.
    `;

    const fetchSummary = async () => {
      try {
        setIsSummaryLoading(true);
        const res = await fetch("api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        setSummary(data.result.content);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Unable to generate summary at this time.");
      } finally {
        setIsSummaryLoading(false);
      }
    };

    if (filteredTransactions.length > 0) {
      fetchSummary();
    } else {
      setSummary(`No transactions found for the past ${selectedPeriod}.`);
    }
  }, [transactions, selectedPeriod]);

  return (
    <Card>
      <CardContent>
        {isSummaryLoading ? (
          <div className="flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <p>Loading Summary...</p>
          </div>
        ) : (
          <ReactMarkdown>{summary}</ReactMarkdown>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryAI;
