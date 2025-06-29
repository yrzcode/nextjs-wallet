import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        Select Language
      </label>
      <Select>
        <SelectTrigger id="language-select" className="w-[200px]">
          <SelectValue placeholder="Choose language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="zh">Chinese</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Disabled state" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithManyOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="beijing">Beijing</SelectItem>
        <SelectItem value="shanghai">Shanghai</SelectItem>
        <SelectItem value="guangzhou">Guangzhou</SelectItem>
        <SelectItem value="shenzhen">Shenzhen</SelectItem>
        <SelectItem value="hangzhou">Hangzhou</SelectItem>
        <SelectItem value="nanjing">Nanjing</SelectItem>
        <SelectItem value="chengdu">Chengdu</SelectItem>
        <SelectItem value="wuhan">Wuhan</SelectItem>
      </SelectContent>
    </Select>
  ),
};
