import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchTrucksRequest,
  fetchTruckByIdRequest,
  createTruckRequest,
  updateTruckRequest,
  updateTruckStatusRequest,
  deleteTruckRequest,
} from "@/services/truck.service";
import { CreateTruckDto, UpdateTruckDto } from "@/types/truck.type";
import useToastConfig from "./useToastConfig.hook";

const useTruckHook = () => {
  const { showToast } = useToastConfig();
  const queryClient = useQueryClient();

  const useFetchTrucks = (query?: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchTrucksRequest(query ?? "");
      },
      queryKey: ["TRUCKS", query],
    });

  const useFetchTruckById = (truckId: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchTruckByIdRequest(truckId);
      },
      queryKey: ["TRUCK", truckId],
      enabled: !!truckId,
    });

  const useCreateTruck = () =>
    useMutation({
      mutationFn: async (truckData: CreateTruckDto) => {
        return await createTruckRequest(truckData);
      },
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["TRUCKS"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });

  const useUpdateTruck = () =>
    useMutation({
      mutationFn: async ({
        truckId,
        truckData,
      }: {
        truckId: string;
        truckData: UpdateTruckDto;
      }) => {
        return await updateTruckRequest(truckId, truckData);
      },
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["TRUCKS"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });

  const useUpdateTruckStatus = () =>
    useMutation({
      mutationFn: async ({
        truckId,
        status,
      }: {
        truckId: string;
        status: string;
      }) => {
        return await updateTruckStatusRequest(truckId, status);
      },
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["TRUCKS"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });

  const useDeleteTruck = () =>
    useMutation({
      mutationFn: async (truckId: string) => {
        return await deleteTruckRequest(truckId);
      },
      onSuccess: (response) => {
        showToast(response.message, "success");
        queryClient.invalidateQueries({ queryKey: ["TRUCKS"] });
      },
      onError: (response) => {
        showToast(response.message, "error");
      },
    });

  return {
    useFetchTrucks,
    useFetchTruckById,
    useCreateTruck,
    useUpdateTruck,
    useUpdateTruckStatus,
    useDeleteTruck,
  };
};

export default useTruckHook;
