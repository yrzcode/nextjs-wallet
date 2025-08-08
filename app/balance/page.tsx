import { getBalanceData } from "@/actions/transactions";
import BalanceCard from "@/components/balance/BalanceCard";

// Force dynamic rendering to avoid build-time database connections
export const dynamic = 'force-dynamic';

interface BalancePageProps {
  searchParams: Promise<{
    filter?: string;
  }>;
}

const BalancePage = async ({ searchParams }: BalancePageProps) => {
  // Get filter parameter
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams.filter || "all";

  // Get balance data
  const balanceData = await getBalanceData(
    filter === "all" ? undefined : filter
  );

  return (
    <div className="p-6 w-full mx-auto">
      <BalanceCard
        totalIncome={balanceData.totalIncome}
        totalExpenditure={balanceData.totalExpenditure}
        balance={balanceData.balance}
        transactions={balanceData.transactions}
        filter={balanceData.filter}
      />
    </div>
  );
};

export default BalancePage;
