import { getTransactions } from "@/api/transactions";
import { DataTable } from "@/components/utils/DataTable";
import { columns } from "./columns";

const TransactionsPage = async () => {
  const transactions = await getTransactions();

  return (
    <div className="p-4">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
