import { requestHandler } from '@/utils/requestHandler';
import { LoadPointDto, CreateLoadPointDto } from '@/types/transport-fare.types';

export const updateLoadPointRequest = async (id: string, data: Partial<CreateLoadPointDto>) => {
  return await requestHandler('put', `/transport-fare/admin/load-points/${id}`, data);
};

export const deleteLoadPointRequest = async (id: string) => {
  return await requestHandler('delete', `/transport-fare/admin/load-points/${id}`);
};
