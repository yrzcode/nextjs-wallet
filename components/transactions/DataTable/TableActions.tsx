import useUiStore from "@/hooks/stores/useTransactionModalStore";
import { Button } from "@/components/ui/button";
import { FaPlus, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { Table } from "@tanstack/react-table";

const TableActions = <TData,>({ table }: { table: Table<TData> }) => {
  const data = table
    .getFilteredRowModel()
    .rows.map((row) => row.original) as object[];

  const { openTransactionModal, clearModalTransaction } = useUiStore();
  const handleOpenTransactionModal = () => {
    clearModalTransaction();
    openTransactionModal();
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        className="bg-button-accent hover:bg-button-hover text-black"
        onClick={handleOpenTransactionModal}
      >
        <FaPlus />
        Add Transaction
      </Button>
      <CSVLink data={data} filename="transactions.csv">
        <Button variant="outline" className="underline">
          Download CSV
          <FaDownload />
        </Button>
      </CSVLink>
    </div>
  );
};

export default TableActions;
