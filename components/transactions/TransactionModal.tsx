"use client";

import useUiStore from "@/hooks/stores/useTransactionModalStore";
import DatePicker from "../utils/Inputs/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  createNewTransaction,
  updateTransaction,
} from "@/actions/transactions";

const TransactionModal = () => {
  const {
    transaction,
    isTransactionModalOpen,
    closeTransactionModal,
    clearModalTransaction,
  } = useUiStore();

  const dialogTitle = transaction ? "Edit Transaction" : "Add Transaction";

  const dialogDescription = transaction
    ? "Edit Transaction - Modify existing transaction details including type, amount, and description"
    : "Add a new transaction record. Please fill in the transaction details including transaction type and amount.";

  const dialogButton = transaction ? "Save Changes" : "Add New Transaction";

  const handleFormAction = async (formData: FormData) => {
    if (transaction) {
      updateTransaction(transaction.id, formData);
    } else {
      await createNewTransaction(formData);
    }
    closeTransactionModal();
  };

  return (
    <Dialog
      open={isTransactionModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeTransactionModal();
          clearModalTransaction();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleFormAction}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-3">
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                name="type"
                defaultValue={transaction?.type || "Deposit"}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transaction Type</SelectLabel>
                    <SelectItem value="Deposit">Deposit</SelectItem>
                    <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <DatePicker
                name="date"
                defaultDate={
                  transaction?.date ? new Date(transaction.date) : new Date()
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                name="amount"
                type="number"
                min="0"
                placeholder="0"
                defaultValue={transaction?.amount?.toString() || ""}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                defaultValue={transaction?.description || ""}
                placeholder="Enter a description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-button-accent hover:bg-button-hover text-black"
            >
              {dialogButton}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
