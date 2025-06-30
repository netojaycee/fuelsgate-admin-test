"use client";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext";
import useToastConfig from "@/hooks/useToastConfig.hook";
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from "@/types/authentication.types";
import {
  forgotPasswordRequest,
  loginRequest,
  resetPasswordRequest,
  verifyOtpRequest,
} from "@/services/authentication.service";

const useAuthenticationHook = () => {
  const { storeUser } = useContext(AuthContext);
  const { showToast } = useToastConfig();
  const router = useRouter();

  const saveUserData = (data: any): boolean | void => {
    if (!storeUser) {
      showToast("An error occurred when trying to authenticate user", "error");
      return false;
    }
    storeUser({ token: data.token, data: data, isLoggedIn: true });
  };

  const useLogin = useMutation({
    mutationFn: (data: LoginDto) => loginRequest(data),
    onSuccess: (response) => {
      showToast(response.message, "success");
      if (response.data.user.role === "admin") {
        saveUserData(response.data.user);
        router.push("/dashboard");
      } else {
        showToast("You are not authorized to access this page", "error");
      }
    },
    onError: (err: any) => {
      showToast(err.message || "Login failed", "error");
    }
  });

  const useForgotPassword = useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPasswordRequest(data),
    onSuccess: (response) => {
      showToast(response.message, "success");
      Cookies.set("email", response.data.email, { expires: 0.0417 });
      router.push("/verify-otp");
    },
  });

  const useVerifyOtp = useMutation({
    mutationFn: (data: VerifyOtpDto) => verifyOtpRequest(data),
    onSuccess: (response) => {
      showToast(response.message, "success");
      router.push("/reset-password");
    },
  });

  const useResetPassword = useMutation({
    mutationFn: (data: ResetPasswordDto) => resetPasswordRequest(data),
    onSuccess: (response) => {
      showToast(response.message, "success");
      router.push("/");
    },
  });

  return {
    useLogin,
    useForgotPassword,
    useVerifyOtp,
    useResetPassword,
    saveUserData,
  };
};

export default useAuthenticationHook;
