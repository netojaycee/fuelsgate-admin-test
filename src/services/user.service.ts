import { requestHandler } from "@/utils/requestHandler";

export const fetchUsersRequest = async (query: string = '') => {
  const url = `/user${query ? `?${query}` : ''}`;
  return await requestHandler('get', url);
};

export const fetchUserByIdRequest = async (userId: string) => {
  const url = `/users/${userId}`;
  return await requestHandler('get', url);
};

export const updateUserStatusRequest = async (userId: string, data: { status: string }) => {
  const url = `/user/${userId}/status`;
  return await requestHandler('patch', url, data);
};

export const updateUserProfileRequest = async (data: any) => {
  const url = `/user/profile`;
  return await requestHandler('patch', url, data);
};

export const updateUserPasswordRequest = async (data: unknown) => {
  const url = `/user/change-password`;
  return await requestHandler('patch', url, data);
};