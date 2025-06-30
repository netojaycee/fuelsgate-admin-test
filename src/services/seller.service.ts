import { requestHandler } from "@/utils/requestHandler";

export const fetchSellerAnalyticsRequest = async () => {
  const url = "/seller/analytics";
  return await requestHandler("get", url);
};

export const updateSellerProfileRequest = async (data: any) => {
  const url = "/seller/update";
  return await requestHandler("put", url, data);
};

export const updateSellerProfilePictureRequest = async (data: Partial<any>) => {
  const url = "/seller/upload-profile-picture";
  return await requestHandler("post", url, data);
};
