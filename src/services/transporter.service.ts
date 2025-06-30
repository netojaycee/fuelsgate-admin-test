import { requestHandler } from "@/utils/requestHandler";

export const fetchTransporterAnalyticsRequest = async () => {
  const url = "/transporter/analytics";
  return await requestHandler("get", url);
};

export const updateTransporterProfileRequest = async (data: any) => {
  const url = "/transporter/update";
  return await requestHandler("put", url, data);
};

export const updateTransporterProfilePictureRequest = async (
  data: Partial<any>
) => {
  const url = "/transporter/upload-profile-picture";
  return await requestHandler("post", url, data);
};
