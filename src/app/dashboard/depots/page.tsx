"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Text } from "@/components/atoms/text";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import useDepotHubHook from "@/hooks/useDepotHub.hook";
import {
  DepotHubDto,
  CreateDepotHubDto,
  UpdateDepotHubDto,
} from "@/types/depot-hub.types";
import DepotHubForm from "@/components/features/depots/depot-hub-form";
import DepotHubViewDrawer from "@/components/features/depots/depot-hub-view-drawer";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { TableActions } from "@/components/common/table-actions";
import { useToast } from "@/components/ui/use-toast";

const Depots = () => {
  const { toast } = useToast();
  const {
    useFetchDepotHubs,
    useCreateDepotHub,
    useUpdateDepotHub,
    useDeleteDepotHub,
  } = useDepotHubHook();

  const { data, isLoading } = useFetchDepotHubs();
  const createDepotHubMutation = useCreateDepotHub();
  const updateDepotHubMutation = useUpdateDepotHub();
  const deleteDepotHubMutation = useDeleteDepotHub();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepotHub, setSelectedDepotHub] = useState<DepotHubDto | null>(
    null
  );

  const handleCreateDepotHub = async (depotHubData: CreateDepotHubDto) => {
    try {
      await createDepotHubMutation.mutateAsync(depotHubData);
      toast({
        title: "Success",
        description: "Depot hub created successfully",
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create depot hub",
        variant: "error",
      });
    }
  };

  const handleUpdateDepotHub = async (depotHubData: UpdateDepotHubDto) => {
    if (!selectedDepotHub) return;

    try {
      await updateDepotHubMutation.mutateAsync({
        depotHubId: selectedDepotHub._id,
        depotHubData,
      });
      toast({
        title: "Success",
        description: "Depot hub updated successfully",
      });
      setIsEditModalOpen(false);
      setSelectedDepotHub(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update depot hub",
        variant: "error",
      });
    }
  };

  const handleDeleteDepotHub = async () => {
    if (!selectedDepotHub) return;

    try {
      await deleteDepotHubMutation.mutateAsync(selectedDepotHub._id);
      toast({
        title: "Success",
        description: "Depot hub deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedDepotHub(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete depot hub",
        variant: "error",
      });
    }
  };

  const handleViewDepotHub = (depotHub: DepotHubDto) => {
    setSelectedDepotHub(depotHub);
    setIsViewDrawerOpen(true);
  };

  const handleEditDepotHub = (depotHub: DepotHubDto) => {
    setSelectedDepotHub(depotHub);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (depotHub: DepotHubDto) => {
    setSelectedDepotHub(depotHub);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return (
          <Text variant='ps' classNames='text-black font-medium'>
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
          <Badge variant='outline' className='bg-blue-50 text-blue-700'>
            {row.original.depots.length}{" "}
            {row.original.depots.length === 1 ? "Depot" : "Depots"}
          </Badge>
        );
      },
    },
    {
      header: "Depots Preview",
      accessorKey: "depots",
      cell: ({ row }: { row: any }) => {
        const depots = row.original.depots;
        const displayDepots = depots.slice(0, 3);
        const remainingCount = depots.length - 3;

        return (
          <div className='flex flex-wrap gap-2'>
            {displayDepots.map((depot: string, index: number) => (
              <span
                key={index}
                className='inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'
              >
                <span className='inline-block w-1.5 h-1.5 bg-gray-500 rounded-full' />
                {depot}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className='text-xs text-gray-500'>
                +{remainingCount} more
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }: { row: any }) => (
        <TableActions
          onView={() => handleViewDepotHub(row.original)}
          onEdit={() => handleEditDepotHub(row.original)}
          onDelete={() => handleDeleteClick(row.original)}
        />
      ),
    },
  ];

  const emptyStateMessage = {
    title: "No Depot Hubs Found",
    message: "There are no depot hubs to display at the moment.",
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Depot Hubs</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Add Depot Hub
        </Button>
      </div>

      <CustomTable
        columns={columns}
        data={data?.data}
        loading={isLoading}
        emptyState={emptyStateMessage}
      />

      {/* Create Depot Hub Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Create New Depot Hub</DialogTitle>
          </DialogHeader>
          <DepotHubForm
            onSubmit={handleCreateDepotHub}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={createDepotHubMutation.isPending}
          />
          
        </DialogContent>
      </Dialog>

      {/* Edit Depot Hub Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Edit Depot Hub</DialogTitle>
          </DialogHeader>
          <DepotHubForm
            initialData={selectedDepotHub || undefined}
            onSubmit={handleUpdateDepotHub}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedDepotHub(null);
            }}
            isLoading={updateDepotHubMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* View Depot Hub Drawer */}
      <DepotHubViewDrawer
        depotHub={selectedDepotHub}
        isOpen={isViewDrawerOpen}
        onClose={() => {
          setIsViewDrawerOpen(false);
          setSelectedDepotHub(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedDepotHub(null);
        }}
        onConfirm={handleDeleteDepotHub}
        title='Delete Depot Hub'
        description={`Are you sure you want to delete "${selectedDepotHub?.name}" and all its depots? This action cannot be undone.`}
        isLoading={deleteDepotHubMutation.isPending}
      />
    </div>
  );
};

export default Depots;
