"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Settings, Search } from "lucide-react";
import { Text } from "@/components/atoms/text";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import CustomInput from "@/components/atoms/custom-input";
import CustomPagination from "@/components/molecules/CustomPagination";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/utils/formatDate";
import usePlatformConfigHook from "@/hooks/usePlatformConfig.hook";
import PlatformConfigForm from "@/components/features/platform-config/platform-config-form";
import ServiceFeesForm from "@/components/features/platform-config/service-fees-form";
import {
  CreatePlatformConfigDto,
  PlatformConfigDto,
  ServiceFeeConfig,
  UpdatePlatformConfigDto,
} from "@/types/platform-config.types";
import { Badge } from "@/components/ui/badge";

const PlatformConfig = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"configs" | "service-fees">(
    "configs"
  );
  const [selectedConfig, setSelectedConfig] =
    useState<PlatformConfigDto | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isServiceFeesModalOpen, setIsServiceFeesModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const limit = 10;

  // Platform Config hooks
  const {
    useFetchPlatformConfigs,
    useCreatePlatformConfig,
    useUpdatePlatformConfig,
    useDeletePlatformConfig,
    useFetchServiceFees,
    useUpdateServiceFees,
  } = usePlatformConfigHook();

  // Fetch data
  const { data: configsData, isLoading: loadingConfigs } =
    useFetchPlatformConfigs({
      page,
      limit,
      key: searchTerm || undefined,
    });

  const { data: serviceFeesData, isLoading: loadingServiceFees } =
    useFetchServiceFees();

  // Mutations
  const createConfigMutation = useCreatePlatformConfig();
  const updateConfigMutation = useUpdatePlatformConfig();
  const deleteConfigMutation = useDeletePlatformConfig();
  const updateServiceFeesMutation = useUpdateServiceFees();

  // Event handlers
  const handleTabChange = (value: string) => {
    setActiveTab(value as "configs" | "service-fees");
  };

  const handleCreateConfig = async (data: CreatePlatformConfigDto) => {
    try {
      await createConfigMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create config:", error);
    }
  };

  const handleUpdateConfig = async (data: UpdatePlatformConfigDto) => {
    if (!selectedConfig) return;

    try {
      await updateConfigMutation.mutateAsync({
        key: selectedConfig.key,
        data,
      });
      setIsEditModalOpen(false);
      setSelectedConfig(null);
    } catch (error) {
      console.error("Failed to update config:", error);
    }
  };

  const handleDeleteConfig = (config: PlatformConfigDto) => {
    setSelectedConfig(config);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedConfig) return;

    try {
      await deleteConfigMutation.mutateAsync(selectedConfig.key);
      setDeleteDialogOpen(false);
      setSelectedConfig(null);
    } catch (error) {
      console.error("Failed to delete config:", error);
    }
  };

  const handleUpdateServiceFees = async (data: ServiceFeeConfig) => {
    try {
      await updateServiceFeesMutation.mutateAsync(data);
      setIsServiceFeesModalOpen(false);
    } catch (error) {
      console.error("Failed to update service fees:", error);
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= Math.ceil((configsData?.total || 0) / limit)) {
      setPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Table columns
  const columns = [
    {
      header: "Key",
      accessorKey: "key",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black font-medium'>
          {row.original.key}
        </Text>
      ),
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black'>
          {row.original.value}%
        </Text>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-gray-600'>
          {row.original.description || "-"}
        </Text>
      ),
    },
    {
      header: "Created At",
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
        const config = row.original as PlatformConfigDto;

        return (
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => {
                setSelectedConfig(config);
                setIsEditModalOpen(true);
              }}
            >
              <Edit className='w-4 h-4' />
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => handleDeleteConfig(config)}
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        );
      },
    },
  ];

  // Service fees info
  const serviceFees = serviceFeesData?.data;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Platform Configuration</h1>
          <Text variant='pm' classNames='text-gray-500 mt-1'>
            Manage platform configuration settings and service fees
          </Text>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        {/* <TabsList className='grid w-full max-w-md grid-cols-1 mb-6'>
          <TabsTrigger value='configs' className='flex items-center gap-2'>
            <Settings className='w-4 h-4' />
            Configurations
          </TabsTrigger>
          <TabsTrigger value='service-fees' className='flex items-center gap-2'>
            <Settings className='w-4 h-4' />
            Service Fees
          </TabsTrigger>
        </TabsList> */}

        <TabsContent value='configs' className='space-y-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              <CustomInput
                placeholder='Search by key'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // Reset to first page on search
                }}
                className='max-w-[320px] h-10'
                name='search'
                // leftIcon={<Search className='h-4 w-4' />}
              />
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Add Configuration
            </Button>
          </div>

          <div className='bg-white rounded-lg border'>
            <CustomTable
              columns={columns}
              data={configsData?.data || []}
              loading={loadingConfigs}
              emptyState={{
                title: "No Configurations",
                message: "There are no platform configurations to display.",
              }}
            />
          </div>

          <CustomPagination
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </TabsContent>

        {/* <TabsContent value='service-fees' className='space-y-4'>
          <div className='bg-white rounded-lg border p-6'>
            {loadingServiceFees ? (
              <div className='flex justify-center items-center h-32'>
                <Text variant='pm' classNames='text-gray-500'>
                  Loading service fees...
                </Text>
              </div>
            ) : serviceFees ? (
              <div className='space-y-6'>
                <div>
                  <Text variant='pl' classNames='text-black font-semibold'>
                    Service Fees
                  </Text>
                  <Text variant='pm' classNames='text-gray-500 mt-1'>
                    Configure the service fees charged to different user types
                    on the platform.
                  </Text>
                </div>

                <div className='grid grid-cols-2 gap-8 mt-6'>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <Text variant='pm' classNames='text-gray-600'>
                      Transporter Service Fee
                    </Text>
                    <Text variant='xl' classNames='text-black font-bold mt-2'>
                      {serviceFees.transporterServiceFee}%
                    </Text>
                  </div>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <Text variant='pm' classNames='text-gray-600'>
                      Trader Service Fee
                    </Text>
                    <Text variant='xl' classNames='text-black font-bold mt-2'>
                      {serviceFees.traderServiceFee}%
                    </Text>
                  </div>
                </div>

                <Button onClick={() => setIsServiceFeesModalOpen(true)}>
                  <Edit className='w-4 h-4 mr-2' />
                  Update Service Fees
                </Button>
              </div>
            ) : (
              <div className='flex justify-center items-center h-32'>
                <Text variant='pm' classNames='text-gray-500'>
                  Error loading service fees
                </Text>
              </div>
            )}
          </div>
        </TabsContent> */}
      </Tabs>

      {/* Create/Edit Platform Config Modal */}
      <Dialog
        open={isCreateModalOpen || isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedConfig(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditModalOpen
                ? "Edit Configuration"
                : "Create New Configuration"}
            </DialogTitle>
          </DialogHeader>
          <PlatformConfigForm
            initialData={selectedConfig || undefined}
            onSubmit={(data) => {
              if (isEditModalOpen) {
                handleUpdateConfig(data as UpdatePlatformConfigDto);
              } else {
                handleCreateConfig(data as CreatePlatformConfigDto);
              }
            }}
            onCancel={() => {
              setIsCreateModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedConfig(null);
            }}
            isLoading={
              createConfigMutation.isPending || updateConfigMutation.isPending
            }
            isEditMode={isEditModalOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Service Fees Modal */}
      <Dialog
        open={isServiceFeesModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsServiceFeesModalOpen(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Service Fees</DialogTitle>
          </DialogHeader>
          <ServiceFeesForm
            initialData={serviceFees}
            onSubmit={handleUpdateServiceFees}
            onCancel={() => setIsServiceFeesModalOpen(false)}
            isLoading={updateServiceFeesMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the configuration with key &quot;
              {selectedConfig?.key}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteConfigMutation.isPending}
            >
              {deleteConfigMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlatformConfig;
