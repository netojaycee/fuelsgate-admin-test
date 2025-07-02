"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Button } from "@/components/ui/button";
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from "@/types/product.types";
import CustomInput from "@/components/atoms/custom-input";
import ColorInput from "@/components/atoms/color-input";

const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  value: yup.string().required("Product value is required"),
  color: yup
    .string()
    .required("Primary color is required")
    .test("color-format", "Invalid color format", function (value) {
      if (!value) return false;
      const colors = value.split("-");
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      // First color is required and must be valid hex
      if (!hexRegex.test(colors[0])) return false;

      // If second color exists, it must be valid hex
      if (colors[1] && !hexRegex.test(colors[1])) return false;

      return true;
    }),
  unit: yup
    .string()
    .required("Unit is required")
    .oneOf(["Ltr", "MT"], "Please select a valid unit"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});

interface ProductFormProps {
  initialData?: ProductDto;
  onSubmit: (
    data: Omit<CreateProductDto, "status"> & { status: "active" | "inactive" }
  ) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      value: "",
      color: "",
      unit: "Ltr",
      status: "active",
    },
  });

  const statusValue = watch("status");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        value: initialData.value,
        color: initialData.color,
        unit: initialData.unit,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: CreateProductDto) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='space-y-4 flex flex-col h-[calc(80vh-100px)]'
    >
      <div className='flex-1 overflow-y-auto space-y-4 pr-4 -mr-4'>
        <CustomInput
          name='name'
          label='Product Name'
          register={register}
          error={errors.name?.message}
          placeholder='Enter product name'
        />

        <CustomInput
          name='value'
          label='Product Value'
          register={register}
          error={errors.value?.message}
          placeholder='Enter product value'
        />

        <div className='space-y-4'>
          <div>
            <ColorInput
              name='primaryColor'
              label='Primary Color'
              register={register}
              error={errors.color?.message}
              placeholder='Enter primary color (e.g., #FF0000)'
              value={watch("color")?.split("-")[0] || ""}
              onChange={(e) => {
                const secondColor = watch("color")?.split("-")[1] || "";
                setValue(
                  "color",
                  `${e.target.value}${secondColor ? `-${secondColor}` : ""}`
                );
              }}
            />
          </div>
          <div className='pl-6 border-l-2 border-gray-200'>
            <ColorInput
              name='secondaryColor'
              label='Secondary Color (Optional)'
              register={register}
              placeholder='Enter secondary color (e.g., #00FF00)'
              value={watch("color")?.split("-")[1] || ""}
              onChange={(e) => {
                const primaryColor = watch("color")?.split("-")[0] || "";
                setValue(
                  "color",
                  e.target.value
                    ? `${primaryColor}-${e.target.value}`
                    : primaryColor
                );
              }}
            />
            {watch("color")?.includes("-") && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='mt-2 text-red-500 hover:text-red-700'
                onClick={() => {
                  const primaryColor = watch("color")?.split("-")[0] || "";
                  setValue("color", primaryColor);
                }}
              >
                Remove Secondary Color
              </Button>
            )}
          </div>
        </div>

        <CustomSelect
          label='Unit'
          name='unit'
          options={[
            { label: "Liters (Ltr)", value: "Ltr" },
            { label: "Metric Tons (MT)", value: "MT" },
          ]}
          value={{
            label:
              watch("unit") === "Ltr" ? "Liters (Ltr)" : "Metric Tons (MT)",
            value: watch("unit"),
          }}
          onChange={(newValue: unknown) => {
            const selectedOption = newValue as {
              label: string;
              value: string;
            } | null;
            if (selectedOption?.value) {
              setValue("unit", selectedOption.value);
            }
          }}
          error={errors.unit?.message}
        />

        <CustomSelect
          label='Status'
          name='status'
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === statusValue)}
          onChange={(newValue: unknown) => {
            const selectedOption = newValue as {
              label: string;
              value: string;
            } | null;
            if (selectedOption?.value) {
              setValue("status", selectedOption.value as "active" | "inactive");
            }
          }}
          error={errors.status?.message}
        />
      </div>
      <div className='flex gap-3 pt-4 mt-auto border-t'>
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
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
