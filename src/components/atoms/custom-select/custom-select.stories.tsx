import type { Meta, StoryObj } from "@storybook/react";
import { CustomSelect } from ".";

const PRODUCTS = [
  { label: "Product 1", value: "product1" },
  { label: "Product 2", value: "product2" },
  { label: "Product 3", value: "product3" },
];

const meta = {
  title: "Components/Custom Select",
  component: CustomSelect,
  decorators: [(story) => <div style={{ width: "300px" }}>{story()}</div>],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      type: "string",
      control: "text",
      description: "insert a unique name here",
    },
    label: {
      type: "string",
      control: "text",
      description: "Enter input label here",
    },
    classNames: {
      type: "string",
      control: "text",
      description: "Extra className to style the button",
    },
    multiple: {
      type: "boolean",
      control: "boolean",
      description:
        "Use true of false to set if select accepts multiple selection",
    },
    options: {
      type: "string",
      control: "text",
      description:
        'Pass options here. It should be an array of this object format => { label: "label", value: "value" }.',
    },
    value: {
      type: "string",
      control: "text",
      description:
        'Enter selected option in this object format => { label: "Label", value: "Value" }',
    },
    error: {
      type: "string",
      control: "text",
      description: "Render error messages here",
    },
    onChange: {
      type: "function",
      description: "Pass a function to be executed on change here",
    },
  },
} satisfies Meta<typeof CustomSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: "products",
    label: "Products",
    options: PRODUCTS,
  },
} satisfies Story;

export const OptionSelected = {
  args: {
    name: "products",
    label: "Products",
    options: PRODUCTS,
    value: PRODUCTS[0],
  },
} satisfies Story;

export const MultiSelect = {
  args: {
    name: "Products",
    label: "Products",
    multiple: true,
    options: PRODUCTS,
  },
} satisfies Story;

export const MultiSelectOptionSelected = {
  args: {
    name: "Products",
    label: "Products",
    multiple: true,
    options: PRODUCTS,
    value: [PRODUCTS[0], PRODUCTS[1]],
  },
} satisfies Story;
