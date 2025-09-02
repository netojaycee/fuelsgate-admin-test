"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/atoms/text";
import useTicketHook from "@/hooks/useTicket.hook";
import { Loader2 } from "lucide-react";

interface TicketViewDrawerProps {
  truckOrderId: string | null;
  open: boolean;
  onClose: () => void;
}

const TicketViewDrawer: React.FC<TicketViewDrawerProps> = ({
  truckOrderId,
  open,
  onClose,
}) => {
  const { useGetTicketDetails } = useTicketHook();
  const { data, isLoading } = useGetTicketDetails(truckOrderId || "");

  const ticket = data?._doc;
// console.log("Ticket Data:", ticket);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-h-[80vh] overflow-y-auto min-w-[350px]'>
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-10'>
            <Loader2 className='animate-spin w-8 h-8 mb-2 text-gray-500' />
            <Text variant='ps'>Loading...</Text>
          </div>
        ) : ticket ? (
          <div className='space-y-4'>
            <Text variant='ps' classNames='font-bold text-lg text-primary'>
              Transport Fee:{" "}
              <span className='font-normal'>
                ₦{ticket.transportFee?.toLocaleString() ?? "N/A"}
              </span>
            </Text>
            <Text variant='ps' classNames='font-bold text-lg text-primary'>
              Transporter Service Fee:{" "}
              <span className='font-normal'>
                ₦{ticket.transporterServiceFee?.toLocaleString() ?? "N/A"}
              </span>
            </Text>
            <Text variant='ps' classNames='font-bold text-lg text-primary'>
              Buyer Service Fee:{" "}
              <span className='font-normal'>
                ₦{ticket.buyerServiceFee?.toLocaleString() ?? "N/A"}
              </span>
            </Text>
            <Text variant='ps' classNames='text-gray-500'>
              Created:{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "N/A"}
            </Text>
          </div>
        ) : (
          <Text variant='ps' classNames='text-red-500'>
            No ticket details found.
          </Text>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketViewDrawer;
