import { useQuery } from "@tanstack/react-query";
import { fetchProductsRequest } from "@/services/product.service";

const useProductHook = () => {
  const useFetchProducts = () =>
    useQuery({
      queryFn: async () => {
        return await fetchProductsRequest("");
      },
      queryKey: ["PRODUCTS"],
    });

  return {
    useFetchProducts,
  };
};

export default useProductHook;
