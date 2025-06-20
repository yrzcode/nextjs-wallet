import Columns from "../../components/transactions/DataTable/Columns";
import DataTable from "@/components/transactions/DataTable/DataTable";
import AmountTotal from "@/components/transactions/AmountTotal";
import { getTransactions } from "@/api/transactions";

const TransactionsPage = async () => {
  const transactions = await getTransactions();

  return (
    <div className="p-4">
      <DataTable columns={Columns} data={transactions} />
      <AmountTotal />
    </div>
  );
};

export default TransactionsPage;
