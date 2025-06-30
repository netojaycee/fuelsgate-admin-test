import type { Meta, StoryObj } from "@storybook/react";
import { Label } from ".";

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    fontFamily: {
      type: 'string',
      control: 'text',
      description: 'You can parse your preferred font family for the button text'
    },
    children: {
      type: 'string',
      control: 'text',
      description: 'Enter element content here'
    },
    classNames: {
      type: 'string',
      control: 'text',
      description: 'Extra className to style the button'
    },
    optional: {
      type: 'boolean',
      control: 'boolean',
      description: 'Use true of false to set if input is optional'
    },
  }
} satisfies Meta<typeof Label>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: 'Label',
    label: 'Label'
  },
} satisfies Story;

export const Optional = {
  args: {
    name: 'Label',
    label: 'Label',
    optional: true
  },
} satisfies Story;