import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Text } from "./text";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">
            <Text>Invoice</Text>
          </TableHead>
          <TableHead>
            <Text>Status</Text>
          </TableHead>
          <TableHead>
            <Text>Method</Text>
          </TableHead>
          <TableHead className="text-right">
            <Text>Amount</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              <Text>{invoice.invoice}</Text>
            </TableCell>
            <TableCell>
              <Text>{invoice.paymentStatus}</Text>
            </TableCell>
            <TableCell>
              <Text>{invoice.paymentMethod}</Text>
            </TableCell>
            <TableCell className="text-right">
              <Text>{invoice.totalAmount}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Text>Name</Text>
          </TableHead>
          <TableHead>
            <Text>Email</Text>
          </TableHead>
          <TableHead className="text-right">
            <Text>Amount</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>John Doe</Text>
          </TableCell>
          <TableCell>
            <Text>john@example.com</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text>$250.00</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>Jane Smith</Text>
          </TableCell>
          <TableCell>
            <Text>jane@example.com</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text>$150.00</Text>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <Text className="font-medium">Total</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text className="font-medium">$400.00</Text>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Text>Product</Text>
          </TableHead>
          <TableHead>
            <Text>Price</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>Apple</Text>
          </TableCell>
          <TableCell>
            <Text>$1.00</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>Banana</Text>
          </TableCell>
          <TableCell>
            <Text>$0.50</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>Orange</Text>
          </TableCell>
          <TableCell>
            <Text>$0.75</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
