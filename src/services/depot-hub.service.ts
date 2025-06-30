import { requestHandler } from "@/utils/requestHandler";

export const fetchDepotRequest = async (query: string) => {
  const url = "/depot-hub" + (query ?? "");
  return await requestHandler("get", url);
};
