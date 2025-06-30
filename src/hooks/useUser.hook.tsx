import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsersRequest,
  updateUserStatusRequest,
  fetchUserByIdRequest,
  updateUserProfileRequest,
  updateUserPasswordRequest,
} from "@/services/user.service";
import { useToast } from "@/components/ui/use-toast";
import useToastConfig from "./useToastConfig.hook";

const useUserHook = () => {
    const { showToast } = useToastConfig();
    const queryClient = useQueryClient();

  const useFetchUsers = (queryParams: string = "") =>
    useQuery({
      queryFn: async () => {
        return await fetchUsersRequest(queryParams);
      },
      queryKey: ["USERS", queryParams],
    });

  const useFetchUserById = (userId: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchUserByIdRequest(userId);
      },
      queryKey: ["USER", userId],
      enabled: !!userId,
    });

  const useUpdateUserStatus = () =>
    useMutation({
      mutationFn: async ({
        userId,
        status,
      }: {
        userId: string;
        status: string;
      }) => {
        return await updateUserStatusRequest(userId, { status });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["USERS"] });
        
        showToast("User status updated successfully", "success");
      },
      onError: (error: any) => {
        showToast(
          error?.message || "Failed to update user status",
          "error"
        );
      },
    });

  const useUpdateUserProfile = () =>
    useMutation({
      mutationFn: async (data: any) => {
        return await updateUserProfileRequest(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["USER"] });
        showToast("Profile updated successfully", "success");
      },
      onError: (error: any) => {
        showToast(
          error?.message || "Failed to update profile",
          "error"
        );
      },
    });

  const useUpdateUserPassword = () =>
    useMutation({
      mutationFn: async (data: any) => {
        return await updateUserPasswordRequest(data);
      },
      onSuccess: () => {
        showToast("Password updated successfully", "success");
      },
      onError: (error: any) => {
        showToast(
          error?.message || "Failed to update password",
          "error"
        );
      },
    });

  

  return {
    useFetchUsers,
    useFetchUserById,
    useUpdateUserStatus,
    useUpdateUserProfile,
    useUpdateUserPassword,
  };
};

export default useUserHook;
