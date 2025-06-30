import type { Meta, StoryObj } from "@storybook/react";
import CustomCheckbox from ".";

const meta = {
  title: 'Components/Custom Checkbox',
  component: CustomCheckbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      type: 'string',
      control: "text",
      description: "insert a unique name here"
    },
    label: {
      type: 'string',
      control: "text",
      description: "Enter item title here"
    }
  }
} satisfies Meta<typeof CustomCheckbox>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: "user",
    label: "This is a checkbox field",
  },
} satisfies Story;
