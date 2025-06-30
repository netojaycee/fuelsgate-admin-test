import type { Meta, StoryObj } from "@storybook/react";
import { Text } from ".";

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: 'string',
      control: 'select',
      description: 'Different text types available on the system',
      options: ["pl", "pm", "ps", "pxs", "cl", "cs", "cxs"]
    },
    fontWeight: {
      type: 'string',
      control: 'select',
      description: 'Font sizes for the button text',
      options: ["regular", "medium", "semibold", "bold"]
    },
    color: {
      type: 'string',
      control: 'text',
      description: 'Tailwind text color className (Eg: text-red-500, text-[#eee])'
    },
    lineHeight: {
      type: 'string',
      control: 'text',
      description: 'Tailwind line height className (Eg: leading-4, leading-[14px])'
    },
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
    }
  }
} satisfies Meta<typeof Text>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    variant: 'pl',
    children: 'Text'
  },
} satisfies Story;

export const TextPL = {
  args: {
    variant: 'pl',
    children: 'Text PL'
  },
} satisfies Story;

export const TextPM = {
  args: {
    variant: 'pm',
    children: 'Text PM'
  },
} satisfies Story;

export const TextPS = {
  args: {
    variant: 'ps',
    children: 'Text PS'
  },
} satisfies Story;

export const TextPXS = {
  args: {
    variant: 'pxs',
    children: 'Text PXS'
  },
} satisfies Story;

export const TextCL = {
  args: {
    variant: 'cl',
    children: 'Text CL'
  },
} satisfies Story;

export const TextCS = {
  args: {
    variant: 'cs',
    children: 'Text CS'
  },
} satisfies Story;

export const TextCXS = {
  args: {
    variant: 'cxs',
    children: 'Text CXS'
  },
} satisfies Story;