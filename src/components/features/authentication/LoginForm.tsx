"use client";
import React from "react";
import CustomButton from "@/components/atoms/custom-button";
import CustomInput from "@/components/atoms/custom-input";
import useAuthenticationHook from "@/hooks/useAuthentication.hooks";
import { LoginDto } from "@/types/authentication.types";
import { loginSchema } from "@/validations/authentication.validations";
import { renderErrors } from "@/utils/renderErrors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = () => {
  const { useLogin } = useAuthenticationHook();
  const { mutateAsync: login, isPending } = useLogin;

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      await login(data);
    } catch (error: any) {
      renderErrors(error?.errors, setError);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Email Address"
        type="email"
        name="email"
        register={register}
        classNames="mb-4"
        error={errors.email?.message}
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        register={register}
        classNames="mb-4"
        error={errors.password?.message}
      />
      <CustomButton
        variant="primary"
        label="Login"
        type="submit"
        loading={isPending}
      />
    </form>
  );
};

export default LoginForm;
