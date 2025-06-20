import Columns from "../../components/transactions/DataTable/Columns";
import { getTransactions } from "@/api/transactions";
import { DataTable } from "@/components/transactions/DataTable/DataTable";

const TransactionsPage = async () => {
  const transactions = await getTransactions();

  return (
    <div className="p-4">
      <DataTable columns={Columns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
