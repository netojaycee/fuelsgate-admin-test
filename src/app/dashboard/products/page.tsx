"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import useProductHook from "@/hooks/useProduct.hook";
import {
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product.types";
import ProductForm from "@/components/features/products/product-form";
import ProductViewDrawer from "@/components/features/products/product-view-drawer";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { TableActions } from "@/components/common/table-actions";
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const { toast } = useToast();
  const {
    useFetchProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  } = useProductHook();

  const { data, isLoading } = useFetchProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null
  );

  const handleCreateProduct = async (productData: CreateProductDto) => {
    try {
      await createProductMutation.mutateAsync(productData);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "error",
      });
    }
  };

  const handleUpdateProduct = async (productData: UpdateProductDto) => {
    if (!selectedProduct) return;

    try {
      await updateProductMutation.mutateAsync({
        productId: selectedProduct._id,
        productData,
      });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "error",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProductMutation.mutateAsync(selectedProduct._id);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "error",
      });
    }
  };

  const handleViewProduct = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsViewDrawerOpen(true);
  };

  const handleEditProduct = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => (
        <span className='font-medium'>{row.original.name}</span>
      ),
    },
    {
      header: "Value",
      accessorKey: "value",
    },
    {
      header: "Unit",
      accessorKey: "unit",
    },
    {
      header: "Color",
      accessorKey: "color",
      cell: ({ row }: { row: any }) => (
        <div className='flex items-center gap-2'>
          {row.original.color.includes('-') ? (
            <div className='flex flex-col'>
              <div
          className='w-4 h-2 rounded-t border border-gray-300'
          style={{ backgroundColor: row.original.color.split('-')[0] }}
              />
              <div
          className='w-4 h-2 rounded-b border border-gray-300'
          style={{ backgroundColor: row.original.color.split('-')[1] }}
              />
            </div>
          ) : (
            <div
              className='w-4 h-4 rounded border border-gray-300'
              style={{ backgroundColor: row.original.color }}
            />
          )}
          <span className='text-sm'>{row.original.color}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "secondary"}
          className={
            row.original.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }: { row: any }) => (
        <TableActions
          onView={() => handleViewProduct(row.original)}
          onEdit={() => handleEditProduct(row.original)}
          onDelete={() => handleDeleteClick(row.original)}
        />
      ),
    },
  ];

  const emptyStateMessage = {
    title: "No Products Found",
    message: "There are no products to display at the moment.",
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Add Product
        </Button>
      </div>

      <CustomTable
        columns={columns}
        data={data?.data?.products}
        loading={isLoading}
        emptyState={emptyStateMessage}
      />

      {/* Create Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={createProductMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            initialData={selectedProduct || undefined}
            onSubmit={handleUpdateProduct}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
            }}
            isLoading={updateProductMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* View Product Drawer */}
      <ProductViewDrawer
        product={selectedProduct}
        isOpen={isViewDrawerOpen}
        onClose={() => {
          setIsViewDrawerOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        title='Delete Product'
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        isLoading={deleteProductMutation.isPending}
      />
    </div>
  );
};

export default Products;
