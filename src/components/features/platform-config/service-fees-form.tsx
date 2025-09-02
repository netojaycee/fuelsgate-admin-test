"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/atoms/custom-input";
import { ServiceFeeConfig } from "@/types/platform-config.types";

const serviceFeesSchema = yup.object({
  transporterServiceFee: yup
    .number()
    .required("Transporter service fee is required")
    .min(0, "Fee must be greater than or equal to 0")
    .max(100, "Fee must be less than or equal to 100"),
  traderServiceFee: yup
    .number()
    .required("Trader service fee is required")
    .min(0, "Fee must be greater than or equal to 0")
    .max(100, "Fee must be less than or equal to 100"),
});

interface ServiceFeesFormProps {
  initialData?: ServiceFeeConfig;
  onSubmit: (data: ServiceFeeConfig) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ServiceFeesForm: React.FC<ServiceFeesFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFeeConfig>({
    resolver: yupResolver(serviceFeesSchema),
    defaultValues: {
      transporterServiceFee: 5,
      traderServiceFee: 3,
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        transporterServiceFee: initialData.transporterServiceFee,
        traderServiceFee: initialData.traderServiceFee,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-h-[70vh] overflow-y-auto'
    >
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Transporter Service Fee (%)
        </label>
        <CustomInput
          type='number'
          {...register("transporterServiceFee")}
          error={errors.transporterServiceFee?.message}
          className='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Trader Service Fee (%)
        </label>
        <CustomInput
          type='number'
          {...register("traderServiceFee")}
          error={errors.traderServiceFee?.message}
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
          {isLoading ? "Saving..." : "Update Service Fees"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceFeesForm;
