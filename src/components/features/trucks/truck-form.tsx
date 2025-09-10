"use client";

import React, { useEffect, useCallback, useState, useMemo } from "react";
import useStateHook from '@/hooks/useState.hook';
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
import { TRUCK_SIZES } from "@/lib/data";
import { LitreValueContainerWrapper } from "./truck-capacity-value";

const LOAD_STATUS_OPTIONS = [
  { label: "Loaded", value: "loaded" },
  { label: "Unloaded", value: "unloaded" },
];

// Truck type options
const TRUCK_TYPES = [
  { label: 'Tanker', value: 'tanker' },
  { label: 'Flat Bed', value: 'flatbed' },
];

const FLATBED_SUBTYPES = [
  { label: 'Standard (48-53\')', value: 'standard' },
  { label: 'Step-deck', value: 'step-deck' },
  { label: 'Double-drop', value: 'double-drop' },
  { label: 'Extendable', value: 'extendable' },
  { label: 'Conestoga', value: 'conestoga' },
  { label: 'Side-kit', value: 'side-kit' },
];

const EQUIPMENT_OPTIONS = [
  { label: 'Tarps', value: 'tarps' },
  { label: 'Chains', value: 'chains' },
  { label: 'Straps', value: 'straps' },
  { label: 'Binders', value: 'binders' },
  { label: 'Winches', value: 'winches' },
];

const CARGO_TYPES = [
  { label: 'Lumber', value: 'lumber' },
  { label: 'Steel', value: 'steel' },
  { label: 'Machinery', value: 'machinery' },
  { label: 'Pipes', value: 'pipes' },
  { label: 'Building materials', value: 'building_materials' },
];

const COUNTRY_OPTIONS = [
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Kenya', value: 'Kenya' },
];

const truckSchema = yup.object({
  truckNumber: yup.string().required("Truck number is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than 0"),
  productId: yup.string().required("Product is required"),
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
  loadStatus: yup.string().required("Load status is required"),
});

// Delivery type options
const DELIVERY_TYPES = [
  { label: "Bridging", value: "bridging" },
  { label: "Local", value: "local" },
];

const FLATBED_DELIVERY_TYPES = [
  { label: 'In Country', value: 'in_country' },
  { label: 'Up Country', value: 'up_country' },
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
  // flatbed fields
  flatbedSubtype?: string;
  deckLengthFt?: string;
  deckWidthFt?: string;
  maxPayloadKg?: string;
  equipment?: string[];
  preferredCargoTypes?: string[];
  permitRequired?: string;
  notes?: string;
  country?: string;
  city?: string;
  address?: string;
  currentState?: string;
  currentCity?: string;
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
  const [truckType, setTruckType] = useState<CustomSelectOption | undefined>(undefined);
  const [capacity, setCapacity] = useState<CustomSelectOption | undefined>(
    undefined
  );
  // flatbed specific state
  const [flatbedSubtype, setFlatbedSubtype] = useState<CustomSelectOption | undefined>(undefined);
  const [deckLengthFt, setDeckLengthFt] = useState<string>('');
  const [deckWidthFt, setDeckWidthFt] = useState<string>('8.5');
  const [maxPayloadKg, setMaxPayloadKg] = useState<string>('');
  const [equipment, setEquipment] = useState<CustomSelectOption[] | undefined>(undefined);
  const [preferredCargoTypes, setPreferredCargoTypes] = useState<CustomSelectOption[] | undefined>(undefined);
  const [permitRequired, setPermitRequired] = useState<CustomSelectOption | undefined>(undefined);
  const [notes, setNotes] = useState<string>('');
  const [country, setCountry] = useState<CustomSelectOption | undefined>(COUNTRY_OPTIONS[0]);
  const [city, setCity] = useState<CustomSelectOption | undefined>(undefined);
  const [address, setAddress] = useState<string>('');
  const [selectedState, setSelectedState] = useState<CustomSelectOption | undefined>(undefined);
  const [selectedLGA, setSelectedLGA] = useState<CustomSelectOption | undefined>(undefined);
  const [depotHub, setDepotHub] = useState<CustomSelectOption | undefined>(
    undefined
  );
  const [loadStatus, setLoadStatus] = useState<CustomSelectOption>(
    LOAD_STATUS_OPTIONS[1]
  ); // Default to Unloaded
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
            loadStatus: initialData.loadStatus || "unloaded",
          }
        : {}),
    },
  });

  // Fetch products and depots
  const { useFetchProducts } = useProductHook();
  const { data: productsData, isLoading: loadingProducts } = useFetchProducts();
  const { useFetchStates, useFetchStateLGA } = useStateHook();
  const { data: statesRes } = useFetchStates;
  const [selectedStateForFlatbed, setSelectedStateForFlatbed] = useState<any>(undefined);
  const { data: lgaRes } = useFetchStateLGA(selectedStateForFlatbed?.value);

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
  const states = useMemo(() => (statesRes ? statesRes.map((s:any) => ({ label: s, value: s })) : []), [statesRes]);
  const lgas = useMemo(() => (lgaRes ? lgaRes.map((l:any) => ({ label: l, value: l })) : []), [lgaRes]);

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

  const depotHubs = useMemo(() => {
    if (depotsData) {
      return depotsData?.data?.map((item: DepotHubDto) => ({
        label: item.name,
        value: item._id,
      }));
    }
    return [];
  }, [depotsData]);

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
    if (t?.value === 'flatbed') {
      // clear tanker-only fields
      setDepotHub(undefined);
      setDepot(undefined);
      setProduct(undefined);
      setCapacity(undefined);
    } else {
      // clear flatbed-only fields
      setFlatbedSubtype(undefined);
      setDeckLengthFt('');
      setDeckWidthFt('8.5');
      setMaxPayloadKg('');
      setEquipment(undefined);
      setPreferredCargoTypes(undefined);
      setPermitRequired(undefined);
      setNotes('');
      setCountry(COUNTRY_OPTIONS[0]);
      setCity(undefined);
      setAddress('');
    }
  }, []);
  const handleFlatbedSubtypeChange = useCallback((value: unknown) => { setFlatbedSubtype(value as CustomSelectOption); }, []);
  const handleEquipmentChange = useCallback((value: unknown) => { setEquipment(value as CustomSelectOption[]); }, []);
  const handlePreferredCargoChange = useCallback((value: unknown) => { setPreferredCargoTypes(value as CustomSelectOption[]); }, []);
  const handleCountryChange = useCallback((value: unknown) => { setCountry(value as CustomSelectOption); setCity(undefined); }, []);
  const handleCityChange = useCallback((value: unknown) => { setCity(value as CustomSelectOption); }, []);
  const handleStateChange = useCallback((value: unknown) => { setSelectedStateForFlatbed(value as CustomSelectOption); setSelectedLGA(undefined); }, []);
  const handleLGAChange = useCallback((value: unknown) => { setSelectedLGA(value as CustomSelectOption); }, []);

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
      setValue('truckType', truckType.value as 'tanker' | 'flatbed');
    }
  }, [truckType, setValue]);
  // bind flatbed fields to form values
  useEffect(() => {
    if (flatbedSubtype) setValue('flatbedSubtype', flatbedSubtype.value);
    if (deckLengthFt !== undefined) setValue('deckLengthFt', deckLengthFt);
    if (deckWidthFt !== undefined) setValue('deckWidthFt', deckWidthFt);
    if (maxPayloadKg !== undefined) setValue('maxPayloadKg', maxPayloadKg);
    if (equipment) setValue('equipment', equipment.map((e) => e.value));
    if (preferredCargoTypes) setValue('preferredCargoTypes', preferredCargoTypes.map((c) => c.value));
    if (permitRequired) setValue('permitRequired', permitRequired?.value);
    if (notes !== undefined) setValue('notes', notes);
    if (country) setValue('country', country.value);
    if (city) setValue('city', city?.value || '');
    if (address !== undefined) setValue('address', address);
  }, [flatbedSubtype, deckLengthFt, deckWidthFt, maxPayloadKg, equipment, preferredCargoTypes, permitRequired, notes, country, city, address, setValue]);

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
      const _selectedCapacity = TRUCK_SIZES?.find(
        (item: CustomSelectOption) => item.value === capacityValue
      );

      if (_selectedCapacity) {
        setCapacity(_selectedCapacity);
      }
    }
    // initialize truck type
    if (getValues('truckType')) {
      const _selectedTruckType = TRUCK_TYPES.find(
        (item: CustomSelectOption) => item.value === getValues('truckType'),
      );
      if (_selectedTruckType) setTruckType(_selectedTruckType);
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
    <div className='max-h-[calc(100vh-200px)] overflow-y-auto pr-2'>
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
            if (data.deliveryType === "bridging" || data.deliveryType === 'up_country') {
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

          // For edit mode with owner details, send both ownerId and profileType/profileId
          const sanitizeCapacity = (payload: any) => {
            if (payload && payload.capacity !== undefined && payload.capacity !== null) {
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
            // For create mode or trucks without owner details
            onSubmit(sanitizeCapacity({ ...truckData }));
          }
        })}
        className='space-y-4 pb-6'
      >
        <div className='bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3'>
          <CustomSelect
            name='truckType'
            label='Truck Type'
            options={TRUCK_TYPES}
            value={truckType}
            onChange={handleTruckTypeChange}
            error={errors.truckType as any}
          />

          <CustomInput
            type='text'
            name='truckNumber'
            label='Truck Number'
            register={register}
            error={errors.truckNumber?.message}
          />
          <CustomSelect
            name='deliveryType'
            label='Delivery Type'
            options={truckType?.value === 'flatbed' ? FLATBED_DELIVERY_TYPES : DELIVERY_TYPES}
            value={deliveryType}
            onChange={handleDeliveryTypeChange}
            error={errors.deliveryType?.message}
          />
          <CustomSelect
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
          />
        </div>

        <div className='bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3'>
          <CustomSelect
            name='productId'
            label='Product'
            options={products}
            Option={CustomProductOptionWrapper}
            ValueContainer={CustomValueContainerWrapper}
            value={product}
            onChange={handleProductChange}
            error={errors.productId?.message}
            isDisabled={loadingProducts}
            classNames='col-span-full'
          />
        </div>

        <div className='bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3'>
          <CustomSelect
            name='depotHubId'
            label='Depot Hub'
            options={depotHubs}
            value={depotHub}
            onChange={handleDepotHubChange}
            error={errors.depotHubId?.message}
            isDisabled={loadingDepots}
          />
          <CustomSelect
            name='depot'
            label='Depot'
            options={depots}
            value={depot}
            onChange={handleDepotChange}
            error={errors.depot?.message}
            isDisabled={!depotHub}
          />
        </div>

        {/* Owner fields - only show if hasOwnerDetails is true */}
        {hasOwnerDetails && (
          <div className='bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-3'>
            <CustomSelect
              name='ownerId'
              label='Owner (Required)'
              options={users}
              value={owner}
              onChange={handleOwnerChange}
              error={errors.ownerId?.message}
              isDisabled={loadingUsers || !!initialData} // Disabled in edit mode
            />
            <CustomInput
              type='text'
              name='truckOwner'
              label='Truck Owner Name (Required)'
              register={register}
              error={errors.truckOwner?.message}
            />
            <div className='col-span-full'>
              <CustomFileUpload
                name='ownerLogo'
                label='Owner Logo (Optional)'
                fileType='image'
                customLabel='Owner Logo'
                defaultValue={ownerLogo}
                onChange={handleOwnerLogoChange}
                error={errors.ownerLogo?.message}
              />
            </div>
          </div>
        )}

        {/* <div className='bg-light-gray-150 grid grid-cols-2 gap-3 py-[10px] px-4 rounded-[10px] mb-8'>
          <CustomInput
            name='currentState'
            label='Current State'
            register={register}
            error={errors.currentState?.message}
          />
          <CustomInput
            name='currentCity'
            label='Current City'
            register={register}
            error={errors.currentCity?.message}
          />
        </div> */}

        {/* Conditional flatbed/tanker section */}
        {truckType && (
          <div className='bg-light-gray-150 grid grid-cols-2 max-sm:grid-cols-1 gap-3 py-[10px] px-4 rounded-[10px] mb-3'>
            {truckType.value === 'flatbed' ? (
              <>
                <div>
                  <CustomSelect
                    label='Flatbed Subtype'
                    name='flatbedSubtype'
                    options={FLATBED_SUBTYPES}
                    value={flatbedSubtype}
                    onChange={handleFlatbedSubtypeChange}
                    error={errors.flatbedSubtype?.message}
                  />
                </div>

                <div>
                  <CustomInput
                    type='number'
                    name='deckLengthFt'
                    label='Deck length (ft)'
                    value={deckLengthFt}
                    onChange={(e) => setDeckLengthFt(e.target.value)}
                    error={errors.deckLengthFt?.message}
                  />
                </div>

                <div>
                  <CustomInput
                    type='number'
                    name='deckWidthFt'
                    label='Deck width (ft)'
                    value={deckWidthFt}
                    onChange={(e) => setDeckWidthFt(e.target.value)}
                    error={errors.deckWidthFt?.message}
                  />
                </div>

                <div>
                  <CustomInput
                    type='number'
                    name='maxPayloadKg'
                    label='Max payload (kg)'
                    value={maxPayloadKg}
                    onChange={(e) => setMaxPayloadKg(e.target.value)}
                    error={errors.maxPayloadKg?.message}
                  />
                </div>

                <div>
                  <CustomSelect
                    label='Equipment'
                    name='equipment'
                    options={EQUIPMENT_OPTIONS}
                    multiple
                    value={equipment}
                    onChange={handleEquipmentChange}
                    error={errors.equipment?.message}
                  />
                </div>

                <div>
                  <CustomSelect
                    label='Preferred Cargo Types'
                    name='preferredCargoTypes'
                    options={CARGO_TYPES}
                    multiple
                    value={preferredCargoTypes}
                    onChange={handlePreferredCargoChange}
                    error={errors.preferredCargoTypes?.message}
                  />
                </div>

                {deliveryType?.value === 'in_country' && (
                  <>
                    <div>
                      <CustomSelect
                        label='State'
                        name='state'
                        options={states}
                        value={selectedStateForFlatbed}
                        onChange={handleStateChange}
                        error={errors.currentState?.message}
                      />
                    </div>
                    <div>
                      <CustomSelect
                        label='City (LGA)'
                        name='city'
                        options={lgas}
                        value={selectedLGA}
                        onChange={handleLGAChange}
                        error={errors.currentCity?.message}
                      />
                    </div>
                    <div className='col-span-full'>
                      <CustomInput
                        type='text'
                        name='address'
                        label='Address / Location'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={errors.address?.message}
                      />
                    </div>
                    <div className='col-span-full'>
                      <CustomInput
                        type='text'
                        name='notes'
                        label='Notes'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        error={errors.notes?.message}
                      />
                    </div>
                  </>
                )}

                {deliveryType?.value === 'up_country' && (
                  <>
                    <div>
                      <CustomSelect
                        label='Country'
                        name='country'
                        options={COUNTRY_OPTIONS}
                        value={country}
                        onChange={handleCountryChange}
                        error={errors.country?.message}
                      />
                    </div>
                    <div className='col-span-full'>
                      <CustomInput
                        type='text'
                        name='address'
                        label='Address / Location'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={errors.address?.message}
                      />
                    </div>
                    <div className='col-span-full'>
                      <CustomInput
                        type='text'
                        name='notes'
                        label='Notes'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        error={errors.notes?.message}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <CustomSelect
                    label='Current State'
                    name='state'
                    options={states}
                    value={selectedState}
                    onChange={(v:any)=>{ setSelectedState(v); setSelectedLGA(undefined); }}
                    error={errors.currentState?.message}
                  />
                </div>
                <div>
                  <CustomSelect
                    label='Current City'
                    name='lga'
                    options={lgas}
                    value={selectedLGA}
                    onChange={(v:any)=> setSelectedLGA(v)}
                    error={errors.currentCity?.message}
                  />
                </div>
              </>
            )}
          </div>
        )}

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
    </div>
  );
};

export default TruckForm;
