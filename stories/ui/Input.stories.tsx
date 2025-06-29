import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is the input text",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email address...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "This input is disabled",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="input-example" className="text-sm font-medium">
        Username
      </label>
      <Input id="input-example" placeholder="Enter username..." {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="input-error" className="text-sm font-medium">
        Email Address
      </label>
      <Input
        id="input-error"
        type="email"
        placeholder="Enter email..."
        aria-invalid="true"
        className="border-red-500"
        {...args}
      />
      <p className="text-sm text-red-500">Please enter a valid email address</p>
    </div>
  ),
};
