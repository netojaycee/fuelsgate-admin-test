"use client";

import React from "react";
import { CustomTable } from "@/components/organism/custom-table";
import useProductHook from "@/hooks/useProduct.hook";
import ProductRenderer from "@/components/atoms/product-renderer";

const Products = () => {
  const { useFetchProducts } = useProductHook();
  const { data, isLoading } = useFetchProducts();

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return <ProductRenderer product={row.original} />;
      },
    },
    {
      header: "Unit",
      accessorKey: "unit",
    },
  ];

  const emptyStateMessage = {
    title: "No Products Found",
    message: "There are no products to display at the moment.",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <CustomTable
        columns={columns}
        data={data?.data?.products}
        loading={isLoading}
        emptyState={emptyStateMessage}
      />
    </div>
  );
};

export default Products;
