# Storybook Stories Documentation

This project has created corresponding Stories files for main components based on existing Storybook sample files.

## Created Stories Files

### UI Base Components
- **Button.stories.ts** - Button component variants (default, destructive, outline, secondary, ghost, link, etc.) and sizes
- **Card.stories.tsx** - Card component different layouts (default, with footer, with action button, complex card)
- **Input.stories.tsx** - Input component various types (text, email, password, number, etc.) and states
- **Badge.stories.tsx** - Badge component different variants and custom styles
- **Select.stories.tsx** - Select component basic usage and complex options
- **Dialog.stories.tsx** - Dialog component different types (edit, confirm, alert)
- **Skeleton.stories.tsx** - Skeleton component various shapes and use cases
- **RangeDatePicker.stories.tsx** - Range date picker component with multiple preset time ranges

### Business Components
- **BalanceCard.stories.tsx** - Balance card component different data states and filter modes
- **TransactionModal.stories.tsx** - Transaction modal component create and edit modes
- **DataTable.stories.tsx** - Data table component with various data scenarios and interactions

## File Structure

```
stories/
├── ui/                    # UI base component Stories
│   ├── Button.stories.ts
│   ├── Card.stories.tsx
│   ├── Input.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Select.stories.tsx
│   ├── Dialog.stories.tsx
│   ├── Skeleton.stories.tsx
│   └── RangeDatePicker.stories.tsx
├── balance/               # Balance related component Stories
│   └── BalanceCard.stories.tsx
├── transactions/          # Transaction related component Stories
│   ├── TransactionModal.stories.tsx
│   └── DataTable.stories.tsx
├── DataTable.test.ts      # DataTable component tests
├── RangeDatePicker.test.ts # RangeDatePicker component tests
└── README.md             # This documentation file
```

## Features

### 🎨 Complete Component Showcase
- Each component includes multiple use case demonstrations
- Covers different variants, states, and data scenarios

### 🛠️ Interactive Controls
- Configured Storybook controls for main component properties
- Real-time property adjustment to view effects

### 🌏 Localization
- All Stories titles and descriptions use English
- Localized sample data and text content

### 📱 Responsive Design
- Stories adapt to different screen sizes
- Reasonable layout and spacing

### 🔧 Type Safety
- All Stories files use TypeScript
- Correct type definitions and imports

## Usage

1. Start the Storybook development server:
   ```bash
   npm run storybook
   ```

2. View component Stories in your browser

3. Use the controls panel to adjust component properties

4. View code examples to understand component usage

## Adding New Stories

When creating new Stories files, please follow this pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { YourComponent } from '@/components/path/to/YourComponent';

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Configure controls
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default properties
  },
};
```

# Storybook Testing

## Overview

This project uses Storybook's test-runner for automated component testing.

## Created Test Files

### 1. DataTable Tests (`stories/DataTable.test.ts`)
Tests various DataTable component functionalities:
- Default data rendering
- Sorting functionality
- Pagination controls
- Empty state display
- Filter functionality (deposits only, withdrawals only)
- Keyboard accessibility

### 2. RangeDatePicker Tests (`stories/RangeDatePicker.test.ts`)
Tests various RangeDatePicker component functionalities:
- Basic rendering
- Date selection
- Clear functionality
- **Multiple preset buttons** (7 days, 30 days, 3 months, 6 months, 1 year, 5 years, 10 years)
- Disabled state
- Keyboard accessibility
- Individual preset story testing

## Running Tests

### Start Storybook
```bash
yarn storybook
```

### Run Tests
In another terminal, run:
```bash
yarn test-storybook
```

### Run All Tests
```bash
yarn test-storybook
```

### Filter Tests by Tags (if configured)
```bash
# Include only specific story tags
yarn test-storybook --includeTags="component"

# Exclude specific story tags  
yarn test-storybook --excludeTags="docs"
```

### Other Useful Options
```bash
# Run with verbose output
yarn test-storybook --verbose

# Run in watch mode
yarn test-storybook --watch

# Run with coverage report
yarn test-storybook --coverage
```

## Test Configuration

The project is configured with the following test options:
- Uses Chromium browser
- 15-second test timeout
- Limited concurrency in CI environment
- Automatically includes all story files
- Excludes introductory documentation

## Story Coverage

Current tests cover the following story scenarios:

### DataTable Stories:
- Default: Default data table display
- Empty State: Empty state handling
- Deposits Only: Show deposits only
- Withdrawals Only: Show withdrawals only
- Single Row: Single row data
- Large Dataset: Large dataset pagination

### RangeDatePicker Stories:
- **Default**: Default date picker
- **WithDatesSelected**: Pre-selected date range
- **WithStartDateOnly**: Only start date selected
- **WithEndDateOnly**: Only end date selected
- **CurrentMonthRange**: Current month preset
- **Last7Days**: Last 7 days preset
- **Last30Days**: Last 30 days preset
- **Last3Months**: Last 3 months preset ✨ *NEW*
- **Last6Months**: Last 6 months preset ✨ *NEW*
- **Last1Year**: Last 1 year preset ✨ *NEW*
- **Last5Years**: Last 5 years preset ✨ *NEW*
- **Last10Years**: Last 10 years preset ✨ *NEW*
- **InteractiveDemo**: Interactive demonstration with all preset buttons

### New Features Added:

#### 🆕 Extended Time Range Presets
The RangeDatePicker now includes comprehensive time range options:
- **Last 3 months**: 3 months back from current date
- **Last 6 months**: 6 months back from current date  
- **Last 1 year**: 1 year back from current date
- **Last 5 years**: 5 years back from current date
- **Last 10 years**: 10 years back from current date

#### 🧪 Comprehensive Testing
- Individual tests for each preset button functionality
- Visual verification of preset story displays
- Interactive demo testing with all preset buttons
- Proper date range validation for each preset

## Notes

1. Ensure to start the Storybook server before running tests
2. Tests automatically check basic component rendering and interaction functionality
3. Includes basic accessibility testing
4. Test results generate detailed reports
5. **All preset buttons are tested for proper date range setting**

## Extending Tests

To add new tests, you can:
1. Add new test cases to existing test files
2. Create new `.test.ts` files
3. Ensure test files follow Playwright test format
4. **Test new preset buttons by adding them to the InteractiveDemo story and corresponding test cases** 