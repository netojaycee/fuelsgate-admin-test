"use client";

import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import CustomInput from "@/components/atoms/custom-input";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import {
  FilterIcon,
  TruckIcon,
  ClockIcon,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TruckDto, CreateTruckDto, UpdateTruckDto } from "@/types/truck.type";
import { ProductDto } from "@/types/product.types";
import { DepotHubDto } from "@/types/depot-hub.types";
import useTruckHook from "@/hooks/useTruck.hook";
import useProductHook from "@/hooks/useProduct.hook";
import useDepotHubHook from "@/hooks/useDepotHub.hook";
import TruckForm from "@/components/features/trucks/truck-form";
import TruckViewDrawer from "@/components/features/trucks/truck-view-drawer";
import { formatDate } from "@/utils/formatDate";

const Trucks = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const limit = 10;

  // State management
  const [activeTab, setActiveTab] = useState<"active" | "pending">("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [selectedDepot, setSelectedDepot] = useState<string[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<TruckDto | null>(null);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Query params for API
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (selectedProduct.length > 0) params.append("productId", selectedProduct.join(","));
    if (selectedDepot.length > 0) params.append("depotHubId", selectedDepot.join(","));

    // Status based on tab
    if (activeTab === "active") {
      params.append("status", "available,locked");
    } else {
      params.append("status", "pending");
    }

    // Pagination
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return params.toString() ? "?" + params.toString() : "";
  }, [searchTerm, selectedProduct, selectedDepot, activeTab, page, limit]);

  // Hooks for data fetching and mutations
  const {
    useFetchTrucks,
    useCreateTruck,
    useUpdateTruck,
    useUpdateTruckStatus,
    useDeleteTruck,
  } = useTruckHook();

  const { data, isLoading } = useFetchTrucks(queryParams);
  const createTruckMutation = useCreateTruck();
  const updateTruckMutation = useUpdateTruck();
  const updateTruckStatusMutation = useUpdateTruckStatus();
  const deleteTruckMutation = useDeleteTruck();


  // Fetch products and depots for filters
  const { useFetchProducts } = useProductHook();
  const { data: productsData, isLoading: loadingProducts } = useFetchProducts();
  const productOptions = useMemo(() => {
    if (!productsData?.data?.products) return [];
    return productsData.data.products.map((product: ProductDto) => ({
      label: product.name,
      value: product._id,
    }));
  }, [productsData]);
  
  const { useFetchDepotHubs } = useDepotHubHook();
  const { data: depotsData, isLoading: loadingDepots } = useFetchDepotHubs();
  const depotOptions = useMemo(() => {
    if (!depotsData?.data) return [];
    return depotsData.data.map((depot: DepotHubDto) => ({
      label: depot.name,
      value: depot._id,
    }));
  }, [depotsData]);
  console.log(depotsData, "GGg", data);

  const getStatusBadge = (status: TruckDto['status']) => {
    const styles: Record<TruckDto['status'], string> = {
      available: "bg-green-100 text-green-800",
      locked: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Event Handlers
  const handleTabChange = (value: string) => {
    setActiveTab(value as "active" | "pending");
    setPage(1); // Reset to first page on tab change
  };

  const handleViewTruck = (truck: TruckDto) => {
    setSelectedTruck(truck);
    setViewDrawerOpen(true);
  };

  const handleEditTruck = (truck: TruckDto) => {
    setSelectedTruck(truck);
    setIsEditModalOpen(true);
  };

  const handleDeleteTruck = (truck: TruckDto) => {
    setSelectedTruck(truck);
    setDeleteDialogOpen(true);
  };

  const handleCopyTruckInfo = async (truck: TruckDto) => {
    const product = truck.productId as ProductDto;
    const info = `Truck Number: ${truck.truckNumber}\nProduct: ${product.name}\nDepot: ${truck.depot}\nCapacity: ${truck.capacity} Litres`;
    await navigator.clipboard.writeText(info);
    toast({
      title: "Success",
      description: "Truck information copied to clipboard",
    });
  };

  const handleToggleStatus = async (truck: TruckDto) => {
    try {
      let newStatus: "available" | "locked";
      if (truck.status === "pending" || truck.status === "locked") {
        newStatus = "available";
      } else {
        newStatus = "locked";
      }

      await updateTruckStatusMutation.mutateAsync({
        truckId: truck._id!,
        status: newStatus,
      });

      toast({
        title: "Success",
        description: `Truck ${newStatus === "available" ? "activated" : "locked"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update truck status",
        variant: "error",
      });
    }
  };

  const handleCreateTruck = async (truckData: CreateTruckDto | UpdateTruckDto) => {
    try {
      await createTruckMutation.mutateAsync(truckData as CreateTruckDto);
      toast({
        title: "Success",
        description: "Truck created successfully",
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create truck",
        variant: "error",
      });
    }
  };

  const handleUpdateTruck = async (truckData: CreateTruckDto | UpdateTruckDto) => {
    if (!selectedTruck?._id) return;

    try {
      await updateTruckMutation.mutateAsync({
        truckId: selectedTruck._id,
        truckData: truckData as UpdateTruckDto,
      });
      toast({
        title: "Success",
        description: "Truck updated successfully",
      });
      setIsEditModalOpen(false);
      setSelectedTruck(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update truck",
        variant: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTruck?._id) return;

    try {
      await deleteTruckMutation.mutateAsync(selectedTruck._id);
      toast({
        title: "Success",
        description: "Truck deleted successfully",
      });
      setDeleteDialogOpen(false);
      setSelectedTruck(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete truck",
        variant: "error",
      });
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= Math.ceil((data?.total || 0) / limit)) {
      setPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const columns = [
    {
      header: "Truck Number",
      accessorKey: "truckNumber",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.truckNumber}
        </Text>
      ),
    },
    {
      header: "Product",
      accessorKey: "productId",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {(row.original.productId as ProductDto).name}
        </Text>
      ),
    },
    {
      header: "Depot",
      accessorKey: "depot",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.depot}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => getStatusBadge(row.original.status),
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.capacity.toLocaleString()} Litres
        </Text>
      ),
    },
    {
      header: "Registration Date",
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
      cell: ({ row }: { row: any }) => {
        const truck = row.original as TruckDto;

        return (
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => handleViewTruck(truck)}
            >
              View
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => handleEditTruck(truck)}
            >
              <Edit className='w-4 h-4' />
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => handleDeleteTruck(truck)}
            >
              <Trash2 className='w-4 h-4' />
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => handleCopyTruckInfo(truck)}
            >
              <Copy className='w-4 h-4' />
            </Button>
            {truck.status === "pending" ? (
              <Button
                size='sm'
                className='flex items-center gap-1'
                onClick={() => handleToggleStatus(truck)}
              >
                <CheckCircle className='w-4 h-4' />
                Activate
              </Button>
            ) : (
              <Button
                size='sm'
                variant='outline'
                className='flex items-center gap-1'
                onClick={() => handleToggleStatus(truck)}
              >
                {truck.status === "available" ? (
                  <XCircle className='w-4 h-4' />
                ) : (
                  <CheckCircle className='w-4 h-4' />
                )}
                {truck.status === "available" ? "Lock" : "Unlock"}
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const emptyStateMessage = {
    title: activeTab === "pending" ? "No Pending Trucks" : "No Active Trucks",
    message:
      activeTab === "pending"
        ? "There are no trucks pending approval at the moment."
        : "There are no active trucks to display at the moment.",
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Trucks Management</h1>
          <Text variant='pm' classNames='text-gray-500 mt-1'>
            Manage truck registrations and approvals
          </Text>
        </div>
        {/* <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Add Truck
        </Button> */}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='grid w-full max-w-md grid-cols-2 mb-6'>
          <TabsTrigger value='active' className='flex items-center gap-2'>
            <TruckIcon className='w-4 h-4' />
            Active Trucks
          </TabsTrigger>
          <TabsTrigger value='pending' className='flex items-center gap-2'>
            <ClockIcon className='w-4 h-4' />
            Pending Approval
          </TabsTrigger>
        </TabsList>

        <div className='flex flex-wrap gap-4 mb-6'>
          <div className="flex items-center gap-4">
            <Text variant='pm' classNames='text-gray-500 flex items-center gap-2'>
              <FilterIcon className='w-4 h-4' />
              Filter by:
            </Text>
            <CustomInput
              placeholder='Search by truck number'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page on search
              }}
              className='max-w-[320px] h-10'
              name='search'
            />
          </div>
          <div className="flex items-center gap-4">
            <CustomSelect
              name='product'
              options={productOptions}
              value={selectedProduct
                .map((product) => productOptions.find((opt: any) => opt.value === product))
                .filter(Boolean) as any}
              onChange={(selected: any) => {
                if (Array.isArray(selected)) {
                  setSelectedProduct(selected.map((item: any) => item.value));
                } else {
                  setSelectedProduct(selected ? [selected.value] : []);
                }
                setPage(1); // Reset to first page on filter change
              }}
              isDisabled={loadingProducts}
              height='40px'
              classNames='w-[320px]'
              multiple
              label="Select products"
            />
            <CustomSelect
              name='depot'
              options={depotOptions}
              value={selectedDepot
                .map((depot) => depotOptions.find((opt: any) => opt.value === depot))
                .filter(Boolean) as any}
              onChange={(selected: any) => {
                if (Array.isArray(selected)) {
                  setSelectedDepot(selected.map((item: any) => item.value));
                } else {
                  setSelectedDepot(selected ? [selected.value] : []);
                }
                setPage(1); // Reset to first page on filter change
              }}
              isDisabled={loadingDepots}
              height='40px'
              classNames='w-[320px]'
              multiple
              label="Select hubs"
            />
          </div>
        </div>

        <TabsContent value='active' className='space-y-4'>
          <div className='bg-white rounded-lg border'>
            <CustomTable
              columns={columns}
              data={data?.data?.trucks || []}
              loading={isLoading}
              emptyState={emptyStateMessage}
            />
          </div>
        </TabsContent>

        <TabsContent value='pending' className='space-y-4'>
          <div className='bg-white rounded-lg border'>
            <CustomTable
              columns={columns}
              data={data?.data?.trucks || []}
              loading={isLoading}
              emptyState={emptyStateMessage}
            />
          </div>
        </TabsContent>
      </Tabs>

      <CustomPagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {/* Create/Edit Truck Modal */}
      <Dialog
        open={isCreateModalOpen || isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedTruck(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditModalOpen ? "Edit Truck" : "Create New Truck"}
            </DialogTitle>
          </DialogHeader>
          <TruckForm
            initialData={selectedTruck || undefined}
            onSubmit={isEditModalOpen ? handleUpdateTruck : handleCreateTruck}
            onCancel={() => {
              setIsCreateModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedTruck(null);
            }}
            isLoading={createTruckMutation.isPending || updateTruckMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* View Truck Details */}
      <TruckViewDrawer
        truck={selectedTruck}
        isOpen={viewDrawerOpen}
        onClose={() => {
          setViewDrawerOpen(false);
          setSelectedTruck(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Truck</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this truck? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteTruckMutation.isPending}
            >
              {deleteTruckMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Trucks;
