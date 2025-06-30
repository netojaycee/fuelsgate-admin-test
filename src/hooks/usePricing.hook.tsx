import {
  createPricingRequest,
  deletePricingRequest,
  fetchPricingRequest,
  updatePricingRequest,
  updatePricingStatusRequest,
} from "@/services/pricing.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToastConfig from "./useToastConfig.hook";

const usePricingHook = () => {
  const { showToast } = useToastConfig();
  const queryClient = useQueryClient();

  const useFetchPricing = (query?: string) => {
    return useQuery({
      queryKey: ["PRICING"],
      queryFn: () => fetchPricingRequest(query ?? ""),
    });
  };

  const useCreatePricing = () => {
    return useMutation({
      mutationFn: (data: any) => createPricingRequest(data),
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["PRICING"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });
  };

  const useUpdatePricing = (id: string) => {
    return useMutation({
      mutationFn: (data: any) => updatePricingRequest(data, id),
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["PRICING"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });
  };

  const useUpdatePricingStatus = (id: string) => {
    return useMutation({
      mutationFn: (data: any) => updatePricingStatusRequest(data, id),
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["PRICING"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });
  };

  const useDeletePricing = (id: string) => {
    return useMutation({
      mutationFn: () => deletePricingRequest(id),
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["PRICING"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });
  };

  return {
    useFetchPricing,
    useCreatePricing,
    useUpdatePricing,
    useUpdatePricingStatus,
    useDeletePricing,
  };
};

export default usePricingHook;
