import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioButtonField } from '.';

const meta = {
  title: 'Components/Radio Button Field',
  component: RadioButtonField,
  decorators: [(story) => <RadioGroup value="male">{story()}</RadioGroup>],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      type: 'string',
      control: 'text',
      description: 'insert a unique name here',
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'Enter input label here',
    },
    value: {
      type: 'string',
      control: 'text',
      description: 'Radio button value',
    },
    className: {
      type: 'string',
      control: 'text',
      description: 'Extra className to style the button',
    },
  },
} satisfies Meta<typeof RadioButtonField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    name: 'gender',
    label: 'Male',
    value: 'male',
  },
} satisfies Story;
