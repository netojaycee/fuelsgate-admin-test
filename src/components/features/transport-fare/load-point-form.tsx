"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/atoms/custom-input';
import { CustomSelect } from '@/components/atoms/custom-select';
import useStateHook from '@/hooks/useState.hook';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const LoadPointForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, isLoading = false }) => {
  const { useFetchStates, useFetchStateLGA } = useStateHook();
  const { data: statesRes } = useFetchStates;
  const [selectedState, setSelectedState] = useState<any>(undefined);
  const { data: lgaRes } = useFetchStateLGA(selectedState?.value);
  const [selectedLGA, setSelectedLGA] = useState<any>(undefined);
  const [name, setName] = useState(initialData?.name || '');
  const [displayName, setDisplayName] = useState(initialData?.displayName || '');

  useEffect(() => {
    if (initialData?.state) setSelectedState({ label: initialData.state, value: initialData.state });
    if (initialData?.lga) setSelectedLGA({ label: initialData.lga, value: initialData.lga });
  }, [initialData]);

  const states = useMemo(() => (statesRes ? statesRes.map((s: any) => ({ label: s, value: s })) : []), [statesRes]);
  const lgas = useMemo(() => (lgaRes ? lgaRes.map((l: any) => ({ label: l, value: l })) : []), [lgaRes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, displayName, state: selectedState?.value, lga: selectedLGA?.value });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Identifier</label>
        <CustomInput name='name' value={name} onChange={(e: any) => setName(e.target.value)} />
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Display Name</label>
        <CustomInput name='displayName' value={displayName} onChange={(e: any) => setDisplayName(e.target.value)} />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='text-sm font-medium text-gray-700'>State</label>
          <CustomSelect name='state' options={states} value={selectedState} onChange={(v: any) => { setSelectedState(v); setSelectedLGA(undefined); }} />
        </div>
        <div>
          <label className='text-sm font-medium text-gray-700'>LGA</label>
          <CustomSelect name='lga' options={lgas} value={selectedLGA} onChange={(v: any) => setSelectedLGA(v)} />
        </div>
      </div>

      <div className='flex gap-3 pt-4'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button type='submit' disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
};

export default LoadPointForm;
