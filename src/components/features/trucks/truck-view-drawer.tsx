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
import { TruckDto } from "@/types/truck.type";
import { DepotHubDto } from "@/types/depot-hub.types";
import { ProductDto } from "@/types/product.types";
import { formatDate } from "@/utils/formatDate";

interface TruckViewDrawerProps {
  truck: TruckDto | null;
  isOpen: boolean;
  onClose: () => void;
}

const TruckViewDrawer: React.FC<TruckViewDrawerProps> = ({
  truck,
  isOpen,
  onClose,
}) => {
  if (!truck) return null;

  const product = truck.productId as ProductDto;
  const depotHub = truck.depotHubId as DepotHubDto;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Truck Details</SheetTitle>
          <SheetDescription>
            View detailed information about this truck
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Truck Number
            </label>
            <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
              {truck.truckNumber}
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Capacity
            </label>
            <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
              {truck.capacity} Litres
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>Product</label>
            <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
              {product?.name || "N/A"}
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>Status</label>
            <div>
              <Badge
                variant='outline'
                className={
                  truck.status === "available"
                    ? "bg-green-100 text-green-800"
                    : truck.status === "locked"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {truck.status.charAt(0).toUpperCase() + truck.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Location Details
            </label>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-xs text-gray-500'>Depot Hub</label>
                <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                  {depotHub?.name || "N/A"}
                </p>
              </div>
              <div className='space-y-1'>
                <label className='text-xs text-gray-500'>Depot</label>
                <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                  {truck.depot}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Current Location
            </label>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-xs text-gray-500'>State</label>
                <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                  {truck.currentState}
                </p>
              </div>
              <div className='space-y-1'>
                <label className='text-xs text-gray-500'>City</label>
                <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                  {truck.currentCity}
                </p>
              </div>
            </div>
          </div>

          {truck.createdAt && (
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Dates</label>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs text-gray-500'>Created</label>
                  <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                    {formatDate(truck.createdAt)}
                  </p>
                </div>
                {truck.updatedAt && (
                  <div className='space-y-1'>
                    <label className='text-xs text-gray-500'>
                      Last Updated
                    </label>
                    <p className='text-sm text-gray-900 bg-gray-50 p-2 rounded-md'>
                      {formatDate(truck.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TruckViewDrawer;
