"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/atoms/custom-input";
import {
  CreatePlatformConfigDto,
  PlatformConfigDto,
  UpdatePlatformConfigDto,
} from "@/types/platform-config.types";

const configSchema = yup.object({
  key: yup.string().required("Key is required"),
  value: yup
    .number()
    .required("Value is required")
    .min(0, "Value must be greater than or equal to 0")
    .max(100, "Value must be less than or equal to 100"),
  description: yup.string(),
});

interface PlatformConfigFormProps {
  initialData?: PlatformConfigDto;
  onSubmit: (data: CreatePlatformConfigDto | UpdatePlatformConfigDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

const PlatformConfigForm: React.FC<PlatformConfigFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePlatformConfigDto>({
    resolver: yupResolver(configSchema),
    defaultValues: {
      key: "",
      value: 0,
      description: "",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        key: initialData.key,
        value: initialData.value,
        description: initialData.description || "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: CreatePlatformConfigDto) => {
    if (isEditMode) {
      const { key, ...updateData } = data;
      onSubmit(updateData as UpdatePlatformConfigDto);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Configuration Key
        </label>
        <CustomInput
          {...register("key")}
          error={errors.key?.message}
          className='w-full'
          disabled={isEditMode}
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Value (Percentage)
        </label>
        <CustomInput
          type='number'
          {...register("value")}
          error={errors.value?.message}
          className='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Description</label>
        <CustomInput
          {...register("description")}
          error={errors.description?.message}
          className='w-full'
        />
      </div>

      <div className='flex gap-3 pt-4'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : isEditMode
            ? "Update Configuration"
            : "Create Configuration"}
        </Button>
      </div>
    </form>
  );
};

export default PlatformConfigForm;
