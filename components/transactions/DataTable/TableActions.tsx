import { Button } from "@/components/ui/button";
import { FaPlus, FaDownload } from "react-icons/fa";

const TableActions = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        className="bg-button-accent hover:bg-button-hover text-black"
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
