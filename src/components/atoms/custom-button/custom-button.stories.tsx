import type { Meta, StoryObj } from "@storybook/react";
import customButton from ".";

const meta = {
  title: 'Components/Custom Button',
  component: customButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: 'string',
      control: "text",
      description: "Enter button label here"
    },
    type: {
      type: 'string',
      control: 'select',
      options: ["submit", "button"],
      description: 'Button type (submit, button, reset)'
    },
    variant: {
      type: 'string',
      control: 'select',
      description: 'Different button types available on the system',
      options: ["primary", "white", "plain"]
    },
    classNames: {
      type: 'string',
      control: 'text',
      description: 'Extra className to style the button'
    },
    fontSize: {
      type: 'string',
      control: 'text',
      description: 'Tailwind text font size className (Eg: text-base, text-[14px])'
    },
    fontWeight: {
      type: 'string',
      control: 'select',
      description: 'Font sizes for the button text',
      options: ["regular", "medium", "semibold", "bold"]
    },
    fontFamily: {
      type: 'string',
      control: 'text',
      description: 'You can parse your preferred font family for the button text'
    },
    border: {
      type: 'string',
      control: 'text',
      description: 'Tailwind border className (Eg: border, border-2 border-[4px])'
    },
    height: {
      type: 'string',
      control: 'text',
      description: 'Tailwind height className (Eg: h-2, h-[4px])'
    },
    color: {
      type: 'string',
      control: 'text',
      description: 'Tailwind text color className (Eg: text-red-500, text-[#eee])'
    },
    bgColor: {
      type: 'string',
      control: 'text',
      description: 'Tailwind background color className (Eg: bg-red-500, bg-black)'
    },
    width: {
      type: 'string',
      control: 'text',
      description: 'Tailwind width className (Eg: w-2, w-[4px])'
    },
    loading: {
      type: 'boolean',
      control: 'boolean',
      description: 'Use true of false to set button loading state'
    },
    leftIcon: {
      type: 'function',
      description: 'Pass react icon here to show an Icon on the left side of the button'
    },
    rightIcon: {
      type: 'function',
      description: 'Pass react icon here to show an Icon on the right side of the button'
    },
    onClick: {
      type: 'function',
      description: 'Pass a function to be executed on click here'
    }
  }
} satisfies Meta<typeof customButton>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    label: "Custom Button",
    variant: "primary"
  },
} satisfies Story;

export const Loading = {
  args: {
    label: "Custom Button",
    variant: "primary",
    loading: true
  },
} satisfies Story;

export const White = {
  args: {
    label: "Custom Button",
    variant: "white"
  },
} satisfies Story;

export const Plain = {
  args: {
    label: "Custom Button",
    variant: "plain"
  },
} satisfies Story;

export const Glow = {
  args: {
    label: "Custom Button",
    variant: "glow"
  },
} satisfies Story;