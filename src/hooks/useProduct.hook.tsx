import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductsRequest,
  fetchProductByIdRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "@/services/product.service";
import { CreateProductDto, UpdateProductDto } from "@/types/product.types";

const useProductHook = () => {
  const queryClient = useQueryClient();

  const useFetchProducts = () =>
    useQuery({
      queryFn: async () => {
        return await fetchProductsRequest("");
      },
      queryKey: ["PRODUCTS"],
    });

  const useFetchProductById = (productId: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchProductByIdRequest(productId);
      },
      queryKey: ["PRODUCT", productId],
      enabled: !!productId,
    });

  const useCreateProduct = () =>
    useMutation({
      mutationFn: async (productData: CreateProductDto) => {
        return await createProductRequest(productData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      },
    });

  const useUpdateProduct = () =>
    useMutation({
      mutationFn: async ({
        productId,
        productData,
      }: {
        productId: string;
        productData: UpdateProductDto;
      }) => {
        return await updateProductRequest(productId, productData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      },
    });

  const useDeleteProduct = () =>
    useMutation({
      mutationFn: async (productId: string) => {
        return await deleteProductRequest(productId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      },
    });

  return {
    useFetchProducts,
    useFetchProductById,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};

export default useProductHook;
