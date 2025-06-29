import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BalanceCard from "@/components/balance/BalanceCard";
import type { Transaction } from "@/types/transaction";
import { TransactionType } from "@prisma/client";

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 50000,
    type: TransactionType.Deposit,
    content: "Salary Income",
    userId: "user1",
    date: new Date("2024-06-01"),
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "2",
    amount: 12000,
    type: TransactionType.Withdrawal,
    content: "Shopping Expense",
    userId: "user1",
    date: new Date("2024-06-02"),
    createdAt: new Date("2024-06-02"),
    updatedAt: new Date("2024-06-02"),
  },
  {
    id: "3",
    amount: 8000,
    type: TransactionType.Withdrawal,
    content: "Food & Dining",
    userId: "user1",
    date: new Date("2024-06-03"),
    createdAt: new Date("2024-06-03"),
    updatedAt: new Date("2024-06-03"),
  },
  {
    id: "4",
    amount: 25000,
    type: TransactionType.Deposit,
    content: "Part-time Income",
    userId: "user1",
    date: new Date("2024-06-04"),
    createdAt: new Date("2024-06-04"),
    updatedAt: new Date("2024-06-04"),
  },
  {
    id: "5",
    amount: 15000,
    type: TransactionType.Withdrawal,
    content: "Transportation",
    userId: "user1",
    date: new Date("2024-06-05"),
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-05"),
  },
];

const meta = {
  title: "Components/BalanceCard",
  component: BalanceCard,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    filter: {
      control: "select",
      options: ["all", "income", "expenditure"],
    },
  },
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTransactions: Story = {
  args: {
    totalIncome: 75000,
    totalExpenditure: -35000,
    balance: 40000,
    transactions: mockTransactions,
    filter: "all",
  },
};

export const IncomeFilter: Story = {
  args: {
    totalIncome: 75000,
    totalExpenditure: 0,
    balance: 75000,
    transactions: mockTransactions.filter(
      (t) => t.type === TransactionType.Deposit
    ),
    filter: "income",
  },
};

export const ExpenditureFilter: Story = {
  args: {
    totalIncome: 0,
    totalExpenditure: -35000,
    balance: -35000,
    transactions: mockTransactions.filter(
      (t) => t.type === TransactionType.Withdrawal
    ),
    filter: "expenditure",
  },
};

export const EmptyTransactions: Story = {
  args: {
    totalIncome: 0,
    totalExpenditure: 0,
    balance: 0,
    transactions: [],
    filter: "all",
  },
};

export const HighIncome: Story = {
  args: {
    totalIncome: 500000,
    totalExpenditure: -120000,
    balance: 380000,
    transactions: [
      ...mockTransactions,
      {
        id: "6",
        amount: 300000,
        type: TransactionType.Deposit,
        content: "Bonus Income",
        userId: "user1",
        date: new Date("2024-06-06"),
        createdAt: new Date("2024-06-06"),
        updatedAt: new Date("2024-06-06"),
      },
    ],
    filter: "all",
  },
};

export const NegativeBalance: Story = {
  args: {
    totalIncome: 30000,
    totalExpenditure: -80000,
    balance: -50000,
    transactions: [
      {
        id: "1",
        amount: 30000,
        type: TransactionType.Deposit,
        content: "Small Income",
        userId: "user1",
        date: new Date("2024-06-01"),
        createdAt: new Date("2024-06-01"),
        updatedAt: new Date("2024-06-01"),
      },
      {
        id: "2",
        amount: 80000,
        type: TransactionType.Withdrawal,
        content: "Large Expense",
        userId: "user1",
        date: new Date("2024-06-02"),
        createdAt: new Date("2024-06-02"),
        updatedAt: new Date("2024-06-02"),
      },
    ],
    filter: "all",
  },
};
