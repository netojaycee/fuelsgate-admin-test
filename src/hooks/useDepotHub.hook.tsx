import { fetchDepotRequest } from "@/services/depot-hub.service";
import { useQuery } from "@tanstack/react-query";

const useDepotHubHook = () => {
  const useFetchDepotHubs = () =>
    useQuery({
      queryFn: async () => {
        return await fetchDepotRequest("");
      },
      queryKey: ["DEPOTS"],
    });

  return {
    useFetchDepotHubs,
  };
};

export default useDepotHubHook;
