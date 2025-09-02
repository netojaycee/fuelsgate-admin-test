// import { useQuery } from "@tanstack/react-query";
// import { requestHandler } from "@/utils/requestHandler";

// export default function useTruckOrderHook() {
//   function useFetchTruckOrdersAdmin(queryParams: string) {
//     return useQuery({
//       queryKey: ["truck-orders-admin", queryParams],
//       queryFn: async () => {
//         // Use the correct backend endpoint for admin
//         const res = await requestHandler(
//           "get",
//           `/truck-order/admin/all${queryParams}`
//         );
//         return res.data;
//       },
//       select: (res) => res,
//     });
//   }
//   return { useFetchTruckOrdersAdmin };
// }


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToastConfig from "./useToastConfig.hook";
import { deleteTruckOrderRequest, fetchTruckOrdersAdmin } from "@/services/truck-order.service";

const useTruckOrderHook = () => {
  const { showToast } = useToastConfig();
  const queryClient = useQueryClient();

  const useFetchTruckOrdersAdmin = (queryParams: string = "") =>
    useQuery({
      queryFn: async () => {
        return await fetchTruckOrdersAdmin(queryParams);
      },
      queryKey: ["truck-orders-admin", queryParams],
    });

  
  const useDeleteTruckOrder = () =>
    useMutation({
      mutationFn: async (orderId: string) => {
        return await deleteTruckOrderRequest(orderId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["truck-orders-admin"] });
        showToast("Truck order deleted successfully", "success");
      },
      onError: (error: any) => {
        showToast(error?.message || "Failed to delete truck order", "error");
      },
    });

  return {
    useFetchTruckOrdersAdmin,
    useDeleteTruckOrder,
  };
};

export default useTruckOrderHook;
