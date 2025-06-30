import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, expect } from "@storybook/test";

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify balance card structure and accessibility", async () => {
      // Check main balance display
      const balanceSection = canvas.getByLabelText(/current balance/i);
      expect(balanceSection).toBeInTheDocument();

      // Check income section
      const incomeSection = canvas.getByLabelText(/total income/i);
      expect(incomeSection).toBeInTheDocument();

      // Check expenditure section
      const expenditureSection = canvas.getByLabelText(/total expenditure/i);
      expect(expenditureSection).toBeInTheDocument();

      // Verify amounts are displayed correctly using more flexible matching
      expect(canvas.getByText(/40,000/)).toBeInTheDocument(); // Balance
      expect(canvas.getByText(/75,000/)).toBeInTheDocument(); // Income
      expect(canvas.getByText(/35,000/)).toBeInTheDocument(); // Expenditure
    });

    await step("Verify transaction list accessibility", async () => {
      // Check transaction list has proper labeling
      const transactionList = canvas.getByRole("list", {
        name: /transactions/i,
      });
      expect(transactionList).toBeInTheDocument();

      // Check individual transaction items
      const transactionItems = canvas.getAllByRole("listitem");
      expect(transactionItems).toHaveLength(mockTransactions.length);

      // Ensure each transaction has accessible content
      for (const item of transactionItems) {
        expect(item).toHaveAttribute("aria-describedby");
      }
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify income-only display", async () => {
      // Balance should equal total income - use specific section
      const incomeSection = canvas.getByLabelText(/total income/i);
      expect(incomeSection).toHaveTextContent(/75,000/);

      // Expenditure should be zero - find by specific section
      const expenditureSection = canvas.getByLabelText(/total expenditure/i);
      expect(expenditureSection).toHaveTextContent(/0/);

      // All transactions should be deposits
      const transactionItems = canvas.getAllByRole("listitem");
      for (const item of transactionItems) {
        expect(item).toHaveTextContent(/deposit|income/i);
      }
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify expenditure-only display", async () => {
      // Balance should equal total expenditure (negative) - use specific section
      const expenditureSection = canvas.getByLabelText(/total expenditure/i);
      expect(expenditureSection).toHaveTextContent(/35,000/);

      // Income should be zero - find by specific section
      const incomeSection = canvas.getByLabelText(/total income/i);
      expect(incomeSection).toHaveTextContent(/0/);

      // All transactions should be withdrawals - check for negative amounts
      const transactionItems = canvas.getAllByRole("listitem");
      for (const item of transactionItems) {
        // Check for negative amounts (expenditure) instead of specific text
        expect(item).toHaveTextContent(/-￥/);
      }
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify empty state accessibility", async () => {
      // Check that income, expenditure, and balance all show zero
      const incomeSection = canvas.getByLabelText(/total income/i);
      const expenditureSection = canvas.getByLabelText(/total expenditure/i);
      const balanceSection = canvas.getByLabelText(/current balance/i);

      expect(incomeSection).toHaveTextContent(/0/);
      expect(expenditureSection).toHaveTextContent(/0/);
      expect(balanceSection).toHaveTextContent(/0/);

      // Should show empty state message
      const emptyMessage = canvas.getByText(/no transactions/i);
      expect(emptyMessage).toBeInTheDocument();
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify negative balance display and accessibility",
      async () => {
        // Negative balance should be clearly indicated
        const negativeBalance = canvas.getByText(/50,000/);
        expect(negativeBalance).toBeInTheDocument();
        // Check for orange color class since that's what the component actually uses for negative balances
        expect(negativeBalance).toHaveClass(/text-orange/);

        // Should have appropriate ARIA attributes for negative state
        const balanceSection = canvas.getByLabelText(/current balance/i);
        expect(balanceSection).toHaveAttribute("aria-describedby");
      }
    );
  },
};
