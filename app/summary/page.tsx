import { getBalanceData } from "@/actions/transactions";
import SummaryClient from "@/components/summary/SummaryClient";

// Force dynamic rendering to avoid build-time database connections
export const dynamic = 'force-dynamic';

const SummaryPage = async () => {
  // Get balance data (all transactions)
  const balanceData = await getBalanceData();

  return (
    <div className="p-6 w-full mx-auto">
      <SummaryClient transactions={balanceData.transactions} />
    </div>
  );
};

export default SummaryPage;
