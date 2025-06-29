import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/utils/Inputs/DatePicker";
import { toast } from "sonner";
import type { Transaction } from "@prisma/client";

// Mock TransactionModal component for Storybook to avoid server actions
const MockTransactionModal = ({
  isOpen = false,
  onClose = fn(),
  transaction,
  onSubmit = fn(),
}: {
  isOpen?: boolean;
  onClose?: () => void;
  transaction?: Transaction | null;
  onSubmit?: (data: {
    type: string;
    amount: number;
    content: string;
    date: string;
  }) => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const dialogTitle = transaction ? "Edit Transaction" : "Add Transaction";
  const dialogDescription = transaction
    ? "Edit Transaction - Modify existing transaction details including type, date, amount, and description"
    : "Add a new transaction record. Please fill in the transaction details including transaction type, date, amount, and description.";
  const dialogButton = transaction ? "Save Changes" : "Add New Transaction";

  const handleFormAction = async (formData: FormData) => {
    // Mock form validation
    const type = formData.get("type") as string;
    const amount = formData.get("amount") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;

    const newErrors: Record<string, string[]> = {};

    if (!type) {
      newErrors.type = ["Transaction type is required"];
    }
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = ["Amount must be a positive number"];
    }
    if (!date) {
      newErrors.date = ["Date is required"];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Failed to save transaction", {
        description: "Please check the form and try again",
      });
      return;
    }

    // Simulate successful submission
    onSubmit({ type, amount: Number(amount), content, date });
    toast.success("Transaction saved successfully", {
      description: "The transaction has been saved successfully",
    });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setErrors({});
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
              {errors?.type && (
                <p className="text-red-500">*{errors.type[0]}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <DatePicker
                name="date"
                defaultDate={
                  transaction?.date ? new Date(transaction.date) : new Date()
                }
              />
              {errors?.date && (
                <p className="text-red-500">*{errors.date[0]}</p>
              )}
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
              {errors?.amount && (
                <p className="text-red-500">*{errors.amount[0]}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                name="content"
                defaultValue={transaction?.content || ""}
                placeholder="Enter a content"
              />
              {errors?.content && (
                <p className="text-red-500">*{errors.content[0]}</p>
              )}
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

const meta = {
  title: "Components/TransactionModal",
  component: MockTransactionModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    transaction: {
      control: "object",
      description: "Transaction data for edit mode",
    },
  },
  args: {
    onClose: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof MockTransactionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
  name: "Create New Transaction",
  args: {
    isOpen: true,
    transaction: null,
  },
};

export const EditMode: Story = {
  name: "Edit Existing Transaction",
  args: {
    isOpen: true,
    transaction: {
      id: "1",
      amount: 5000,
      type: "Deposit" as const,
      content: "Salary Income",
      userId: "user1",
      date: new Date("2024-06-01"),
      createdAt: new Date("2024-06-01"),
      updatedAt: new Date("2024-06-01"),
    },
  },
};

export const EditWithdrawal: Story = {
  name: "Edit Withdrawal Transaction",
  args: {
    isOpen: true,
    transaction: {
      id: "2",
      amount: 1200,
      type: "Withdrawal" as const,
      content: "Grocery Shopping",
      userId: "user1",
      date: new Date("2024-06-15"),
      createdAt: new Date("2024-06-15"),
      updatedAt: new Date("2024-06-15"),
    },
  },
};

export const Closed: Story = {
  name: "Modal Closed",
  args: {
    isOpen: false,
    transaction: null,
  },
};

// Interactive story that demonstrates opening and closing
export const Interactive: Story = {
  name: "Interactive Modal",
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Open Transaction Modal</Button>
        <MockTransactionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log("Form submitted:", data);
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
};
