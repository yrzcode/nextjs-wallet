import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Error",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">In Progress</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Cancelled</Badge>
      <Badge variant="outline">Completed</Badge>
    </div>
  ),
};

export const NumberBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>1</Badge>
      <Badge variant="secondary">99+</Badge>
      <Badge variant="destructive">!</Badge>
      <Badge variant="outline">NEW</Badge>
    </div>
  ),
};

export const ColorfulBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-900 hover:bg-green-950 text-white border-green-900">
        Success
      </Badge>
      <Badge className="bg-yellow-800 hover:bg-yellow-900 text-white border-yellow-800">
        Warning
      </Badge>
      <Badge className="bg-blue-800 hover:bg-blue-900 text-white border-blue-800">
        Info
      </Badge>
      <Badge className="bg-purple-800 hover:bg-purple-900 text-white border-purple-800">
        Purple
      </Badge>
    </div>
  ),
};
