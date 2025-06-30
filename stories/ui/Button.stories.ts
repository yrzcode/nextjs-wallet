import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { within, userEvent, expect } from "@storybook/test";

import { Button } from "@/components/ui/button";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
			],
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "xl", "icon"],
		},
		asChild: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Click default button", async () => {
			await userEvent.click(canvas.getByRole("button", { name: "Button" }));
		});

		await step("Verify button state", async () => {
			const button = canvas.getByRole("button", { name: "Button" });
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();
		});
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Delete",
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Click destructive button", async () => {
			await userEvent.click(canvas.getByRole("button", { name: "Delete" }));
		});

		await step("Verify button styles", async () => {
			const button = canvas.getByRole("button", { name: "Delete" });
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass("bg-destructive");
		});
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Click outline button", async () => {
			await userEvent.click(canvas.getByRole("button", { name: "Outline" }));
		});

		await step("Verify button border styles", async () => {
			const button = canvas.getByRole("button", { name: "Outline" });
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass("border");
		});
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small Button",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large Button",
	},
};

export const ExtraLarge: Story = {
	args: {
		size: "xl",
		children: "Extra Large Button",
	},
};

export const Icon: Story = {
	args: {
		size: "icon",
		children: "🔍",
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Click icon button", async () => {
			await userEvent.click(canvas.getByRole("button"));
		});

		await step("Verify icon button size", async () => {
			const button = canvas.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass("size-9");
		});
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled Button",
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Verify button is disabled", async () => {
			const button = canvas.getByRole("button", { name: "Disabled Button" });
			expect(button).toBeInTheDocument();
			expect(button).toBeDisabled();
		});

		await step("Verify disabled button cannot be interacted with", async () => {
			const button = canvas.getByRole("button", { name: "Disabled Button" });
			// Verify disabled button has correct attributes
			expect(button).toHaveAttribute("disabled");
			// Verify button has disabled-related CSS classes
			expect(button.className).toContain("disabled:pointer-events-none");
			expect(button.className).toContain("disabled:opacity-50");
		});
	},
};
