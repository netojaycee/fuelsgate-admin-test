"use client";
import React, { useEffect, useState } from "react";
import usePricingHook from "@/hooks/usePricing.hook";
import { CustomTable } from "@/components/organism/custom-table";
import { Text } from "@/components/atoms/text";
import { formatNumber } from "@/utils/formatNumber";
import CustomPagination from "@/components/molecules/CustomPagination";
import { formatDate } from "@/utils/formatDate";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/atoms/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import CustomButton from "@/components/atoms/custom-button";
import ProductRenderer from "@/components/atoms/product-renderer";

const pricingColumns = [
  {
    header: "Product",
    accessorKey: "productId",
    cell: ({ row }: { row: any }) => {
      return <ProductRenderer product={row.original?.productId} />;
    },
  },
  {
    header: "Depot Hub",
    accessorKey: "depotHub",
    cell: ({ row }: { row: any }) => {
      return <Text variant="ps">{row.original?.depotHubId?.name}</Text>;
    },
  },
  {
    header: "Depot",
    accessorKey: "depot",
  },
  {
    header: "Active Status",
    accessorKey: "activeStatus",
    cell: ({ row }: { row: any }) => {
      return (
        <ToggleActiveSwitch
          activeStatus={row.original?.activeStatus}
          id={row.original?._id}
        />
      );
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }: { row: any }) => {
      return (
        <Text variant="ps">&#8358;{formatNumber(row.original?.price)}</Text>
      );
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }: { row: any }) => {
      return <Text variant="ps">{formatDate(row.original?.createdAt)}</Text>;
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: { row: any }) => {
      return <DeletePricing id={row.original?._id} />;
    },
  },
];

const DeletePricing = ({ id }: { id: string }) => {
  const { useDeletePricing } = usePricingHook();
  const { mutate: deletePricing, isPending } = useDeletePricing(id);

  return (
    <CustomButton
      disabled={isPending}
      onClick={() => deletePricing()}
      variant="white"
      height="h-[30px]"
      width="w-[30px]"
      classNames="rounded"
      leftIcon={<Trash2 className="w-4 h-4" />}
    />
  );
};

const ToggleActiveSwitch = ({
  activeStatus,
  id,
}: {
  activeStatus: boolean;
  id: string;
}) => {
  const [isActive, setIsActive] = useState(activeStatus);
  const { useUpdatePricingStatus } = usePricingHook();
  const { mutate: updatePricingStatus, isPending } = useUpdatePricingStatus(id);

  return (
    <Switch
      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
      checked={isActive}
      disabled={isPending}
      onCheckedChange={() => {
        setIsActive(!isActive);
        updatePricingStatus({ activeStatus: !isActive });
      }}
    />
  );
};

const page = () => {
  const [page, setPage] = useState(1);
  const { useFetchPricing } = usePricingHook();
  const {
    data: pricingData,
    isLoading: fetchingPricing,
    refetch,
  } = useFetchPricing(`?page=${page}&limit=10`);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handleNextPage = () => {
    setPage(
      pricingData?.data?.currentPage < pricingData?.data?.totalPages
        ? pricingData?.data?.currentPage + 1
        : pricingData?.data?.currentPage
    );
  };

  const handlePreviousPage = () => {
    setPage(
      pricingData?.data?.currentPage > 1
        ? pricingData?.data?.currentPage - 1
        : pricingData?.data?.currentPage
    );
  };

  return (
    <>
      <CustomTable
        columns={pricingColumns}
        data={pricingData?.data?.pricings}
        loading={fetchingPricing}
      />
      <CustomPagination
        {...{
          handleNextPage,
          handlePreviousPage,
        }}
      />
    </>
  );
};

export default page;
