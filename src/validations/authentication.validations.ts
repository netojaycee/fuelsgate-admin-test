import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
  })
  .required();

export const verifyOtpSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
    otp: yup.string().required("Please enter otp that was sent to your mail"),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  })
  .required();
