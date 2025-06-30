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
    <div className="space-y-2">
      <label htmlFor="default-select" className="text-sm font-medium">
        Select Option
      </label>
      <Select>
        <SelectTrigger id="default-select" className="w-[180px]">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
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
    <div className="space-y-2">
      <label htmlFor="disabled-select" className="text-sm font-medium">
        Disabled Select
      </label>
      <Select disabled>
        <SelectTrigger id="disabled-select" className="w-[180px]">
          <SelectValue placeholder="Disabled state" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithManyOptions: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="city-select" className="text-sm font-medium">
        Select City
      </label>
      <Select>
        <SelectTrigger id="city-select" className="w-[200px]">
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tokyo">Tokyo</SelectItem>
          <SelectItem value="osaka">Osaka</SelectItem>
          <SelectItem value="kyoto">Kyoto</SelectItem>
          <SelectItem value="nagoya">Nagoya</SelectItem>
          <SelectItem value="sapporo">Sapporo</SelectItem>
          <SelectItem value="fukuoka">Fukuoka</SelectItem>
          <SelectItem value="hiroshima">Hiroshima</SelectItem>
          <SelectItem value="sendai">Sendai</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
