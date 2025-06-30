import type { Meta, StoryObj } from "@storybook/react";
import { CustomTable } from ".";
import { cn } from "@/lib/utils";
// TODO: Properly document this component
const meta = {
  title: 'Components/CustomTable',
  component: CustomTable,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    // email: {},
    // status: {},
    // amount: {},
  }
} satisfies Meta<typeof CustomTable>

export default meta;

type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    columns: [
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
          return <div className={cn("p-1 text-center text-xs rounded-md font-medium bg-yellow-400 text-black")}>{row.getValue("status")}</div>
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }: { row: any }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)

          return <div className="text-right font-medium">{formatted}</div>
        },
      },
    ],
    data: [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
      },
    ]
  },
} satisfies Story;