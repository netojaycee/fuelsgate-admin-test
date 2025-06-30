"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/atoms/custom-input";
import CustomButton from "@/components/atoms/custom-button";
import { Text } from "@/components/atoms/text";
import { priceSchema } from "@/validations/pricing.validation";
import { PriceFormData } from "@/types/pricing.types";
import {
  CustomSelect,
  CustomSelectOption,
} from "@/components/atoms/custom-select";
import { ProductDto } from "@/types/product.types";
import { DepotHubDto } from "@/types/depot-hub.types";
import useProductHook from "@/hooks/useProduct.hook";
import useDepotHubHook from "@/hooks/useDepotHub.hook";
import {
  CustomProductOptionWrapper,
  CustomValueContainerWrapper,
} from "@/components/common/product-select-components";
import usePricingHook from "@/hooks/usePricing.hook";

const PriceForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [positive, setPositive] = useState<CustomSelectOption | undefined>(
    undefined
  );
  const [depot, setDepot] = useState<CustomSelectOption | undefined>(undefined);
  const { useFetchDepotHubs } = useDepotHubHook();
  const { data: depotsRes, isLoading: loadingDepots } = useFetchDepotHubs();
  const { useFetchProducts } = useProductHook();
  const { data: productsRes, isLoading: loadingProducts } = useFetchProducts();
  const [city, setCity] = useState<CustomSelectOption | undefined>(undefined);
  const { useCreatePricing } = usePricingHook();
  const { mutateAsync: createPricing, isPending: isSavingData } =
    useCreatePricing();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<PriceFormData>({
    resolver: yupResolver(priceSchema),
  });

  const onSubmit = async (data: PriceFormData) => {
    try {
      createPricing({ ...data, positive: positive?.value === "true" });
      setSelectedProduct(undefined);
      setDepot(undefined);
      setCity(undefined);
      setValue("productId", "");
      setValue("depotHubId", "");
      setValue("depot", "");
      setValue("price", 0);
      setPositive(undefined);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const depots = useMemo(() => {
    if (depotsRes) {
      return depotsRes?.data
        ?.sort((a: DepotHubDto, b: DepotHubDto) => a.name.localeCompare(b.name))
        ?.map((item: DepotHubDto) => ({
          label: item.name,
          value: item._id,
        }));
    }
  }, [depotsRes]);

  const cities = useMemo(() => {
    if (depot) {
      return depotsRes?.data
        ?.find((item: DepotHubDto) => item._id === depot.value)
        ?.depots?.sort((a: string, b: string) => a.localeCompare(b))
        ?.map((item: string) => ({
          label: item,
          value: item,
        }));
    }
  }, [depot, depotsRes]);

  const products = useMemo(() => {
    if (productsRes) {
      return productsRes?.data?.products.map((item: ProductDto) => ({
        color: item.color,
        slug: item.value,
        label: item.value.toLocaleUpperCase(),
        value: item._id,
      }));
    }
  }, [productsRes]);

  useEffect(() => {
    if (depot) {
      setValue("depotHubId", depot.value);
    }
  }, [depot, setValue]);

  const handleDepotChange = useCallback((value: unknown) => {
    setDepot(value as CustomSelectOption);
  }, []);

  const handleProductsChange = useCallback((value: unknown) => {
    setSelectedProduct(value as CustomSelectOption);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setValue("productId", selectedProduct.value);
    }
  }, [selectedProduct, setValue]);

  useEffect(() => {
    if (positive) {
      setValue("positive", positive.value === "true");
    }
  }, [positive, setValue]);

  const handlePositiveChange = useCallback((value: unknown) => {
    setPositive(value as CustomSelectOption);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setValue("productId", selectedProduct.value);
    }
  }, [selectedProduct, setValue]);

  useEffect(() => {
    if (city) {
      setValue("depot", city.value);
    }
  }, [city, setValue]);

  const handleCityChange = useCallback((value: unknown) => {
    setCity(value as CustomSelectOption);
  }, []);

  useEffect(() => {
    if (getValues("productId") && products && products.length > 0) {
      const _selectedProduct = products?.find(
        (item: CustomSelectOption) => item.value === getValues("productId")
      );
      if (_selectedProduct) setSelectedProduct(_selectedProduct);
    }

    if (getValues("depotHubId")) {
      const _selectedDepotHub = depots?.find(
        (item: CustomSelectOption) => item.value === getValues("depotHubId")
      );
      if (_selectedDepotHub) setDepot(_selectedDepotHub);
    }

    if (getValues("depot")) {
      const _selectedCity = cities?.find(
        (item: CustomSelectOption) => item.value === getValues("depot")
      );
      if (_selectedCity) setCity(_selectedCity);
    }
  }, [cities, getValues, products, depots]);

  return (
    <div className="w-full mx-auto p-6 bg-slate-100 rounded-lg">
      <Text variant="pl" fontWeight="semibold" classNames="mb-6">
        Create New Price
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        <CustomSelect
          label="Product Name"
          name="productName"
          error={errors.productId?.message}
          classNames="col-span-2"
          options={products}
          value={selectedProduct}
          onChange={handleProductsChange}
          Option={CustomProductOptionWrapper}
          ValueContainer={CustomValueContainerWrapper}
          isDisabled={loadingProducts || isSavingData}
        />

        <CustomSelect
          label="Depot Hub"
          name="depotHub"
          error={errors.depotHubId?.message}
          options={depots}
          value={depot}
          onChange={handleDepotChange}
          isDisabled={loadingDepots || isSavingData}
        />

        <CustomSelect
          name="depot"
          label="Depot"
          options={cities}
          value={city}
          onChange={handleCityChange}
          error={errors.depot?.message}
          isDisabled={loadingDepots || isSavingData}
        />

        <CustomInput
          label="Price"
          name="price"
          type="number"
          register={register}
          error={errors.price?.message}
          disabled={isSavingData}
        />

        <CustomSelect
          name="positive"
          label="Positive"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          value={positive}
          onChange={handlePositiveChange}
          error={errors.positive?.message}
          isDisabled={loadingDepots || isSavingData}
        />

        <CustomButton
          variant="primary"
          label="Create Price"
          type="submit"
          loading={isSavingData}
          classNames="col-span-2"
        />
      </form>
    </div>
  );
};

export default PriceForm;
