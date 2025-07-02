"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ProductDto } from "@/types/product.types";

interface ProductViewDrawerProps {
  product: ProductDto | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductViewDrawer: React.FC<ProductViewDrawerProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
          <SheetDescription>
            View detailed information about this product
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          <div className='grid grid-cols-1 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>
                Product Name
              </label>
              <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
                {product.name}
              </p>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Value</label>
              <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
                {product.value}
              </p>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Unit</label>
              <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
                {product.unit}
              </p>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Color</label>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-md border border-gray-300 overflow-hidden'>
                  {product.color.includes('-') ? (
                    <div className='w-full h-full flex flex-col'>
                      <div
                        className='w-full h-1/2'
                        style={{ backgroundColor: product.color.split('-')[0] }}
                      />
                      <div
                        className='w-full h-1/2'
                        style={{ backgroundColor: product.color.split('-')[1] }}
                      />
                    </div>
                  ) : (
                    <div
                      className='w-full h-full'
                      style={{ backgroundColor: product.color }}
                    />
                  )}
                </div>
                <span className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md'>
                  {product.color}
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>
                Status
              </label>
              <div>
                <Badge
                  variant={
                    product.status === "active" ? "default" : "secondary"
                  }
                  className={
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {product.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductViewDrawer;
