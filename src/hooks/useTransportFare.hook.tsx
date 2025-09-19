import { deleteDistanceRequest } from "@/services/distance.service";
  const useDeleteDistance = () => {
    const { showToast } = useToastConfig();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => deleteDistanceRequest(id),
      onSuccess: (res: any) => {
        showToast(res.message || "Distance deleted", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_DISTANCES"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error deleting distance", "error");
      },
    });
  };
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToastConfig from "./useToastConfig.hook";
import {
  getTransportConfigsRequest,
  createTransportConfigRequest,
  deleteTransportConfigRequest,
  getLoadPointsRequest,
  updateTransportConfigRequest,
  createLoadPointRequest,
  getDistancesRequest,
  bulkUploadDistancesRequest,
  calculateFareRequest,
  editDistanceRequest,
} from "@/services/transport-fare.service";
import { updateLoadPointRequest, deleteLoadPointRequest } from "@/services/load-point.service";
  const useUpdateLoadPoint = () => {
    const { showToast } = useToastConfig();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => updateLoadPointRequest(id, data),
      onSuccess: (res: any) => {
        showToast(res.message || "Load point updated", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_LOAD_POINTS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error updating load point", "error");
      },
    });
  };

  const useDeleteLoadPoint = () => {
    const { showToast } = useToastConfig();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => deleteLoadPointRequest(id),
      onSuccess: (res: any) => {
        showToast(res.message || "Load point deleted", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_LOAD_POINTS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error deleting load point", "error");
      },
    });
  };

import { CreateTransportConfigDto } from "@/types/transport-fare.types";

const useTransportFareHook = () => {
  const { showToast } = useToastConfig();
  const queryClient = useQueryClient();

  const useFetchTransportConfigs = (params: any = {}) => {
    return useQuery({
      queryKey: ["TRANSPORT_CONFIGS", params],
      queryFn: () => getTransportConfigsRequest(params),
    });
  };

  const useCreateTransportConfig = () => {
    return useMutation({
      mutationFn: (data: CreateTransportConfigDto) =>
        createTransportConfigRequest(data),
      onSuccess: (res: any) => {
        showToast(res.message || "Config created", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_CONFIGS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error creating config", "error");
      },
    });
  };

  const useUpdateTransportConfig = () => {
    return useMutation({
      mutationFn: ({ key, data }: { key: string; data: any }) =>
        updateTransportConfigRequest(key, data),
      onSuccess: (res: any) => {
        showToast(res.message || "Config updated", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_CONFIGS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error updating config", "error");
      },
    });
  };

  const useDeleteTransportConfig = () => {
    return useMutation({
      mutationFn: (key: string) => deleteTransportConfigRequest(key),
      onSuccess: (res: any) => {
        showToast(res.message || "Config deleted", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_CONFIGS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error deleting config", "error");
      },
    });
  };

  const useFetchLoadPoints = () => {
    return useQuery({
      queryKey: ["TRANSPORT_LOAD_POINTS"],
      queryFn: () => getLoadPointsRequest(),
    });
  };

  const useCreateLoadPoint = () => {
    return useMutation({
      mutationFn: (data: any) => createLoadPointRequest(data),
      onSuccess: (res: any) => {
        showToast(res.message || "Load point created", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_LOAD_POINTS"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error creating load point", "error");
      },
    });
  };

  const useFetchDistances = (params: any = {}) => {
    return useQuery({
      queryKey: ["TRANSPORT_DISTANCES", params],
      queryFn: () => getDistancesRequest(params),
    });
  };

  const useBulkUploadDistances = () => {
    return useMutation({
      mutationFn: (rows: any[]) => bulkUploadDistancesRequest(rows),
      onSuccess: (res: any) => {
        showToast(res.message || "Distances uploaded", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_DISTANCES"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error uploading distances", "error");
      },
    });
  };

  const useCalculateFare = () => {
    return useMutation({
      mutationFn: (payload: any) => calculateFareRequest(payload),
      onError: (err: any) => {
        showToast(err?.message || "Error calculating fare", "error");
      },
    });
  };

  const useEditDistance = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) =>
        editDistanceRequest(id, data),
      onSuccess: (res: any) => {
        showToast(res.message || "Distance updated", "success");
        queryClient.invalidateQueries({ queryKey: ["TRANSPORT_DISTANCES"] });
      },
      onError: (err: any) => {
        showToast(err?.message || "Error updating distance", "error");
      },
    });
  };

  return {
    useFetchTransportConfigs,
    useCreateTransportConfig,
    useUpdateTransportConfig,
    useDeleteTransportConfig,
    useFetchLoadPoints,
    useCreateLoadPoint,
    useUpdateLoadPoint,
    useDeleteLoadPoint,
    useFetchDistances,
    useBulkUploadDistances,
    useCalculateFare,
    useEditDistance,
    useDeleteDistance,
  };
};

export default useTransportFareHook;
