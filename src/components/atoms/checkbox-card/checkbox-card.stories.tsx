import type { Meta, StoryObj } from "@storybook/react";
import CheckboxCard from ".";

const meta = {
  title: 'Components/Checkbox Card',
  component: CheckboxCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      type: 'string',
      control: "text",
      description: "insert an image link here"
    },
    name: {
      type: 'string',
      control: "text",
      description: "insert a unique name here"
    },
    description: {
      type: 'string',
      control: "text",
      description: "Enter item description"
    },
    label: {
      type: 'string',
      control: "text",
      description: "Enter item title here"
    }
  }
} satisfies Meta<typeof CheckboxCard>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    image: "https://loremflickr.com/3200/2400/paris,boy?random=1",
    name: "user",
    description: "Select your preferred user",
    label: "User 1"
  },
} satisfies Story;
