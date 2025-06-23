import useUiStore from "@/hooks/stores/useTransactionModalStore";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FaPlus, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";

const TableActions = <TData,>({ table }: { table: Table<TData> }) => {
  const [isClient, setIsClient] = useState(false);
  const data = table
    .getFilteredRowModel()
    .rows.map((row) => row.original) as object[];

  const { openTransactionModal, clearModalTransaction } = useUiStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      {isClient ? (
        <CSVLink
          data={data}
          filename="transactions.csv"
          className="inline-block"
        >
          <Button variant="outline" className="underline">
            Download CSV
            <FaDownload />
          </Button>
        </CSVLink>
      ) : (
        <Button variant="outline" className="underline" disabled>
          Download CSV
          <FaDownload />
        </Button>
      )}
    </div>
  );
};

export default TableActions;
