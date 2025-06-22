"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({
  date,
  onDateChange,
  placeholder = "Select date",
  name,
  defaultDate,
}: {
  date?: Date;
  onDateChange?: (date?: Date) => void;
  placeholder?: string;
  name?: string;
  defaultDate?: Date;
}) => {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    defaultDate || date
  );

  // Determine if this is controlled or uncontrolled mode
  const isControlled = onDateChange !== undefined;
  const currentDate = isControlled ? date : internalDate;

  // Custom date formatter: 2025 / 6 / 7
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    return `${year} / ${month} / ${day}`;
  };

  // Handle date selection
  const handleDateSelect = (selectedDate?: Date) => {
    if (isControlled && onDateChange) {
      onDateChange(selectedDate);
    } else {
      setInternalDate(selectedDate);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={currentDate ? currentDate.toISOString() : ""}
        />
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal text-sm"
          >
            {currentDate ? formatDate(currentDate) : placeholder}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={currentDate}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
