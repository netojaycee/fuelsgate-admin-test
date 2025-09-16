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
import { DepotHubDto } from "@/types/depot-hub.types";

interface DepotHubViewDrawerProps {
  depotHub: DepotHubDto | null;
  isOpen: boolean;
  onClose: () => void;
}

const DepotHubViewDrawer: React.FC<DepotHubViewDrawerProps> = ({
  depotHub,
  isOpen,
  onClose,
}) => {
  if (!depotHub) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Depot Hub Details</SheetTitle>
          <SheetDescription>
            View detailed information about this depot hub
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Depot Hub Name
            </label>
            <p className='text-sm text-gray-900 bg-gray-50 p-3 rounded-md'>
              {depotHub.name}
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Type
            </label>
            <div>
              <Badge variant='outline' className={depotHub.type === 'tanker' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {depotHub.type === 'tanker' ? 'Tanker' : 'Others'}
              </Badge>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Total Depots
            </label>
            <div>
              <Badge variant='outline' className='bg-blue-50 text-blue-700'>
                {depotHub.depots.length}{" "}
                {depotHub.depots.length === 1 ? "Depot" : "Depots"}
              </Badge>
            </div>
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-medium text-gray-700'>Depots</label>
            <div className='max-h-64 overflow-y-auto space-y-2'>
              {depotHub.depots.length > 0 ? (
                depotHub.depots.map((depot, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-3 bg-gray-50 p-3 rounded-md'
                  >
                    <div className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0' />
                    <span className='text-sm text-gray-900'>{depot}</span>
                  </div>
                ))
              ) : (
                <p className='text-sm text-gray-500 italic'>
                  No depots available in this hub.
                </p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DepotHubViewDrawer;
