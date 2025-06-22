import Columns from "../../components/transactions/DataTable/Columns/Columns";
import DataTable from "@/components/transactions/DataTable/DataTable";
import TransactionModal from "@/components/transactions/TransactionModal";
import { getAllTransactions } from "@/actions/transactions";

const TransactionsPage = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="p-4">
      <TransactionModal />
      <DataTable columns={Columns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
