"use client";

import React from "react";
import CustomInput from "@/components/atoms/custom-input";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  joinedDate: string;
}

const Sellers = () => {
  const users: User[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "seller",
      status: "Active",
      joinedDate: "2024-01-01",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "buyer",
      status: "Active",
      joinedDate: "2024-02-15",
    },
  ];

  const columns = [
    {
      header: "Name",
      accessorKey: "firstName",
      cell: ({ row }: { row: any }) => {
        return (
          <Text variant="ps" classNames="text-black">
            {row.original.firstName} {row.original.lastName}
          </Text>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: { row: any }) => {
        return (
          <Text variant="ps" classNames="text-black">
            {row.original.role === "seller"
              ? "Supplier"
              : row.original.role === "buyer"
              ? "Trader"
              : "Transporter"}
          </Text>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Joined Date",
      accessorKey: "joinedDate",
    },
  ];

  const handleNextPage = () => {
    console.log("Next page");
  };

  const handlePreviousPage = () => {
    console.log("Previous page");
  };

  const emptyStateMessage = {
    title: "No Users Found",
    message: "There are no users to display at the moment.",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Records</h1>

      <div className="flex flex-wrap items-center gap-4">
        <Text variant="pm" classNames="text-gray-500 flex items-center gap-2">
          <FilterIcon className="w-4 h-4" />
          Filter by:
        </Text>
        <CustomInput
          placeholder="Search for user"
          value={""}
          className="max-w-[320px] h-10"
          name="search"
        />
        <CustomSelect
          name="role"
          options={[
            {
              label: "Supplier",
              value: "seller",
            },
            {
              label: "Transporter",
              value: "transporter",
            },
            {
              label: "Buyer",
              value: "trader",
            },
          ]}
          height="40px"
          classNames="max-w-[320px]"
          {...{
            placeholder: "Select role",
          }}
          multiple
        />
        <CustomSelect
          name="role"
          options={[
            {
              label: "Active",
              value: "active",
            },
            {
              label: "Inactive",
              value: "inactive",
            },
          ]}
          height="40px"
          classNames="max-w-[320px]"
          {...{
            placeholder: "Select status",
          }}
        />
      </div>

      <CustomTable
        columns={columns}
        data={users}
        emptyState={emptyStateMessage}
      />

      <CustomPagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default Sellers;
