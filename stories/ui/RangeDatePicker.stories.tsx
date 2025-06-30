import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import DatePicker from "@/components/utils/Inputs/DatePicker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Create a Storybook-friendly version of RangeDatePicker without router dependencies
const StoryBookRangeDatePicker = ({
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
  const handleClear = () => {
    // Clear date state (without router interactions for Storybook)
    onStartDateChange();
    onEndDateChange();
    console.log("Date range cleared (Storybook mode)");
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

// Wrapper component for controlled state management
const RangeDatePickerWrapper = ({
  initialStartDate,
  initialEndDate,
}: {
  initialStartDate?: Date;
  initialEndDate?: Date;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

  return (
    <div className="p-4">
      <StoryBookRangeDatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Current Values:</h3>
        <p className="text-xs text-gray-600">
          Start Date:{" "}
          {startDate ? startDate.toLocaleDateString() : "Not selected"}
        </p>
        <p className="text-xs text-gray-600">
          End Date: {endDate ? endDate.toLocaleDateString() : "Not selected"}
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: "UI/RangeDatePicker",
  component: RangeDatePickerWrapper,

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date range picker component that allows users to select start and end dates with a clear filter option.",
      },
    },
    nextjs: {
      router: {
        pathname: "/transactions",
        asPath: "/transactions",
        query: {},
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    initialStartDate: {
      control: "date",
      description: "Initial start date",
    },
    initialEndDate: {
      control: "date",
      description: "Initial end date",
    },
  },
} satisfies Meta<typeof RangeDatePickerWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty state
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default range date picker with no dates selected.",
      },
    },
  },
};

// With both dates pre-selected
export const WithDatesSelected: Story = {
  args: {
    initialStartDate: new Date(2024, 0, 1), // January 1, 2024
    initialEndDate: new Date(2024, 0, 31), // January 31, 2024
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker with both start and end dates pre-selected.",
      },
    },
  },
};

// With only start date
export const WithStartDateOnly: Story = {
  args: {
    initialStartDate: new Date(2024, 5, 1), // June 1, 2024
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker with only the start date pre-selected.",
      },
    },
  },
};

// With only end date
export const WithEndDateOnly: Story = {
  args: {
    initialEndDate: new Date(2024, 11, 31), // December 31, 2024
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker with only the end date pre-selected.",
      },
    },
  },
};

// Current month range
export const CurrentMonthRange: Story = {
  args: {
    initialStartDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ),
    initialEndDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the current month's date range.",
      },
    },
  },
};

// Last 7 days
export const Last7Days: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 7 days.",
      },
    },
  },
};

// Last 30 days
export const Last30Days: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 30 days.",
      },
    },
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    const presets = [
      {
        label: "Today",
        action: () => {
          const today = new Date();
          setStartDate(today);
          setEndDate(today);
        },
      },
      {
        label: "Last 7 days",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 7);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "Last 30 days",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 30);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "This month",
        action: () => {
          const start = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          );
          const end = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          );
          setStartDate(start);
          setEndDate(end);
        },
      },
    ];

    return (
      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Quick Presets:</h3>
          <div className="flex gap-2 flex-wrap">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={preset.action}
                className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded-md border"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <StoryBookRangeDatePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Selected Range:</h3>
          <p className="text-xs text-gray-600">
            Start: {startDate ? startDate.toLocaleDateString() : "Not selected"}
          </p>
          <p className="text-xs text-gray-600">
            End: {endDate ? endDate.toLocaleDateString() : "Not selected"}
          </p>
          {startDate && endDate && (
            <p className="text-xs text-blue-600 mt-1">
              Duration:{" "}
              {Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with preset buttons and real-time feedback showing selected date range and duration.",
      },
    },
  },
};
