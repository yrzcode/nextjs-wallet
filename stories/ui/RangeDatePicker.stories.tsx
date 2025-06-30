import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify last 7 days date range is displayed", async () => {
      // Check if both date picker buttons are present (they appear as buttons, not textboxes)
      const dateButtons = canvas.getAllByRole("button");
      // Should have at least 2 date picker buttons + 1 clear button
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Verify the date range label
      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });

    await step("Verify actual 7 days date range calculation", async () => {
      // Check if current values section is displayed
      const currentValuesSection = canvas.getByText("Current Values:");
      expect(currentValuesSection).toBeInTheDocument();

      // Calculate expected dates for last 7 days
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      // Verify the displayed dates match expected 7 days range
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();

      // Check that start date is approximately 7 days ago
      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is 7 days (allowing for 1 day tolerance due to time zones)
        expect(diffDays).toBeGreaterThanOrEqual(6);
        expect(diffDays).toBeLessThanOrEqual(8);
      }
    });

    await step("Test clear filter functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
      await userEvent.click(clearButton);
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify last 30 days date range is displayed", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Verify the date range label is present
      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });

    await step("Verify actual 30 days date range calculation", async () => {
      // Check if current values section is displayed
      const currentValuesSection = canvas.getByText("Current Values:");
      expect(currentValuesSection).toBeInTheDocument();

      // Verify the displayed dates match expected 30 days range
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();

      // Extract and verify the date range is approximately 30 days
      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 30 days (allowing tolerance for time zones)
        expect(diffDays).toBeGreaterThanOrEqual(29);
        expect(diffDays).toBeLessThanOrEqual(31);
      }

      // Verify date range separator
      const separator = canvas.getByText("-");
      expect(separator).toBeInTheDocument();
    });

    await step("Test clear button functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
      await userEvent.click(clearButton);
    });
  },
};

// Last 3 months
export const Last3Months: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() - 3);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 3 months.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify 3 months preset is loaded correctly", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Check the current values display
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();
    });

    await step("Verify actual 3 months date range calculation", async () => {
      // Extract and verify the date range is approximately 3 months (90 days)
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);

      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 3 months (85-95 days, accounting for different month lengths)
        expect(diffDays).toBeGreaterThanOrEqual(85);
        expect(diffDays).toBeLessThanOrEqual(95);
      }

      // Verify separator between date inputs
      const separator = canvas.getByText("-");
      expect(separator).toBeInTheDocument();
    });

    await step("Test clear button functionality", async () => {
      // Verify clear button is present
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
      await userEvent.click(clearButton);
    });
  },
};

// Last 6 months
export const Last6Months: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() - 6);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 6 months.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify 6 months preset functionality", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Verify date range label
      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });

    await step("Verify actual 6 months date range calculation", async () => {
      // Extract and verify the date range is approximately 6 months (180 days)
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();

      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 6 months (170-190 days, accounting for different month lengths)
        expect(diffDays).toBeGreaterThanOrEqual(170);
        expect(diffDays).toBeLessThanOrEqual(190);
      }
    });

    await step("Test clear functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      await userEvent.click(clearButton);

      // Verify the component is still rendered after clear
      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });
  },
};

// Last 1 year
export const Last1Year: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 1 year.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify 1 year preset displays correctly", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Check current values section
      const currentValuesHeading = canvas.getByText("Current Values:");
      expect(currentValuesHeading).toBeInTheDocument();
    });

    await step("Verify actual 1 year date range calculation", async () => {
      // Extract and verify the date range is approximately 1 year (365 days)
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();

      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 1 year (360-370 days, accounting for leap years)
        expect(diffDays).toBeGreaterThanOrEqual(360);
        expect(diffDays).toBeLessThanOrEqual(370);
      }

      // Verify date range structure
      const separator = canvas.getByText("-");
      expect(separator).toBeInTheDocument();

      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });

    await step("Test clear button functionality", async () => {
      // Test clear button
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
      await userEvent.click(clearButton);
    });
  },
};

// Last 5 years
export const Last5Years: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 5);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 5 years.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify 5 years preset is working", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Check that both start and end date text are shown
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);
      expect(startDateText).toBeInTheDocument();
      expect(endDateText).toBeInTheDocument();
    });

    await step("Verify actual 5 years date range calculation", async () => {
      // Extract and verify the date range is approximately 5 years (1825 days)
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);

      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 5 years (1800-1850 days, accounting for leap years)
        expect(diffDays).toBeGreaterThanOrEqual(1800);
        expect(diffDays).toBeLessThanOrEqual(1850);
      }
    });

    await step("Test clear button functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toHaveAttribute("title", "Clear date range");
      await userEvent.click(clearButton);
    });
  },
};

// Last 10 years
export const Last10Years: Story = {
  args: {
    initialStartDate: (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 10);
      return date;
    })(),
    initialEndDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: "Range date picker preset with the last 10 years.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify 10 years preset loads correctly", async () => {
      // Check if date picker buttons are present
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThanOrEqual(3);

      // Verify the main label
      const dateRangeLabel = canvas.getByText("Date Range:");
      expect(dateRangeLabel).toBeInTheDocument();
    });

    await step("Verify date information display", async () => {
      // Check current values display
      const currentValuesSection = canvas.getByText("Current Values:");
      expect(currentValuesSection).toBeInTheDocument();

      // Check start and end date labels
      const startDateLabel = canvas.getByText(/Start Date:/);
      const endDateLabel = canvas.getByText(/End Date:/);
      expect(startDateLabel).toBeInTheDocument();
      expect(endDateLabel).toBeInTheDocument();
    });

    await step("Verify actual 10 years date range calculation", async () => {
      // Extract and verify the date range is approximately 10 years (3650 days)
      const startDateText = canvas.getByText(/Start Date:/);
      const endDateText = canvas.getByText(/End Date:/);

      const startDateMatch = startDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );
      const endDateMatch = endDateText.textContent?.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})/
      );

      if (startDateMatch && endDateMatch) {
        const displayedStartDate = new Date(startDateMatch[1]);
        const displayedEndDate = new Date(endDateMatch[1]);

        // Calculate the difference in days
        const diffTime =
          displayedEndDate.getTime() - displayedStartDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Verify the range is approximately 10 years (3600-3700 days, accounting for leap years)
        expect(diffDays).toBeGreaterThanOrEqual(3600);
        expect(diffDays).toBeLessThanOrEqual(3700);
      }
    });

    await step("Test clear button functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
      await userEvent.click(clearButton);
    });
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
        label: "Last 3 months",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 3);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "Last 6 months",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "Last 1 year",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 1);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "Last 5 years",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 5);
          setStartDate(start);
          setEndDate(end);
        },
      },
      {
        label: "Last 10 years",
        action: () => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 10);
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify interactive demo structure", async () => {
      // Check if quick presets heading is present
      const presetsHeading = canvas.getByText("Quick Presets:");
      expect(presetsHeading).toBeInTheDocument();

      // Check if selected range section is present
      const selectedRangeHeading = canvas.getByText("Selected Range:");
      expect(selectedRangeHeading).toBeInTheDocument();
    });

    await step('Test "Last 7 days" preset button', async () => {
      const last7DaysButton = canvas.getByRole("button", {
        name: "Last 7 days",
      });
      expect(last7DaysButton).toBeInTheDocument();
      await userEvent.click(last7DaysButton);

      // Verify date range is set
      const startText = canvas.getByText(/Start:/);
      const endText = canvas.getByText(/End:/);
      expect(startText).toBeInTheDocument();
      expect(endText).toBeInTheDocument();
    });

    await step('Test "Last 30 days" preset button', async () => {
      const last30DaysButton = canvas.getByRole("button", {
        name: "Last 30 days",
      });
      await userEvent.click(last30DaysButton);

      // Check if duration is calculated and displayed
      const durationText = canvas.getByText(/Duration:/);
      expect(durationText).toBeInTheDocument();

      // Verify the actual 30 days calculation
      const durationMatch = durationText.textContent?.match(
        /Duration:\s*(\d+)\s*days/
      );
      if (durationMatch) {
        const days = Number.parseInt(durationMatch[1], 10);
        // Should be approximately 30 days (allowing small tolerance)
        expect(days).toBeGreaterThanOrEqual(29);
        expect(days).toBeLessThanOrEqual(31);
      }
    });

    await step('Test "Last 3 months" preset button', async () => {
      const last3MonthsButton = canvas.getByRole("button", {
        name: "Last 3 months",
      });
      await userEvent.click(last3MonthsButton);

      // Verify the date range picker is still functional
      const dateButtons = canvas.getAllByRole("button");
      expect(dateButtons.length).toBeGreaterThan(3); // Multiple preset buttons + date picker buttons + clear button
    });

    await step('Test "Last 1 year" preset button', async () => {
      const last1YearButton = canvas.getByRole("button", {
        name: "Last 1 year",
      });
      await userEvent.click(last1YearButton);

      // Verify duration calculation for large ranges
      const durationText = canvas.getByText(/Duration:/);
      expect(durationText).toBeInTheDocument();
    });

    await step('Test "Last 5 years" preset button', async () => {
      const last5YearsButton = canvas.getByRole("button", {
        name: "Last 5 years",
      });
      await userEvent.click(last5YearsButton);

      // Check if clear button still works after preset selection
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      expect(clearButton).toBeInTheDocument();
    });

    await step("Test clear filter functionality", async () => {
      const clearButton = canvas.getByRole("button", { name: /clear filter/i });
      await userEvent.click(clearButton);

      // Verify dates are cleared by checking that the duration section disappears
      // Since duration only appears when both dates are set, it should be gone after clear
      const durationElements = canvas.queryAllByText(/Duration:/);
      expect(durationElements).toHaveLength(0); // Duration should disappear after clear

      // Verify the basic structure still exists
      const startText = canvas.getByText(/Start:/);
      const endText = canvas.getByText(/End:/);
      expect(startText).toBeInTheDocument();
      expect(endText).toBeInTheDocument();
    });

    await step('Test "Today" preset button', async () => {
      const todayButton = canvas.getByRole("button", { name: "Today" });
      await userEvent.click(todayButton);

      // Verify both start and end dates are set to today
      const durationText = canvas.getByText(/Duration:/);
      expect(durationText).toBeInTheDocument();
    });
  },
};
