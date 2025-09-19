import { requestHandler } from '@/utils/requestHandler';

export const deleteDistanceRequest = async (id: string) => {
  return await requestHandler('delete', `/transport-fare/admin/distances/${id}`);
};
