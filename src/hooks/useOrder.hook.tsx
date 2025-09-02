
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToastConfig from "./useToastConfig.hook";
import { deleteOrderRequest, fetchOrdersRequest } from "@/services/order.service";

const useOrderHook = () => {
  const { showToast } = useToastConfig();
  const queryClient = useQueryClient();

  const useFetchOrders = (queryParams: string = "") =>
    useQuery({
      queryFn: async () => {
        return await fetchOrdersRequest(queryParams);
      },
      queryKey: ["orders"],
    });

  
  const useDeleteOrder = () =>
    useMutation({
      mutationFn: async (orderId: string) => {
        return await deleteOrderRequest(orderId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        showToast("Order deleted successfully", "success");
      },
      onError: (error: any) => {
        showToast(error?.message || "Failed to delete order", "error");
      },
    });

  return {
    useFetchOrders,
    useDeleteOrder,
  };
};

export default useOrderHook;
