import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminAnalytics,
  fetchAdminRecentAnalytics,
  fetchAdminRecentProductOrders,
  fetchAdminRecentProductUploads,
  fetchAdminRecentTruckOrders,
  fetchAdminRecentUsers,
} from "@/services/admin.service";

const useAdminHook = () => {
  const useFetchAdminAnalytics = () =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminAnalytics();
      },
      queryKey: ["ADMIN_ANALYTICS"],
    });

  const useFetchAdminRecentAnalytics = (date: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminRecentAnalytics(date);
      },
      queryKey: ["ADMIN_RECENT_ANALYTICS", date],
    });

  const useFetchAdminRecentUsers = (date: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminRecentUsers(date);
      },
      queryKey: ["ADMIN_RECENT_USERS", date],
    });

  const useFetchAdminRecentProductUploads = (date: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminRecentProductUploads(date);
      },
      queryKey: ["ADMIN_RECENT_PRODUCT_UPLOADS", date],
    });

  const useFetchAdminRecentProductOrders = (date: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminRecentProductOrders(date);
      },
      queryKey: ["ADMIN_RECENT_PRODUCT_ORDERS", date],
    });

  const useFetchAdminRecentTruckOrders = (date: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAdminRecentTruckOrders(date);
      },
      queryKey: ["ADMIN_RECENT_TRUCK_ORDERS", date],
    });

  return {
    useFetchAdminAnalytics,
    useFetchAdminRecentAnalytics,
    useFetchAdminRecentUsers,
    useFetchAdminRecentProductUploads,
    useFetchAdminRecentProductOrders,
    useFetchAdminRecentTruckOrders,
  };
};

export default useAdminHook;
