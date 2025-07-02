import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDepotRequest,
  fetchDepotByIdRequest,
  createDepotHubRequest,
  updateDepotHubRequest,
  deleteDepotHubRequest,
} from "@/services/depot-hub.service";
import { CreateDepotHubDto, UpdateDepotHubDto } from "@/types/depot-hub.types";

const useDepotHubHook = () => {
  const queryClient = useQueryClient();

  const useFetchDepotHubs = () =>
    useQuery({
      queryFn: async () => {
        return await fetchDepotRequest("");
      },
      queryKey: ["DEPOTS"],
    });

  const useFetchDepotHubById = (depotHubId: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchDepotByIdRequest(depotHubId);
      },
      queryKey: ["DEPOT", depotHubId],
      enabled: !!depotHubId,
    });

  const useCreateDepotHub = () =>
    useMutation({
      mutationFn: async (depotHubData: CreateDepotHubDto) => {
        return await createDepotHubRequest(depotHubData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["DEPOTS"] });
      },
    });

  const useUpdateDepotHub = () =>
    useMutation({
      mutationFn: async ({
        depotHubId,
        depotHubData,
      }: {
        depotHubId: string;
        depotHubData: UpdateDepotHubDto;
      }) => {
        return await updateDepotHubRequest(depotHubId, depotHubData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["DEPOTS"] });
      },
    });

  const useDeleteDepotHub = () =>
    useMutation({
      mutationFn: async (depotHubId: string) => {
        return await deleteDepotHubRequest(depotHubId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["DEPOTS"] });
      },
    });

  return {
    useFetchDepotHubs,
    useFetchDepotHubById,
    useCreateDepotHub,
    useUpdateDepotHub,
    useDeleteDepotHub,
  };
};

export default useDepotHubHook;
