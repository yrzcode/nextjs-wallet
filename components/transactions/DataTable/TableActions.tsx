import useUiStore from "@/hooks/stores/useTransactionModalStore";
import { Button } from "@/components/ui/button";
import { FaPlus, FaDownload } from "react-icons/fa";

const TableActions = () => {
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
      <Button variant="outline" className="underline">
        <FaDownload />
        Download CSV
      </Button>
    </div>
  );
};

export default TableActions;
