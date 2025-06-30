import { requestHandler } from "@/utils/requestHandler";
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from "../types/authentication.types";

export const loginRequest = async (data: LoginDto) => {
  return await requestHandler("post", "/login", data);
};

export const registerRequest = async (data: LoginDto) => {
  return await requestHandler("post", "/register", data);
};

export const forgotPasswordRequest = async (data: ForgotPasswordDto) => {
  return await requestHandler("post", "/forgot-password", data);
};

export const verifyOtpRequest = async (data: VerifyOtpDto) => {
  return await requestHandler("post", "/verify-otp", data);
};

export const resetPasswordRequest = async (data: ResetPasswordDto) => {
  return await requestHandler("post", "/reset-password", data);
};
