import { requestHandler } from '@/utils/requestHandler';

export const updateUserCanLoadRequest = async (userId: string, canLoad: boolean) => {
  const url = `/user/toggle-can-load/${userId}`;
  return await requestHandler('put', url, { canLoad });
};
