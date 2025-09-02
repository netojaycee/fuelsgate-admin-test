'use client';
import { useQuery } from '@tanstack/react-query';
// import useToastConfig from './useToastConfig.hook';
// import { ModalContext } from '@/contexts/ModalContext';
// import { useContext } from 'react';
// import { useRouter } from 'next/navigation';
import { getTicketDetailsRequest } from "@/services/ticket.service";

const useTicketHook = () => {
  // const { handleClose } = useContext(ModalContext);
  // const { showToast } = useToastConfig();
  // const queryClient = useQueryClient();
  // const router = useRouter();

  const useGetTicketDetails = (id: string) =>
    useQuery({
      queryFn: async () => {
        return await getTicketDetailsRequest(id);
      },
      queryKey: [`${id}_TICKET_DETAIL`],
    });

  return {
    useGetTicketDetails,
  };
};

export default useTicketHook;
