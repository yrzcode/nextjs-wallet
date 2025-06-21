"use client";

import useFilterStore from "@/hooks/stores/useFilterStore";
import RangeDatePicker from "../../utils/Inputs/RangeDatePicker";
import type { Table } from "@tanstack/react-table";
import { useEffect } from "react";

const TableFilter = <TData,>({ table }: { table: Table<TData> }) => {
  const { filter, setFilter } = useFilterStore();

  useEffect(() => {
    handleDateFilter(filter.startDate, filter.endDate);
  }, [filter]);

  // Handle date range filtering
  const handleDateFilter = (start: Date | undefined, end: Date | undefined) => {
    const createdAtColumn = table.getColumn("date");
    if (!createdAtColumn) return;
    if (!start && !end) {
      // Clear filter if no date range is set
      createdAtColumn.setFilterValue(undefined);
      // Also ensure we reset all column filters if this was the only filter
      table.resetColumnFilters();
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

  const handleStartDateChange = (date?: Date) => {
    setFilter({ startDate: date });
  };

  const handleEndDateChange = (date?: Date) => {
    setFilter({ endDate: date });
  };

  return (
    <div className="flex items-center gap-2">
      <RangeDatePicker
        startDate={filter.startDate}
        endDate={filter.endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
    </div>
  );
};

export default TableFilter;
