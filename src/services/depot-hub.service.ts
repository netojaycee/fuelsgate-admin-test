import { requestHandler } from "@/utils/requestHandler";
import { CreateDepotHubDto, UpdateDepotHubDto } from "@/types/depot-hub.types";

export const fetchDepotRequest = async (query: string) => {
  const url = "/depot-hub" + (query ?? "");
  return await requestHandler("get", url);
};

export const fetchDepotByIdRequest = async (depotHubId: string) => {
  const url = `/depot-hub/${depotHubId}`;
  return await requestHandler("get", url);
};

export const createDepotHubRequest = async (depotHubData: CreateDepotHubDto) => {
  const url = "/depot-hub";
  return await requestHandler("post", url, depotHubData);
};

export const updateDepotHubRequest = async (depotHubId: string, depotHubData: UpdateDepotHubDto) => {
  const url = `/depot-hub/${depotHubId}`;
  return await requestHandler("put", url, depotHubData);
};

export const deleteDepotHubRequest = async (depotHubId: string) => {
  const url = `/depot-hub/${depotHubId}`;
  return await requestHandler("delete", url);
};
