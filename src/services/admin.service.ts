import { requestHandler } from "@/utils/requestHandler";

export const fetchAdminAnalytics = async () => {
  const url = "/admin/analytics";
  return await requestHandler("get", url);
};

export const fetchAdminRecentAnalytics = async (query: string) => {
  const url = "/admin/analytics/recent" + (query ?? "");
  return await requestHandler("get", url);
};

export const fetchAdminRecentUsers = async (query: string) => {
  const url = "/admin/analytics/recent/users" + (query ?? "");
  return await requestHandler("get", url);
};

export const fetchAdminRecentProductUploads = async (query: string) => {
  const url = "/admin/analytics/recent/product-uploads" + (query ?? "");
  return await requestHandler("get", url);
};

export const fetchAdminRecentProductOrders = async (query: string) => {
  const url = "/admin/analytics/recent/orders" + (query ?? "");
  return await requestHandler("get", url);
};

export const fetchAdminRecentTruckOrders = async (query: string) => {
  const url = "/admin/analytics/recent/truck-orders" + (query ?? "");
  return await requestHandler("get", url);
};
