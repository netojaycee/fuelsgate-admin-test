import type { Meta, StoryObj } from "@storybook/react";
import CustomInput from ".";

const meta = {
  title: 'Components/Custom Input',
  component: CustomInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      type: 'string',
      control: "select",
      description: "Select the type of html input",
      options: ['text', 'number', 'password', 'email']
    },
    name: {
      type: 'string',
      control: "text",
      description: "insert a unique name here"
    },
    label: {
      type: 'string',
      control: "text",
      description: "Enter input label here"
    },
    classNames: {
      type: 'string',
      control: 'text',
      description: 'Extra className to style the button'
    },
    affix: {
      type: 'string',
      control: 'text',
      description: 'Add an affix to the input component eg: Ltr .etc'
    },
    prefix: {
      type: 'string',
      control: 'text',
      description: 'Add an prefix to the input component eg: ₦ .etc'
    },
    prefixPadding: {
      type: 'string',
      control: 'text',
      description: 'Adjust the padding left of the input to fit perfectly with the space occupied by the prefix. Use tailwind padding left class eg: pl-3'
    },
    affixPadding: {
      type: 'string',
      control: 'text',
      description: 'Adjust the padding right of the input to fit perfectly with the space occupied by the prefix. Use tailwind padding right class eg: pr-3'
    },
    optional: {
      type: 'boolean',
      control: 'boolean',
      description: 'Use true of false to set if input is optional'
    },
    onChange: {
      type: 'function',
      description: 'Pass a function to be executed on click here'
    },
    register: {
      type: 'function',
      description: 'Pass react form hook register here'
    },
    error: {
      type: 'string',
      control: 'text',
      description: 'Render error messages here'
    },
  }
} satisfies Meta<typeof CustomInput>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: "firstName",
    label: "First Name",
  },
} satisfies Story;

export const Prefix = {
  args: {
    name: "Amount",
    label: "Amount",
    type: "number",
    prefix: "₦",
    prefixPadding: "pl-9"
  },
} satisfies Story;

export const Affix = {
  args: {
    name: "Volume",
    type: "number",
    label: "Volume",
    affix: "Ltre",
    affixPadding: "pr-12"
  },
} satisfies Story;

export const Error = {
  args: {
    name: "firstName",
    label: "First Name",
    error: 'First name is required'
  },
} satisfies Story;

export const Optional = {
  args: {
    name: "address",
    label: "Address",
    optional: true
  },
} satisfies Story;

export const Password = {
  args: {
    name: "password",
    label: "Password",
    type: 'password'
  },
} satisfies Story;