import useUiStore from "@/hooks/stores/useTransactionModalStore";
import type { Row } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteTransaction } from "@/actions/transactions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ActionCell = ({ row }: { row: Row<Transaction> }) => {
  const { setModalTransaction, openTransactionModal } = useUiStore();
  const transaction = row.original;
  const handleEditTransaction = () => {
    setModalTransaction(transaction);
    openTransactionModal();
  };
  const handleDeleteTransaction = async () => {
    try {
      const result = await deleteTransaction(transaction.id);
      if (result.success) {
        toast.success("Transaction deleted successfully");
      } else {
        toast.error("Failed to delete transaction", {
          description: "Please try again later",
        });
      }
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      toast.error("Failed to delete transaction", {
        description: "Please try again later",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditTransaction}>
          <FaEdit /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteTransaction}>
          <FaTrash /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
