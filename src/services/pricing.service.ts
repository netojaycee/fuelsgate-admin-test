import { requestHandler } from "@/utils/requestHandler";

export const fetchPricingRequest = async (query: string) => {
  const url = "/pricing" + (query ?? "");
  return await requestHandler("get", url);
};

export const createPricingRequest = async (data: any) => {
  const url = "/pricing";
  return await requestHandler("post", url, data);
};

export const updatePricingRequest = async (data: any, id: string) => {
  const url = "/pricing/" + id;
  return await requestHandler("put", url, data);
};

export const updatePricingStatusRequest = async (data: any, id: string) => {
  const url = "/pricing/" + id + "/status";
  return await requestHandler("put", url, data);
};

export const deletePricingRequest = async (id: string) => {
  const url = "/pricing/" + id;
  return await requestHandler("delete", url);
};

export const getPricingRequest = async (id: string) => {
  const url = "/pricing/" + id;
  return await requestHandler("get", url);
};
