"use client";

import RangeDatePicker from "../../utils/Inputs/RangeDatePicker";
import type { Table } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TableFilter = <TData,>({ table }: { table: Table<TData> }) => {
  const searchParams = useSearchParams();
  const monthRange = searchParams.get("month_range");
  const yearRange = searchParams.get("year_range");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Handle date range filtering
  const handleDateFilter = (start: Date | undefined, end: Date | undefined) => {
    const createdAtColumn = table.getColumn("createdAt");
    if (!createdAtColumn) return;

    if (!start && !end) {
      // Clear filter if no date range is set
      createdAtColumn.setFilterValue(undefined);
      return;
    }

    // Create proper date objects for filtering
    let startDateObj: Date | null = null;
    let endDateObj: Date | null = null;

    if (start) {
      startDateObj = new Date(start);
      startDateObj.setHours(0, 0, 0, 0); // Set to start of day
    }

    if (end) {
      endDateObj = new Date(end);
      endDateObj.setHours(23, 59, 59, 999); // Set to end of day
    }

    createdAtColumn.setFilterValue([startDateObj, endDateObj]);
  };

  useEffect(() => {
    let newStartDate: Date | undefined = undefined;
    let newEndDate: Date | undefined = undefined;

    if (monthRange) {
      const dateMonthAgo = new Date();
      dateMonthAgo.setMonth(
        dateMonthAgo.getMonth() - Number.parseInt(monthRange)
      );
      newStartDate = dateMonthAgo;
      newEndDate = new Date(); // Set end date to current date
    } else if (yearRange) {
      const dateYearAgo = new Date();
      dateYearAgo.setFullYear(
        dateYearAgo.getFullYear() - Number.parseInt(yearRange)
      );
      newStartDate = dateYearAgo;
      newEndDate = new Date(); // Set end date to current date
    }

    // Update state
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Apply the filter immediately
    handleDateFilter(newStartDate, newEndDate);
  }, [monthRange, yearRange]);

  const handleStartDateChange = (date?: Date) => {
    setStartDate(date);
    handleDateFilter(date, endDate);
  };

  const handleEndDateChange = (date?: Date) => {
    setEndDate(date);
    handleDateFilter(startDate, date);
  };

  return (
    <div className="flex items-center gap-2">
      <RangeDatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
    </div>
  );
};

export default TableFilter;
