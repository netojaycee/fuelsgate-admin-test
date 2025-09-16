"use client";

import React, { useEffect, useCallback, useState, useMemo } from "react";
import useStateHook from "@/hooks/useState.hook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CustomSelect,
  CustomSelectOption,
} from "@/components/atoms/custom-select";
import { Button } from "@/components/ui/button";
import { CreateTruckDto, TruckDto, UpdateTruckDto } from "@/types/truck.type";
import CustomInput from "@/components/atoms/custom-input";
import { CustomFileUpload } from "@/components/atoms/custom-fileupload";
import useProductHook from "@/hooks/useProduct.hook";
import useDepotHubHook from "@/hooks/useDepotHub.hook";
import useUserHook from "@/hooks/useUser.hook";
import { ProductDto } from "@/types/product.types";
import { DepotHubDto } from "@/types/depot-hub.types";
import {
  CustomProductOptionWrapper,
  CustomValueContainerWrapper,
} from "@/components/common/product-select-components";
import { TRUCK_SIZES, NON_TANKER_SIZES } from "@/lib/data";
import { LitreValueContainerWrapper } from "./truck-capacity-value";

const LOAD_STATUS_OPTIONS = [
  { label: "Loaded", value: "loaded" },
  { label: "Unloaded", value: "unloaded" },
];

// Truck type options
const TRUCK_TYPES = [
  { label: "Tanker", value: "tanker" },
  { label: "Flatbed", value: "flatbed" },
  { label: "SideWall", value: "sidewall" },
  { label: "Lowbed", value: "lowbed" },
];

const truckSchema = yup.object({
  truckNumber: yup.string().required("Truck number is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than 0"),
  productId: yup.string().optional(),
  depotHubId: yup.string().required("Depot hub is required"),
  depot: yup.string().required("Depot is required"),
  ownerId: yup.string().when("$hasOwnerDetails", {
    is: true,
    then: (schema) => schema.required("Owner is required"),
    otherwise: (schema) => schema.optional(),
  }),
  truckOwner: yup.string().when("$hasOwnerDetails", {
    is: true,
    then: (schema) => schema.required("Truck owner name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  ownerLogo: yup.string().optional(),
  deliveryType: yup.string().required("Delivery type is required"),
  loadStatus: yup.string().optional(),
});

const TRUCK_FUEL_TYPES = [
  { label: "CNG Powered", value: "cng" },
  { label: "Diesel Powered", value: "diesel" },
];

const TRUCK_CATEGORY_OPTIONS = [
  {
    label: "Category A++",
    value: "A++",
    description: "CNG Trucks",
    ageRange: "CNG only",
  },
  {
    label: "Category A",
    value: "A",
    description: "Modern Trucks",
    ageRange: "Less than 7 years old",
  },
  {
    label: "Category B",
    value: "B",
    description: "Mid-Age Trucks",
    ageRange: "7 to 15 years old",
  },
  {
    label: "Category C",
    value: "C",
    description: "Older Trucks",
    ageRange: "15+ years old",
  },
];

// Delivery type options
const DELIVERY_TYPES = [
  { label: "Bridging", value: "bridging" },
  { label: "Local", value: "local" },
];

const FLATBED_DELIVERY_TYPES = [
  { label: "In Country", value: "in_country" },
  { label: "Up Country", value: "up_country" },
];

interface TruckFormProps {
  initialData?: TruckDto;
  onSubmit: (data: CreateTruckDto | UpdateTruckDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type TruckFormFields = {
  truckNumber: string;
  capacity: number | string;
  productId?: string;
  depotHubId?: string;
  depot?: string;
  ownerId?: string;
  truckOwner?: string;
  ownerLogo?: string;
  deliveryType?: string;
  loadStatus?: "loaded" | "unloaded";
  truckType?: string;
  truckCategory: string;
  truckFuelType: string;
};

const TruckForm: React.FC<TruckFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  // State management similar to ListTruckModal
  const [product, setProduct] = useState<CustomSelectOption | undefined>(
    undefined
  );
  const [truckType, setTruckType] = useState<CustomSelectOption | undefined>(
    undefined
  );
  const [capacity, setCapacity] = useState<CustomSelectOption | undefined>(
    undefined
  );
  // flatbed specific state
  const [depotHub, setDepotHub] = useState<CustomSelectOption | undefined>(
    undefined
  );
  const [loadStatus, setLoadStatus] = useState<CustomSelectOption>(
    LOAD_STATUS_OPTIONS[1]
  ); // Default to Unloaded
  const [truckFuelType, setTruckFuelType] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [truckCategory, setTruckCategory] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [depot, setDepot] = useState<CustomSelectOption | undefined>(undefined);
  const [deliveryType, setDeliveryType] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [owner, setOwner] = useState<CustomSelectOption | undefined>(undefined);
  const [ownerLogo, setOwnerLogo] = useState<string>("");

  // Check if truck has owner details (admin-created truck)
  const hasOwnerDetails = useMemo(() => {
    return initialData
      ? !!(initialData.truckOwner && initialData.truckOwner.trim())
      : true;
  }, [initialData]);

  // const userEmails = [
  // { label: "DOCKYARD", email: "vohakim@fuelsgate.com" },
  // { label: "DANGOTE", email: "info@fuelsgate.com" },
  // { label: "COCONUT", email: "nohakim@fuelsgate.com" },
  //   ...(process.env.NODE_ENV === "development"
  //     ? [
  //         {
  //           label: "Jh",
  //           email: "edehjaycee@gmail.com",
  //         },
  //       ]
  //     : []),
  // ];

  const userEmails = [
    { label: "DOCKYARD", email: "fuelsgatedockyard@gmail.com" },
    { label: "DANGOTE", email: "fuelsgatedangote@gmail.com" },
    { label: "COCONUT", email: "fuelsgatecoconut@gmail.com" },
    { label: "SATELITE", email: "fuelsgatesatellite@gmail.com" },
    ...(process.env.NODE_ENV === "development"
      ? [
          {
            label: "Jh",
            email: "edehjaycee@gmail.com",
          },
        ]
      : []),
  ];

  const {
    setError,
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<TruckFormFields>({
    resolver: yupResolver(truckSchema) as any,
    context: { hasOwnerDetails },
    defaultValues: {
      truckNumber: "",
      capacity: 0,
      productId: "",
      depotHubId: "",
      depot: "",
      ownerId: hasOwnerDetails ? "" : undefined,
      truckOwner: hasOwnerDetails ? "" : undefined,
      ownerLogo: "",
      deliveryType: "",
      loadStatus: "unloaded", // Default to unloaded
      ...(initialData
        ? {
            truckNumber: initialData.truckNumber,
            capacity: initialData.capacity,
            productId:
              typeof initialData?.productId === "string"
                ? initialData?.productId
                : initialData?.productId?._id,
            depotHubId:
              typeof initialData?.depotHubId === "string"
                ? initialData?.depotHubId
                : initialData?.depotHubId?._id,
            depot: initialData.depot,
            ownerId: hasOwnerDetails ? initialData.ownerId || "" : undefined,
            truckOwner: hasOwnerDetails
              ? initialData.truckOwner || ""
              : undefined,
            ownerLogo: initialData.ownerLogo || "",
            truckFuelType: initialData?.truckFuelType || "",
            truckCategory: initialData?.truckCategory || "",
            truckType: initialData?.truckType || "tanker",

            loadStatus: initialData.loadStatus || "unloaded",
          }
        : {}),
    },
  });

  console.log(initialData, "initial")
  
  // Fetch products and depots
  const { useFetchProducts } = useProductHook();
  const { data: productsData, isLoading: loadingProducts } = useFetchProducts();
    useState<any>(undefined);

  const { useFetchDepotHubs } = useDepotHubHook();
  const { data: depotsData, isLoading: loadingDepots } = useFetchDepotHubs();

  // Fetch users by email
  const { useFetchUsersByEmail } = useUserHook();
  const { data: usersData, isLoading: loadingUsers } = useFetchUsersByEmail(
    userEmails.map((u) => u.email)
  );

  // console.log(usersData, "ffff");

  // Memoized options similar to ListTruckModal
  const products = useMemo(() => {
    if (productsData) {
      return productsData?.data?.products?.map((item: ProductDto) => ({
        color: item.color,
        slug: item.value,
        label: item.name,
        value: item._id,
      }));
    }
    return [];
  }, [productsData]);

  const handleCapacityChange = useCallback(
    (value: unknown) => {
      const selectedCapacity = value as CustomSelectOption;
      setCapacity(selectedCapacity);

      // Convert string value to number for the form
      if (selectedCapacity?.value) {
        setValue("capacity", Number(selectedCapacity.value));
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (capacity && capacity.value !== "others") {
      // Convert string value to number for the form
      setValue("capacity", Number(capacity.value));
    }
  }, [capacity, setValue]);

  // const depotHubs = useMemo(() => {
  //   if (depotsData) {
  //     return depotsData?.data?.map((item: DepotHubDto) => ({
  //       label: item.name,
  //       value: item._id,
  //     }));
  //   }
  //   return [];
  // }, [depotsData]);

  const depotHubs = useMemo(() => {
    if (!depotsData) return [];
    if (truckType?.value === "tanker") {
      return depotsData?.data
        ?.filter((item: DepotHubDto) => item.type === "tanker")
        .map((item: DepotHubDto) => ({
          label: item.name,
          value: item._id,
        }));
    } else if (truckType) {
      return depotsData?.data
        ?.filter((item: DepotHubDto) => item.type === "others")
        .map((item: DepotHubDto) => ({
          label: item.name,
          value: item._id,
        }));
    }
    return [];
  }, [depotsData, truckType]);

  const depots = useMemo(() => {
    if (depotHub) {
      return depotsData?.data
        ?.find((item: DepotHubDto) => item._id === depotHub.value)
        ?.depots?.sort((a: string, b: string) => a.localeCompare(b))
        ?.map((item: string) => ({
          label: item,
          value: item,
        }));
    }
    return [];
  }, [depotHub, depotsData]);

  const users = useMemo(() => {
    if (usersData) {
      return usersData?.data?.map((user: any) => {
        // Find the matching label from userEmails
        const emailConfig = userEmails.find((ue) => ue.email === user.email);
        const displayLabel = emailConfig
          ? `${emailConfig.label}: ${user.email}`
          : user.email; // Fallback to just email if no label found

        return {
          label: displayLabel,
          value: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email, // Keep email for reference
        };
      });
    }
    return [];
  }, [usersData, userEmails]);

  // Callback handlers similar to ListTruckModal
  const handleProductChange = useCallback((value: unknown) => {
    setProduct(value as CustomSelectOption);
  }, []);

  const handleDepotHubChange = useCallback((value: unknown) => {
    setDepotHub(value as CustomSelectOption);
  }, []);
  const handleTruckTypeChange = useCallback((value: unknown) => {
    const t = value as CustomSelectOption;
    setTruckType(t);
    // reset fields depending on type
    // if (t?.value === "flatbed") {
    //   // clear tanker-only fields
    //   setDepotHub(undefined);
    //   setDepot(undefined);
    //   setProduct(undefined);
    //   setCapacity(undefined);
    // }
  }, []);

  const handleDepotChange = useCallback((value: unknown) => {
    setDepot(value as CustomSelectOption);
  }, []);

  const handleDeliveryTypeChange = useCallback((value: unknown) => {
    setDeliveryType(value as CustomSelectOption);
  }, []);

  const handleOwnerChange = useCallback((value: unknown) => {
    setOwner(value as CustomSelectOption);
    // Manual entry for truck owner name - no auto-fill
  }, []);

  const handleOwnerLogoChange = useCallback(
    (url: string) => {
      setOwnerLogo(url);
      setValue("ownerLogo", url);
    },
    [setValue]
  );

  // Effects to sync with form values
  useEffect(() => {
    if (product) {
      setValue("productId", product.value);
    }
  }, [product, setValue]);
  useEffect(() => {
    if (truckType) {
      setValue("truckType", truckType.value as "tanker" | "flatbed");
    }
  }, [truckType, setValue]);

  useEffect(() => {
    if (loadStatus) {
      setValue("loadStatus", loadStatus.value as "loaded" | "unloaded");
    }
  }, [loadStatus, setValue]);

  useEffect(() => {
    if (depotHub) {
      setValue("depotHubId", depotHub.value);
    }
  }, [depotHub, setValue]);

  useEffect(() => {
    if (depot) {
      setValue("depot", depot.value);
    }
  }, [depot, setValue]);

  useEffect(() => {
    if (deliveryType) {
      setValue("deliveryType", deliveryType.value);
    }
  }, [deliveryType, setValue]);

  useEffect(() => {
    if (truckType)
      setValue(
        "truckType",
        truckType.value as "tanker" | "flatbed" | "sidewall" | "lowbed"
      );
    if (truckFuelType)
      setValue("truckFuelType", truckFuelType.value as "diesel" | "cng");
    if (truckCategory)
      setValue("truckCategory", truckCategory.value as "A++" | "A" | "B" | "C");
  }, [truckType, truckFuelType, truckCategory, setValue]);

  useEffect(() => {
    if (owner && hasOwnerDetails) {
      setValue("ownerId", owner.value);
    }
  }, [owner, setValue, hasOwnerDetails]);

  useEffect(() => {
    if (ownerLogo && hasOwnerDetails) {
      setValue("ownerLogo", ownerLogo);
    }
  }, [ownerLogo, setValue, hasOwnerDetails]);

  // Effect to set initial values from form data
  useEffect(() => {
    if (getValues("productId") && products && products.length > 0) {
      const _selectedProduct = products?.find(
        (item: CustomSelectOption) => item.value === getValues("productId")
      );
      if (_selectedProduct) setProduct(_selectedProduct);
    }

    if (getValues("depotHubId") && depotHubs && depotHubs.length > 0) {
      const _selectedDepotHub = depotHubs?.find(
        (item: CustomSelectOption) => item.value === getValues("depotHubId")
      );
      if (_selectedDepotHub) setDepotHub(_selectedDepotHub);
    }

    if (getValues("capacity")) {
      const capacityValue = getValues("capacity").toString();
      // Determine which sizes to use based on truckType
      const truckTypeValue = getValues("truckType");
      const sizeOptions =
      truckTypeValue && truckTypeValue === "tanker"
        ? TRUCK_SIZES
        : NON_TANKER_SIZES;

      const _selectedCapacity = sizeOptions?.find(
      (item: CustomSelectOption) => item.value === capacityValue
      );

      if (_selectedCapacity) {
      setCapacity(_selectedCapacity);
      }
    }
    // initialize truck type
    if (getValues("truckType")) {
      const _selectedTruckType = TRUCK_TYPES.find(
        (item: CustomSelectOption) => item.value === getValues("truckType")
      );
      if (_selectedTruckType) setTruckType(_selectedTruckType);
    }

    if (getValues("truckFuelType")) {
      const _selectedTruckFuelType = TRUCK_FUEL_TYPES.find(
        (item: CustomSelectOption) =>
          item.value === getValues("truckFuelType")
      );
      if (_selectedTruckFuelType) setTruckFuelType(_selectedTruckFuelType);
    }

    if (getValues("truckCategory")) {
      const _selectedTruckCategory = TRUCK_CATEGORY_OPTIONS.find(
        (item: CustomSelectOption) =>
          item.value === getValues("truckCategory")
      );
      if (_selectedTruckCategory) setTruckCategory(_selectedTruckCategory);
    }

    if (getValues("loadStatus")) {
      const _selectedLoadStatus = LOAD_STATUS_OPTIONS.find(
        (item: CustomSelectOption) =>
          item.value === getValues("loadStatus")
      );
      if (_selectedLoadStatus) setLoadStatus(_selectedLoadStatus);
    }

    if (getValues("depot") && depots && depots.length > 0) {
      const _selectedDepot = depots?.find(
        (item: CustomSelectOption) => item.value === getValues("depot")
      );
      if (_selectedDepot) setDepot(_selectedDepot);
    }

    if (getValues("ownerId") && users && users.length > 0 && hasOwnerDetails) {
      const _selectedOwner = users?.find(
        (item: CustomSelectOption) => item.value === getValues("ownerId")
      );
      if (_selectedOwner) {
        setOwner(_selectedOwner);
      }
    }

    if (getValues("ownerLogo") && hasOwnerDetails) {
      setOwnerLogo(getValues("ownerLogo") || "");
    }

    // Initialize delivery type based on initial data or truck number format
    if (initialData && getValues("truckNumber")) {
      const truckNumber = getValues("truckNumber").toString();
      let _selectedDeliveryType;

      // For edit mode, determine delivery type from truck number format
      if (truckNumber.startsWith("B/L-")) {
        _selectedDeliveryType = DELIVERY_TYPES.find(
          (item) => item.value === "bridging"
        );
      } else if (truckNumber.startsWith("L-")) {
        _selectedDeliveryType = DELIVERY_TYPES.find(
          (item) => item.value === "local"
        );
      }

      if (_selectedDeliveryType) {
        setDeliveryType(_selectedDeliveryType);
        setValue("deliveryType", _selectedDeliveryType.value);
      }
    } else if (!initialData && getValues("truckNumber")) {
      // For create mode, initialize delivery type based on truck number format
      const truckNumber = getValues("truckNumber").toString();
      let _selectedDeliveryType;

      if (truckNumber.startsWith("B/L-")) {
        _selectedDeliveryType = DELIVERY_TYPES.find(
          (item) => item.value === "bridging"
        );
      } else if (truckNumber.startsWith("L-")) {
        _selectedDeliveryType = DELIVERY_TYPES.find(
          (item) => item.value === "local"
        );
      }

      if (_selectedDeliveryType) {
        setDeliveryType(_selectedDeliveryType);
        setValue("deliveryType", _selectedDeliveryType.value);
      }
    }
  }, [
    depots,
    getValues,
    products,
    depotHubs,
    setValue,
    users,
    hasOwnerDetails,
    initialData,
  ]);

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
      <form
        onSubmit={handleSubmit((data) => {
          // Validate delivery type
          if (!data.deliveryType) {
            setError("deliveryType", {
              type: "manual",
              message: "Delivery type is required",
            });
            return;
          }

          if (!data.loadStatus) {
            setError("loadStatus", {
              type: "manual",
              message: "Load status is required",
            });
            return;
          }

          // Format truck number based on delivery type
          if (data.deliveryType && data.truckNumber) {
            const rawTruckNumber = (data as any).truckNumber
              .replace(/^B\/L-/, "") // Remove existing B/L- prefix
              .replace(/^B-L-/, "")
              .replace(/^L-/, ""); // Remove existing L- prefix

            // For flatbed: up_country -> B/L- (same as bridging), in_country -> L-
            if (
              data.deliveryType === "bridging" ||
              data.deliveryType === "up_country"
              // Remove loadStatus and productId if truckType is not 'tanker'
            ) {
              (data as any).truckNumber = `B/L-${rawTruckNumber}`;
            } else {
              (data as any).truckNumber = `L-${rawTruckNumber}`;
            }
          }

          // Include ownerLogo from state if it exists
          if (ownerLogo) {
            (data as any).ownerLogo = ownerLogo;
          }

          // Remove deliveryType from data before sending to API
          const { deliveryType, ...truckData } = data;
          if (truckData.truckType !== "tanker") {
            delete truckData.loadStatus;
            delete truckData.productId;
          }

          // For edit mode with owner details, send both ownerId and profileType/profileId
          const sanitizeCapacity = (payload: any) => {
            if (
              payload &&
              payload.capacity !== undefined &&
              payload.capacity !== null
            ) {
              const num = Number(payload.capacity);
              if (!isNaN(num)) payload.capacity = num;
              else delete payload.capacity;
            }
            return payload;
          };

          if (
            initialData &&
            hasOwnerDetails &&
            initialData.profileType &&
            initialData.profileId
          ) {
            const editData = {
              ...truckData,
              profileType: initialData.profileType,
              profileId: initialData.profileId._id,
              // Keep ownerId in edit data as well
            };
            onSubmit(sanitizeCapacity(editData));
          } else {
            console.log({ ...truckData });
            // For create mode or trucks without owner details
            onSubmit(sanitizeCapacity({ ...truckData }));
          }
        })}
        className="space-y-4 pb-6"
      >
        <div className="bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3">
          {/* <CustomSelect
            name='truckType'
            label='Truck Type'
            options={TRUCK_TYPES}
            value={truckType}
            onChange={handleTruckTypeChange}
            error={errors.truckType as any}
          /> */}

          <div className="col-span-full" style={{ pointerEvents: "auto" }}>
            {/* Original CustomSelect - commented for debugging */}
            <CustomSelect
              name="truckType"
              label="Truck Type"
              options={TRUCK_TYPES}
              value={truckType}
              onChange={handleTruckTypeChange}
              error={errors.truckType?.message}
              // classNames="relative z-50"
              placeholder="Truck type"
            />
          </div>
          {truckType?.value === "tanker" && (
            <div className="col-span-full " style={{ pointerEvents: "auto" }}>
              {" "}
              <CustomSelect
                name="productId"
                label="Product"
                options={products}
                Option={CustomProductOptionWrapper}
                ValueContainer={CustomValueContainerWrapper}
                value={product}
                onChange={handleProductChange}
                error={errors.productId?.message}
                isDisabled={loadingProducts}
                classNames="col-span-full"
              />
            </div>
          )}
          <CustomInput
            type="text"
            name="truckNumber"
            label="Truck Number"
            register={register}
            error={errors.truckNumber?.message}
          />
          <CustomSelect
            name="deliveryType"
            label="Delivery Type"
            options={
              truckType?.value === "tanker"
                ? DELIVERY_TYPES
                : FLATBED_DELIVERY_TYPES
            }
            value={deliveryType}
            onChange={handleDeliveryTypeChange}
            error={errors.deliveryType?.message}
          />

          <div className="">
            <CustomSelect
              name="truckFuelType"
              label="Truck Fuel Type"
              options={TRUCK_FUEL_TYPES}
              value={truckFuelType}
              onChange={(value) => {
                setTruckFuelType(value as CustomSelectOption);
                // Reset truck category when fuel type changes
                setTruckCategory(undefined);
              }}
              error={errors.truckFuelType?.message}
              classNames=" mt-2"
              placeholder="Fuel type"
            />
          </div>

          <div className="">
            <CustomSelect
              label="Truck Category"
              name="truckCategory"
              options={
                truckFuelType?.value === "cng"
                  ? TRUCK_CATEGORY_OPTIONS.filter(
                      (opt) => opt.value === "A++"
                    ).map((opt) => ({
                      label: `${opt.label} — ${opt.description} (${opt.ageRange})`,
                      value: opt.value,
                    }))
                  : TRUCK_CATEGORY_OPTIONS.filter(
                      (opt) => opt.value !== "A++"
                    ).map((opt) => ({
                      label: `${opt.label} — ${opt.description} (${opt.ageRange})`,
                      value: opt.value,
                    }))
              }
              value={truckCategory}
              onChange={(value) =>
                setTruckCategory(value as CustomSelectOption)
              }
              placeholder="Truck category"
              classNames="border-gray-300 mt-2"
              isDisabled={!truckFuelType}
            />
            <div className="text-xs text-gray-500 mt-1">
              Note: Older trucks tend to consume more fuel.
            </div>
          </div>
          {/* <CustomSelect
            name='loadStatus'
            label='Load Status'
            options={LOAD_STATUS_OPTIONS}
            value={loadStatus}
            onChange={(value: unknown) =>
              setLoadStatus(value as CustomSelectOption)
            }
            error={errors.loadStatus?.message}
          />
          <CustomSelect
            name='size'
            label='Capacity'
            options={TRUCK_SIZES}
            value={capacity}
            onChange={handleCapacityChange}
            error={errors.capacity?.message}
            ValueContainer={LitreValueContainerWrapper}
            // classNames='w-full col-span-full'
          /> */}

          {truckType?.value === "tanker" ? (
            <div className="col-span-full flex gap-3">
              <div className="flex-1">
                <CustomSelect
                  name="capacity"
                  label="Capacity"
                  options={TRUCK_SIZES}
                  value={capacity}
                  onChange={handleCapacityChange}
                  error={errors.capacity?.message}
                  ValueContainer={LitreValueContainerWrapper}
                  classNames=""
                  // unit="Ltr"
                  placeholder="Capacity"
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  name="loadStatus"
                  label="Load Status"
                  options={LOAD_STATUS_OPTIONS}
                  value={loadStatus}
                  onChange={(value: unknown) =>
                    setLoadStatus(value as CustomSelectOption)
                  }
                  error={errors.loadStatus?.message}
                  classNames=""
                />
              </div>
            </div>
          ) : (
            <div className="col-span-full ">
              <CustomSelect
                name="capacity"
                label="Capacity"
                options={NON_TANKER_SIZES}
                value={capacity}
                onChange={handleCapacityChange}
                error={errors.capacity?.message}
                ValueContainer={LitreValueContainerWrapper}
                classNames=""
                // unit="Tons"
                placeholder="Capacity"
              />
            </div>
          )}
        </div>

        <div className="bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3">
          <CustomSelect
            name="depotHubId"
            label="Hub"
            options={depotHubs}
            value={depotHub}
            onChange={handleDepotHubChange}
            error={errors.depotHubId?.message}
            isDisabled={loadingDepots}
          />
          <CustomSelect
            name="depot"
            label="Depot"
            options={depots}
            value={depot}
            onChange={handleDepotChange}
            error={errors.depot?.message}
            isDisabled={!depotHub}
          />
        </div>

        {/* Owner fields - only show if hasOwnerDetails is true */}
        {hasOwnerDetails && (
          <div className="bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3">
            <CustomSelect
              name="ownerId"
              label="Owner (Required)"
              options={users}
              value={owner}
              onChange={handleOwnerChange}
              error={errors.ownerId?.message}
              isDisabled={loadingUsers || !!initialData} // Disabled in edit mode
            />
            <CustomInput
              type="text"
              name="truckOwner"
              label="Truck Owner Name (Required)"
              register={register}
              error={errors.truckOwner?.message}
            />
            <div className="col-span-full">
              <CustomFileUpload
                name="ownerLogo"
                label="Owner Logo (Optional)"
                fileType="image"
                customLabel="Owner Logo"
                defaultValue={ownerLogo}
                onChange={handleOwnerLogoChange}
                error={errors.ownerLogo?.message}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : initialData
              ? "Update Truck"
              : "Create Truck"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TruckForm;
