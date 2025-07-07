import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import useToastConfig from "./useToastConfig.hook";
import {
  createPlatformConfigRequest,
  deletePlatformConfigRequest,
  getPlatformConfigRequest,
  getPlatformConfigsRequest,
  getServiceFeesRequest,
  updatePlatformConfigRequest,
  updateServiceFeesRequest,
} from "@/services/platform-config.service";
import {
  CreatePlatformConfigDto,
  PlatformConfigQueryParams,
  ServiceFeeConfig,
  UpdatePlatformConfigDto,
} from "@/types/platform-config.types";

const usePlatformConfigHook = () => {
  const { showToast } = useToastConfig();
  const { handleClose } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const useFetchPlatformConfigs = (params: PlatformConfigQueryParams = {}) => {
    return useQuery({
      queryKey: ["PLATFORM_CONFIGS", params],
      queryFn: () => getPlatformConfigsRequest(params),
    });
  };

  const useFetchPlatformConfig = (key: string) => {
    return useQuery({
      queryKey: ["PLATFORM_CONFIG", key],
      queryFn: () => getPlatformConfigRequest(key),
      enabled: !!key,
    });
  };

  const useCreatePlatformConfig = () => {
    return useMutation({
      mutationFn: (data: CreatePlatformConfigDto) =>
        createPlatformConfigRequest(data),
      onSuccess: (response) => {
        showToast(
          response.message || "Configuration created successfully",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: ["PLATFORM_CONFIGS"] });
        handleClose && handleClose();
      },
      onError: (error: any) => {
        showToast(error.message || "Failed to create configuration", "error");
      },
    });
  };

  const useUpdatePlatformConfig = () => {
    return useMutation({
      mutationFn: ({
        key,
        data,
      }: {
        key: string;
        data: UpdatePlatformConfigDto;
      }) => updatePlatformConfigRequest(key, data),
      onSuccess: (response) => {
        showToast(
          response.message || "Configuration updated successfully",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: ["PLATFORM_CONFIGS"] });
        queryClient.invalidateQueries({ queryKey: ["PLATFORM_CONFIG"] });
        handleClose && handleClose();
      },
      onError: (error: any) => {
        showToast(error.message || "Failed to update configuration", "error");
      },
    });
  };

  const useDeletePlatformConfig = () => {
    return useMutation({
      mutationFn: (key: string) => deletePlatformConfigRequest(key),
      onSuccess: (response) => {
        showToast(
          response.message || "Configuration deleted successfully",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: ["PLATFORM_CONFIGS"] });
      },
      onError: (error: any) => {
        showToast(error.message || "Failed to delete configuration", "error");
      },
    });
  };

  const useFetchServiceFees = () => {
    return useQuery({
      queryKey: ["SERVICE_FEES"],
      queryFn: () => getServiceFeesRequest(),
    });
  };

  const useUpdateServiceFees = () => {
    return useMutation({
      mutationFn: (data: ServiceFeeConfig) => updateServiceFeesRequest(data),
      onSuccess: (response) => {
        showToast(
          response.message || "Service fees updated successfully",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: ["SERVICE_FEES"] });
        handleClose && handleClose();
      },
      onError: (error: any) => {
        showToast(error.message || "Failed to update service fees", "error");
      },
    });
  };

  return {
    useFetchPlatformConfigs,
    useFetchPlatformConfig,
    useCreatePlatformConfig,
    useUpdatePlatformConfig,
    useDeletePlatformConfig,
    useFetchServiceFees,
    useUpdateServiceFees,
  };
};

export default usePlatformConfigHook;
