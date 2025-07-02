"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  CreateDepotHubDto,
  DepotHubDto,
  UpdateDepotHubDto,
} from "@/types/depot-hub.types";
import { X, Plus } from "lucide-react";
import CustomInput from "@/components/atoms/custom-input";

const depotHubSchema = yup.object({
  name: yup.string().required("Depot hub name is required"),
});

interface DepotHubFormProps {
  initialData?: DepotHubDto;
  onSubmit: (data: { name: string; depots: string[] }) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

const DepotHubForm: React.FC<DepotHubFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const [depots, setDepots] = useState<string[]>([]);
  const [newDepot, setNewDepot] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    resolver: yupResolver(depotHubSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
      });
      setDepots(initialData.depots || []);
    }
  }, [initialData, reset]);

  const handleAddDepot = () => {
    if (newDepot.trim() && !depots.includes(newDepot.trim())) {
      setDepots([...depots, newDepot.trim()]);
      setNewDepot("");
    }
  };

  const handleRemoveDepot = (depotToRemove: string) => {
    setDepots(depots.filter((depot) => depot !== depotToRemove));
  };

  const handleFormSubmit = (data: { name: string }) => {
    const formData = {
      name: data.name,
      depots: depots,
    };
    onSubmit(formData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDepot();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
      <CustomInput
        name='name'
        label='Depot Hub Name'
        register={register}
        error={errors.name?.message}
        placeholder='Enter depot hub name'
      />
  

      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Depots
        </label>

        <div className='flex gap-2'>
          <input
            type='text'
            value={newDepot}
            onChange={(e) => setNewDepot(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Enter depot name'
            className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
          <Button
            type='button'
            onClick={handleAddDepot}
            disabled={!newDepot.trim()}
            size='sm'
          >
            <Plus className='w-4 h-4' />
          </Button>
        </div>

        {depots.length > 0 && (
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>
              Added Depots ({depots.length}):
            </p>
            <div className='max-h-32 overflow-y-auto space-y-2'>
              {depots.map((depot, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md'
                >
                  <span className='text-sm text-gray-900'>{depot}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveDepot(depot)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {depots.length === 0 && (
          <p className='text-sm text-gray-500 italic'>
            No depots added yet. Add depots using the input above.
          </p>
        )}
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
        <Button type='submit' disabled={isLoading || depots.length === 0}>
          {isLoading
            ? "Saving..."
            : initialData
            ? "Update Depot Hub"
            : "Create Depot Hub"}
        </Button>
      </div>
    </form>
  );
};

export default DepotHubForm;
