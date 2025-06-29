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

### Business Components
- **BalanceCard.stories.tsx** - Balance card component different data states and filter modes
- **TransactionModal.stories.tsx** - Transaction modal component create and edit modes

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
│   └── Skeleton.stories.tsx
├── balance/               # Balance related component Stories
│   └── BalanceCard.stories.tsx
├── transactions/          # Transaction related component Stories
│   └── TransactionModal.stories.tsx
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
- All Stories titles and descriptions use Chinese
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