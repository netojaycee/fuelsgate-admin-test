import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from ".";

const meta = {
  title: 'Components/Header',
  component: Heading,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: 'string',
      control: 'select',
      description: 'Different header types available on the system',
      options: ["dl", "ds", "h1", "h2", "h3", "h4", "h5", "h6"]
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
} satisfies Meta<typeof Heading>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    variant: 'dl',
    children: 'Base'
  },
} satisfies Story;

export const DL = {
  args: {
    variant: 'dl',
    children: 'Heading DL'
  },
} satisfies Story;

export const DSRegular = {
  args: {
    variant: 'ds',
    children: 'Heading DS Regular',
    fontWeight: 'regular'
  },
} satisfies Story;

export const H1Bold = {
  args: {
    variant: 'h1',
    children: 'Heading H1 Bold',
    fontWeight: 'bold'
  },
} satisfies Story;

export const H2SemiboldRed = {
  args: {
    variant: 'h2',
    children: 'Heading H2 Semibold',
    fontWeight: 'semibold',
    color: 'text-red-500'
  },
} satisfies Story;

export const H3Medium = {
  args: {
    variant: 'h3',
    children: 'Heading H3 Medium',
    fontWeight: 'medium'
  },
} satisfies Story;

export const H4 = {
  args: {
    variant: 'h4',
    children: 'Heading H4'
  },
} satisfies Story;

export const H5 = {
  args: {
    variant: 'h5',
    children: 'Heading H5'
  },
} satisfies Story;

export const H6 = {
  args: {
    variant: 'h6',
    children: 'Heading H6'
  },
} satisfies Story;