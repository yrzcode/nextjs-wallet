"use client";

import DatePicker from "./DatePicker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const RangeDatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    // Clear date state
    onStartDateChange(undefined);
    onEndDateChange(undefined);

    // Clear URL search params
    router.push(pathname);
  };

  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="date" className="px-1 text-sm font-medium">
        Date Range:
      </Label>
      <div className="flex gap-1 items-center">
        <DatePicker
          date={startDate}
          onDateChange={onStartDateChange}
          placeholder="From date"
        />
        <span className="text-sm text-gray-500">-</span>
        <DatePicker
          date={endDate}
          onDateChange={onEndDateChange}
          placeholder="To date"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="ml-1 px-3 py-1 h-8 text-sm"
          title="Clear date range"
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default RangeDatePicker;
