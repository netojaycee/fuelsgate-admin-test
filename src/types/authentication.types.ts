export type Roles = "admin" | "seller" | "transporter" | "buyer";

export type LoginDto = {
  email: string;
  password: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type VerifyOtpDto = {
  email: string;
  otp: string;
};

export type ResetPasswordDto = {
  email: string;
  password: string;
  confirmPassword: string;
};
