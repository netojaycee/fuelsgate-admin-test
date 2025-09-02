"use client";

import React, { useState, useMemo } from "react";
import { CustomSelect } from "@/components/atoms/custom-select";
import CustomInput from "@/components/atoms/custom-input";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { FilterIcon, Eye, Loader2, Trash2, Ticket } from "lucide-react";
import TicketViewDrawer from "@/components/features/truck-orders/ticket-view-drawer";
import { TruckOrderDto } from "@/types/truck-order.types";
import { formatDate } from "@/utils/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useOrderHook from "@/hooks/useOrder.hook";

const TruckOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<TruckOrderDto | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false);
  const [selectedTicketTruckOrderId, setSelectedTicketTruckOrderId] = useState<
    string | null
  >(null);

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
  const { useFetchOrders, useDeleteOrder } = useOrderHook();
  const { data, isLoading } = useFetchOrders(queryParams);
  const deleteOrderMutation = useDeleteOrder && useDeleteOrder();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  console.log(data, "faa");
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
      header: "Truck",
      accessorKey: "truckId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {typeof row.original.truckId === "object"
            ? row.original?.truckId?.truckNumber
            : row.original.truckId || "N/A"}
        </Text>
      ),
    },
    {
      header: "Buyer",
      accessorKey: "buyerId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {typeof row.original?.buyerId === "object"
            ? row.original.buyerId?.userId?.firstName +
              " " +
              row.original.buyerId?.userId?.lastName
            : row.original.userId.buyerId}
        </Text>
      ),
    },
    {
      header: "Seller",
      accessorKey: "profileId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {typeof row.original?.profileId === "object"
            ? row.original.profileId?.companyName
            : row.original.userId.profileId}
        </Text>
      ),
    },
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
          ₦{row.original.price?.toLocaleString()}
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
        <>
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
          <Button
            size='sm'
            variant='ghost'
            onClick={() => {
              setSelectedTicketTruckOrderId(row.original._id);
              setTicketDrawerOpen(true);
            }}
          >
            <Ticket className='w-4 h-4 mr-1 text-primary' /> View Ticket
          </Button>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => {
              setSelectedOrder(row.original);
              setDeleteDialogOpen(true);
            }}
            disabled={deleteOrderMutation?.isPending}
          >
            {deleteOrderMutation?.isPending &&
            selectedOrder?._id === row.original._id ? (
              <Loader2 className='animate-spin w-4 h-4 mr-1' />
            ) : (
              <Trash2 className='w-4 h-4 mr-1' />
            )}
            Delete
          </Button>
        </>
      ),
    },
  ];

  const emptyStateMessage = {
    title: "No Truck Orders Found",
    message: "There are no truck orders to display at the moment.",
  };

  // Pagination handlers
  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= (data?.data?.totalPages || 1)) setPage(nextPage);
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

  const handleDeleteTruckOrder = async () => {
    if (!selectedOrder?._id) return;
    try {
      await deleteOrderMutation.mutateAsync(selectedOrder._id);
      setDeleteDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      // Optionally show toast
      setDeleteDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Truck Order Records</h1>
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
          data={data?.data?.order || []}
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
            <DialogTitle>Truck Order Details</DialogTitle>
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
                Truck:{" "}
                {selectedOrder.truckId &&
                typeof selectedOrder.truckId === "object"
                  ? selectedOrder.truckId.truckNumber
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Buyer:{" "}
                {selectedOrder.buyerId &&
                typeof selectedOrder.buyerId === "object" &&
                selectedOrder.buyerId.userId &&
                typeof selectedOrder.buyerId.userId === "object"
                  ? `${selectedOrder.buyerId.userId.firstName ?? ""} ${
                      selectedOrder.buyerId.userId.lastName ?? ""
                    }`
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Buyer Email:{" "}
                {typeof selectedOrder.buyerId === "object" &&
                typeof selectedOrder.buyerId.userId === "object" &&
                "email" in selectedOrder.buyerId.userId
                  ? selectedOrder.buyerId.userId.email
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Buyer Category:{" "}
                {typeof selectedOrder.buyerId === "object" &&
                selectedOrder.buyerId?.category
                  ? selectedOrder.buyerId.category
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "companyName" in selectedOrder.profileId
                  ? selectedOrder.profileId.companyName
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Email:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "companyEmail" in selectedOrder.profileId
                  ? selectedOrder.profileId.companyEmail
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Phone:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "phoneNumber" in selectedOrder.profileId
                  ? selectedOrder.profileId.phoneNumber
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Address:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "companyAddress" in selectedOrder.profileId
                  ? selectedOrder.profileId.companyAddress
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Contact:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "userId" in selectedOrder.profileId
                  ? typeof selectedOrder.profileId.userId === "object"
                    ? `${selectedOrder.profileId.userId.firstName ?? ""} ${
                        selectedOrder.profileId.userId.lastName ?? ""
                      }`
                    : "N/A"
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Contact Email:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "userId" in selectedOrder.profileId &&
                typeof selectedOrder.profileId.userId === "object" &&
                "email" in selectedOrder.profileId.userId
                  ? selectedOrder.profileId.userId.email
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Seller Contact Status:{" "}
                {typeof selectedOrder.profileId === "object" &&
                "userId" in selectedOrder.profileId &&
                typeof selectedOrder.profileId.userId === "object" &&
                "status" in selectedOrder.profileId.userId
                  ? selectedOrder.profileId.userId.status
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Destination: {selectedOrder.destination ?? "N/A"}
              </Text>
              <Text variant='ps'>
                Depot: {selectedOrder.loadingDepot ?? "N/A"}
              </Text>
              <Text variant='ps'>State: {selectedOrder.state ?? "N/A"}</Text>
              <Text variant='ps'>City: {selectedOrder.city ?? "N/A"}</Text>
              <Text variant='ps'>
                Loading Date:{" "}
                {selectedOrder.loadingDate
                  ? formatDate(
                      typeof selectedOrder.loadingDate === "string"
                        ? selectedOrder.loadingDate
                        : selectedOrder.loadingDate.toISOString()
                    )
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                Arrival Time:{" "}
                {selectedOrder.arrivalTime
                  ? formatDate(
                      typeof selectedOrder.arrivalTime === "string"
                        ? selectedOrder.arrivalTime
                        : selectedOrder.arrivalTime.toISOString()
                    )
                  : "N/A"}
              </Text>
              <Text variant='ps'>
                RFQ Status:{" "}
                <span className='capitalize'>
                  {selectedOrder.rfqStatus ?? "N/A"}
                </span>
              </Text>
              {/* <Text variant='ps'>
                Rated: {selectedOrder.isRated ? "Yes" : "No"}
              </Text> */}
              <Text variant='ps'>
                Created:{" "}
                {selectedOrder.createdAt
                  ? formatDate(
                      typeof selectedOrder.createdAt === "string"
                        ? selectedOrder.createdAt
                        : selectedOrder.createdAt.toISOString()
                    )
                  : "N/A"}
              </Text>
              {/* <Text variant='ps'>
                Updated:{" "}
                {selectedOrder.updatedAt
                  ? formatDate(selectedOrder.updatedAt)
                  : "N/A"}
              </Text> */}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTruckOrder}
              disabled={deleteOrderMutation?.isPending}
            >
              {deleteOrderMutation?.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Ticket Drawer */}
      <TicketViewDrawer
        truckOrderId={selectedTicketTruckOrderId}
        open={ticketDrawerOpen}
        onClose={() => {
          setTicketDrawerOpen(false);
          setSelectedTicketTruckOrderId(null);
        }}
      />
    </div>
  );
};

export default TruckOrders;
