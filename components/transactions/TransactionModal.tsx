"use client";

import useUiStore from "@/hooks/stores/userUiStore";
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
import { createNewTransaction } from "@/actions/transactions";

const TransactionModal = ({ transactionId }: { transactionId?: string }) => {
  const { isTransactionModalOpen, closeTransactionModal } = useUiStore();

  const dialogDescription = transactionId
    ? "Edit Transaction - Modify existing transaction details including type, amount, and description"
    : "Add a new transaction record. Please fill in the transaction details including transaction type and amount.";

  const handleFormAction = async (formData: FormData) => {
    await createNewTransaction(formData);
    closeTransactionModal();
  };

  return (
    <Dialog
      open={isTransactionModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeTransactionModal();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleFormAction}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-3">
              <Label htmlFor="type">Transaction Type</Label>
              <Select name="type">
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
              <DatePicker name="date" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input name="amount" type="number" placeholder="0" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                defaultValue=""
                placeholder="Enter a description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-button-accent hover:bg-button-hover text-black"
            >
              {transactionId ? "Save Changes" : "Add New Transaction"}
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
