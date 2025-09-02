"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/atoms/custom-input';
import { CreateTransportConfigDto, TransportConfigDto, UpdateTransportConfigDto } from '@/types/transport-fare.types';

const schema = yup.object({
  key: yup.string().required('Key is required'),
  value: yup.number().required('Value is required').min(0),
  description: yup.string(),
  category: yup.string(),
});

interface Props {
  initialData?: TransportConfigDto;
  onSubmit: (data: CreateTransportConfigDto | UpdateTransportConfigDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

const TransportConfigForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, isLoading=false, isEditMode=false }) => {
  const CATEGORIES = [
    { label: 'fuel', value: 'fuel' },
    { label: 'maintenance', value: 'maintenance' },
    { label: 'profit', value: 'profit' },
    { label: 'fixed_costs', value: 'fixed_costs' },
  ];

  const defaultValues = initialData || { key: '', value: 0, description: '', category: 'fuel' };
  const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({ resolver: yupResolver(schema), defaultValues });

  React.useEffect(() => { if (initialData) reset(initialData); }, [initialData, reset]);

  const submit = (data:any) => { if (isEditMode) { const { key, ...rest } = data; onSubmit(rest); } else { onSubmit(data); } };

  return (
    <form onSubmit={handleSubmit(submit)} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Key</label>
  <CustomInput {...register('key')} error={String(errors.key?.message || '') || undefined} disabled={isEditMode} />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Value</label>
  <CustomInput type='number' {...register('value')} error={String(errors.value?.message || '') || undefined} />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Description</label>
  <CustomInput {...register('description')} error={String(errors.description?.message || '') || undefined} />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Category</label>
        <select {...register('category')} className='w-full h-10 px-3 border rounded'>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className='flex gap-3 pt-4'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button type='submit' disabled={isLoading}>{isLoading ? 'Saving...' : isEditMode ? 'Update Configuration' : 'Create Configuration'}</Button>
      </div>
    </form>
  );
};

export default TransportConfigForm;
