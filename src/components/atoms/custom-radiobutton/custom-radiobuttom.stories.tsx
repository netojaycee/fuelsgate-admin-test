import type { Meta, StoryObj } from "@storybook/react";
import { CustomRadioButton } from ".";
import { RadioGroup } from "@/components/ui/radio-group";

const meta = {
  title: 'Components/Custom Radio Button',
  component: CustomRadioButton,
  decorators: [(story) => <RadioGroup value="male">{story()}</RadioGroup>],
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
      description: "Enter input label here"
    },
    value: {
      type: 'string',
      control: "text",
      description: "Radio button value"
    },
    className: {
      type: 'string',
      control: 'text',
      description: 'Extra classes to style the button'
    },
    wrapperClassName: {
      type: 'string',
      control: 'text',
      description: 'Extra classes to style the button wrapper'
    },
    labelClassName: {
      type: 'string',
      control: 'text',
      description: 'Extra classes to style the button label'
    },
  }
} satisfies Meta<typeof CustomRadioButton>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: "gender",
    label: "Male",
    value: 'male'
  },
} satisfies Story;
