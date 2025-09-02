"use client";
import React, { useState, useMemo } from "react";
import { CustomSelect } from "@/components/atoms/custom-select";
import CustomInput from "@/components/atoms/custom-input";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { FilterIcon, Eye } from "lucide-react";
import { ProductOrderDto } from "@/types/product-order.types";
import useProductOrderHook from "@/hooks/useProductOrder.hook";
import { formatDate } from "@/utils/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ProductOrderDto | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Query params for API
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("trackingId", searchTerm);
    if (selectedStatus.length > 0)
      params.append("status", selectedStatus.join(","));
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    return params.toString() ? "?" + params.toString() : "";
  }, [searchTerm, selectedStatus, page, limit]);

  // Data fetching
  const { useFetchProductOrdersAdmin } = useProductOrderHook();
  const { data, isLoading } = useFetchProductOrdersAdmin(queryParams);

  console.log("Product Orders Data:", data);
  // Table columns
  const columns = [
    {
      header: "Tracking ID",
      accessorKey: "trackingId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black font-mono'>
          {row.original.trackingId}
        </Text>
      ),
    },
    {
      header: "Product",
      accessorKey: "productUploadId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.productUploadId?.productId?.name ?? "N/A"}
        </Text>
      ),
    },
    {
      header: "Buyer",
      accessorKey: "buyerId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.buyerId?.userId?.firstName ?? ""}{" "}
          {row.original.buyerId?.userId?.lastName ?? ""}
        </Text>
      ),
    },
    // {
    //   header: "Seller",
    //   accessorKey: "sellerId",
    //   cell: ({ row }: { row: any }) => (
    //     <Text variant='ps' classNames='text-black'>
    //       {row.original.sellerId?.userId?.firstName ?? ""}{" "}
    //       {row.original.sellerId?.userId?.lastName ?? ""}
    //     </Text>
    //   ),
    // },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black capitalize'>
          {row.original.status}
        </Text>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          ₦{row.original.price?.toLocaleString() ?? "N/A"}
        </Text>
      ),
    },
    {
      header: "Volume",
      accessorKey: "volume",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.volume ?? "N/A"}{" "}
          {row.original.productUploadId?.productId?.unit ?? ""}
        </Text>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-gray-600'>
          {formatDate(row.original.createdAt)}
        </Text>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => (
        <Button
          size='sm'
          variant='ghost'
          onClick={() => {
            setSelectedOrder(row.original);
            setViewDialogOpen(true);
          }}
        >
          <Eye className='w-4 h-4' /> View
        </Button>
      ),
    },
  ];

  const emptyStateMessage = {
    title: "No Product Orders Found",
    message: "There are no product orders to display at the moment.",
  };

  // Pagination handlers
  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= (data?.totalPages || 1)) setPage(nextPage);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Status options for filter
  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Product Order Records</h1>
      <div className='flex flex-wrap items-center gap-4 mb-6'>
        <Text variant='pm' classNames='text-gray-500 flex items-center gap-2'>
          <FilterIcon className='w-4 h-4' /> Filter by:
        </Text>
        <CustomSelect
          name='status'
          options={statusOptions}
          value={
            selectedStatus
              .map((status) =>
                statusOptions.find((opt) => opt.value === status)
              )
              .filter(Boolean) as any
          }
          onChange={(selected: any) => {
            if (Array.isArray(selected)) {
              setSelectedStatus(selected.map((item: any) => item.value));
            } else {
              setSelectedStatus(selected ? [selected.value] : []);
            }
            setPage(1);
          }}
          multiple
          height='40px'
          classNames='max-w-[220px]'
          label='Status'
        />
        <CustomInput
          placeholder='Search by Tracking ID'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className='max-w-[220px] h-10 mt-5'
          name='trackingId'
        />
      </div>
      <div className='bg-white rounded-lg border'>
        <CustomTable
          columns={columns}
          data={data?.orders || []}
          loading={isLoading}
          emptyState={emptyStateMessage}
        />
      </div>
      <CustomPagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      {/* Order Details Drawer/Modal */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Product Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className='space-y-3'>
              <Text variant='ps' classNames='font-bold'>
                Tracking ID:{" "}
                <span className='font-mono'>{selectedOrder.trackingId}</span>
              </Text>
              <Text variant='ps'>
                Status:{" "}
                <span className='capitalize'>{selectedOrder.status}</span>
              </Text>
              <Text variant='ps'>
                Price: ₦{selectedOrder.price?.toLocaleString() ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Volume: {selectedOrder.volume ?? "N/A"}{" "}
                {selectedOrder.productUploadId?.productId?.unit ?? ""}
              </Text>
              <Text variant='ps'>
                Product:{" "}
                {selectedOrder.productUploadId?.productId?.name ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Buyer Name: {selectedOrder.buyerId?.userId?.firstName ?? ""}{" "}
                {selectedOrder.buyerId?.userId?.lastName ?? ""}
              </Text>
              <Text variant='ps'>
                Buyer Email: {selectedOrder.buyerId?.userId?.email ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Buyer Category: {selectedOrder.buyerId?.category ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Name: 
                {typeof selectedOrder.sellerId?.userId === "object"
                  ? `${selectedOrder.sellerId?.userId?.firstName ?? ""} ${selectedOrder.sellerId?.userId?.lastName ?? ""}`
                  : ""}
              </Text>
              <Text variant='ps'>
                Seller Email: {typeof selectedOrder.sellerId?.userId === "object" && selectedOrder.sellerId?.userId?.email ? selectedOrder.sellerId.userId.email : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Status: {typeof selectedOrder.sellerId?.userId === "object" && selectedOrder.sellerId?.userId?.status ? selectedOrder.sellerId.userId.status : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Category: {selectedOrder.sellerId?.category ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Business Name:{" "}
                {selectedOrder.sellerId?.businessName ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Depot Name: {selectedOrder.sellerId?.depotName ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Phone: {selectedOrder.sellerId?.phoneNumber ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Office Address:{" "}
                {selectedOrder.sellerId?.officeAddress ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Depot: {selectedOrder.productUploadId?.depot ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Volume (from upload):{" "}
                {selectedOrder.productUploadId?.volume ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Price (from upload): ₦
                {selectedOrder.productUploadId?.price?.toLocaleString() ??
                  "N/A"}
              </Text>
              <Text variant='ps'>
                Product Quality:{" "}
                {selectedOrder.productUploadId?.productQuality ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Product Upload Status:{" "}
                {selectedOrder.productUploadId?.status ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Expires In:{" "}
                {selectedOrder.expiresIn
                  ? formatDate(selectedOrder.expiresIn)
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Created:{" "}
                {selectedOrder.createdAt
                  ? formatDate(selectedOrder.createdAt)
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Updated:{" "}
                {selectedOrder.updatedAt
                  ? formatDate(selectedOrder.updatedAt)
                  : "N/A"}
              </Text>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductOrders;
