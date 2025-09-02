import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/requestHandler";

export default function useProductOrderHook() {
  function useFetchProductOrdersAdmin(queryParams: string) {
    return useQuery({
      queryKey: ["product-orders-admin", queryParams],
      queryFn: async () => {
        // Use the new admin endpoint for product orders
        const res = await requestHandler(
          "get",
          `/order/admin/all${queryParams}`
        );
        return res.data; // backend returns { message, data, statusCode }
      },
      select: (res) => res,
    });
  }
  function useFetchProductOrderDetails(orderId: string) {
    return useQuery({
      queryKey: ["product-order-details", orderId],
      queryFn: async () => {
        const res = await requestHandler("get", `/order/${orderId}`);
        return res.data.data;
      },
      enabled: !!orderId,
    });
  }
  return { useFetchProductOrdersAdmin, useFetchProductOrderDetails };
}
