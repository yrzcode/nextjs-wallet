import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a sample card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content of the card. It can contain any information
          you need.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer section.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action Button</CardTitle>
        <CardAction>
          <Button size="sm">Action</Button>
        </CardAction>
        <CardDescription>
          This card includes an action button in the header area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const ComplexCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Complex Card Example</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            •••
          </Button>
        </CardAction>
        <CardDescription>
          This is a complete card example with all elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Project Details</h4>
            <p className="text-sm text-muted-foreground">
              Here are the detailed information and description of the project.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm">Status: In Progress</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">June 2024</span>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};
