"use client";
import React from "react";
import { Text } from "@/components/atoms/text";
import { CustomTable } from "@/components/organism/custom-table";
import useDepotHubHook from "@/hooks/useDepotHub.hook";

const Depots = () => {
  const { useFetchDepotHubs } = useDepotHubHook();
  const { data, isLoading } = useFetchDepotHubs();

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return (
          <Text variant="ps" classNames="text-black">
            {row.original.name}
          </Text>
        );
      },
    },
    {
      header: "Number of Depots",
      accessorKey: "depots",
      cell: ({ row }: { row: any }) => {
        return (
          <Text variant="ps" classNames="text-black">
            {row.original.depots.length}
          </Text>
        );
      },
    },
    {
      header: "Depots",
      accessorKey: "depots",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="grid grid-cols-5 gap-4 min-w-[800px]">
            {row.original.depots.map((depot: string) => (
              <Text
                variant="ps"
                classNames="text-black flex items-center gap-2"
                key={depot + row.original.depots.length}
              >
                <span className="inline-block shrink-0 bg-gray-500 rounded-full w-2 h-2" />
                {depot}
              </Text>
            ))}
          </div>
        );
      },
    },
  ];

  const emptyStateMessage = {
    title: "No Depots Found",
    message: "There are no depots to display at the moment.",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Depots</h1>

      <CustomTable
        columns={columns}
        data={data?.data}
        loading={isLoading}
        emptyState={emptyStateMessage}
      />
    </div>
  );
};

export default Depots;
