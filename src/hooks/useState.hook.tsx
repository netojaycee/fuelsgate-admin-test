import {
  fetchStatesRequest,
  getLGAFromApiRequest,
} from '@/services/state.service';
import { useQuery } from '@tanstack/react-query';

const useStateHook = () => {
  const useFetchStates = useQuery({
    queryFn: async () => {
      return await fetchStatesRequest();
    },
    queryKey: ['STATES'],
  });

  const useFetchStateLGA = (state?: string) =>
    useQuery({
      queryFn: async () => {
        return await getLGAFromApiRequest(state);
      },
      queryKey: [`${state}_LGA`, state],
    });

  return {
    useFetchStates,
    useFetchStateLGA,
  };
};

export default useStateHook;
