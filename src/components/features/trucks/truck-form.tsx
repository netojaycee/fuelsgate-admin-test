"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Button } from "@/components/ui/button";
import { CreateTruckDto, TruckDto, UpdateTruckDto } from "@/types/truck.type";
import CustomInput from "@/components/atoms/custom-input";
import useProductHook from "@/hooks/useProduct.hook";
import useDepotHubHook from "@/hooks/useDepotHub.hook";
import { ProductDto } from "@/types/product.types";
import { DepotHubDto } from "@/types/depot-hub.types";

const truckSchema = yup.object({
  truckNumber: yup.string().required("Truck number is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than 0"),
  productId: yup.string().required("Product is required"),
  depotHubId: yup.string().required("Depot hub is required"),
  depot: yup.string().required("Depot is required"),
  currentState: yup.string().required("Current state is required"),
  currentCity: yup.string().required("Current city is required"),
});

interface TruckFormProps {
  initialData?: TruckDto;
  onSubmit: (data: CreateTruckDto | UpdateTruckDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TruckForm: React.FC<TruckFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateTruckDto>({
    resolver: yupResolver(truckSchema),
    defaultValues: {
      truckNumber: "",
      capacity: 0,
      productId: "",
      depotHubId: "",
      depot: "",
      currentState: "",
      currentCity: "",
    },
  });

  // Fetch products and depots
  const { useFetchProducts } = useProductHook();
  const { data: productsData, isLoading: loadingProducts } = useFetchProducts();

  const { useFetchDepotHubs } = useDepotHubHook();
  const { data: depotsData, isLoading: loadingDepots } = useFetchDepotHubs();

  // Watch for depot hub changes
  const selectedDepotHub = watch("depotHubId");

  useEffect(() => {
    if (initialData) {
      reset({
        truckNumber: initialData.truckNumber,
        capacity: initialData.capacity,
        productId:
          typeof initialData.productId === "string"
            ? initialData.productId
            : initialData.productId._id,
        depotHubId:
          typeof initialData.depotHubId === "string"
            ? initialData.depotHubId
            : initialData.depotHubId._id,
        depot: initialData.depot,
        currentState: initialData.currentState,
        currentCity: initialData.currentCity,
      });
    }
  }, [initialData, reset]);

  // Get depots for selected depot hub
  const selectedDepotHubData = depotsData?.data?.depotHubs?.find(
    (hub: DepotHubDto) => hub._id === selectedDepotHub
  );

  const depotOptions =
    selectedDepotHubData?.depots?.map((depot: string) => ({
      label: depot,
      value: depot,
    })) || [];

  const productOptions =
    productsData?.data?.products?.map((product: ProductDto) => ({
      label: product.name,
      value: product._id,
    })) || [];

  const depotHubOptions =
    depotsData?.data?.depotHubs?.map((hub: DepotHubDto) => ({
      label: hub.name,
      value: hub._id,
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Truck Number
        </label>
        <CustomInput
          {...register("truckNumber")}
          error={errors.truckNumber?.message}
          className='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Capacity (Litres)
        </label>
        <CustomInput
          type='number'
          {...register("capacity")}
          error={errors.capacity?.message}
          className='w-full'
        />
      </div>

    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-700'>Product</label>
      <CustomSelect
      name="productId"
        options={productOptions}
        value={productOptions.find((opt: any) => opt.value === watch("productId"))}
        onChange={(selected: any) => setValue("productId", selected?.value)}
        error={errors.productId?.message}
        isDisabled={loadingProducts}
        height='40px'
        classNames='w-full'
      />
    </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Depot Hub</label>
        <CustomSelect
        name="depotHubId"
          options={depotHubOptions}
          value={depotHubOptions.find(
            (opt: any) => opt.value === watch("depotHubId")
          )}
          onChange={(selected: any) => {
            setValue("depotHubId", selected?.value);
            setValue("depot", ""); // Reset depot when depot hub changes
          }}
          error={errors.depotHubId?.message}
          isDisabled={loadingDepots}
          height='40px'
          classNames='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Depot</label>
        <CustomSelect
        name="depot"
          options={depotOptions}
          value={depotOptions.find((opt: any) => opt.value === watch("depot"))}
          onChange={(selected: any) => setValue("depot", selected?.value)}
          error={errors.depot?.message}
          isDisabled={!selectedDepotHub}
          height='40px'
          classNames='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Current State
        </label>
        <CustomInput
          {...register("currentState")}
          error={errors.currentState?.message}
          className='w-full'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>
          Current City
        </label>
        <CustomInput
          {...register("currentCity")}
          error={errors.currentCity?.message}
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
            : initialData
            ? "Update Truck"
            : "Create Truck"}
        </Button>
      </div>
    </form>
  );
};

export default TruckForm;
