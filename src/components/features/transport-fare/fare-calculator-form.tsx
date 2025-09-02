"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/atoms/custom-input';
import { CustomSelect } from '@/components/atoms/custom-select';
import useStateHook from '@/hooks/useState.hook';
import { formatNumber } from '@/utils/formatNumber';
import { TRUCK_SIZES } from '@/lib/data';
import { LitreValueContainerWrapper } from '@/components/features/trucks/truck-capacity-value';

interface Props {
  loadPoints?: any[];
  onCalculate: (data: any) => Promise<any>;
  isLoading?: boolean;
}

const TRUCK_TYPES = [
  { label: 'Tanker', value: 'tanker' },
  { label: 'Flat Bed', value: 'flatbed' },
];

const FareCalculatorForm: React.FC<Props> = ({ loadPoints = [], onCalculate, isLoading = false }) => {
  const { useFetchStates, useFetchStateLGA } = useStateHook();
  const { data: statesRes } = useFetchStates;
  const [selectedState, setSelectedState] = useState<any>(undefined);
  const { data: lgaRes } = useFetchStateLGA(selectedState?.value);
  const [selectedLGA, setSelectedLGA] = useState<any>(undefined);
  const [selectedLoadPoint, setSelectedLoadPoint] = useState<any>(undefined);
  const [truckType, setTruckType] = useState<any>(TRUCK_TYPES[0]);
  const [capacity, setCapacity] = useState<number>(45000);
  const [capacityOption, setCapacityOption] = useState<any>({ label: '45000', value: '45000' });
  const [result, setResult] = useState<any>(null);

  const states = useMemo(() => (statesRes ? statesRes.map((s:any) => ({ label: s, value: s })) : []), [statesRes]);
  const lgas = useMemo(() => (lgaRes ? lgaRes.map((l:any) => ({ label: l, value: l })) : []), [lgaRes]);
  const loadPointOptions = useMemo(() => loadPoints.map(lp => ({ label: lp.displayName || lp.name, value: lp.name })), [loadPoints]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { truckCapacity: capacity, truckType: truckType.value, deliveryState: selectedState?.value, deliveryLGA: selectedLGA?.value, loadPoint: selectedLoadPoint?.value };
    const res = await onCalculate(payload);
    setResult(res?.data || res);
  };

  return (
    <div className='bg-white rounded-lg border p-4'>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-3'>
        <div>
          <label className='text-sm font-medium text-gray-700'>Delivery State</label>
          <CustomSelect name='deliveryState' options={states} value={selectedState} onChange={(v:any) => { setSelectedState(v); setSelectedLGA(undefined); }} />
        </div>
        <div>
          <label className='text-sm font-medium text-gray-700'>Delivery LGA</label>
          <CustomSelect name='deliveryLGA' options={lgas} value={selectedLGA} onChange={(v:any) => setSelectedLGA(v)} />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700'>Load Point</label>
          <CustomSelect name='loadPoint' options={loadPointOptions} value={selectedLoadPoint} onChange={(v:any) => setSelectedLoadPoint(v)} />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700'>Truck Type</label>
          <CustomSelect name='truckType' options={TRUCK_TYPES} value={truckType} onChange={(v:any) => setTruckType(v)} />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700'>Truck Capacity (Ltrs)</label>
          <CustomSelect name='capacity' options={TRUCK_SIZES} value={capacityOption} onChange={(v:any) => { setCapacityOption(v); setCapacity(Number(v?.value || 45000)); }} ValueContainer={LitreValueContainerWrapper} />
        </div>

        <div className='col-span-2 flex gap-3 pt-4'>
          <Button type='submit' disabled={isLoading}>{isLoading ? 'Calculating...' : 'Calculate Fare'}</Button>
        </div>
      </form>

      {result && (
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 bg-white border rounded'>
            <div className='text-lg font-semibold mb-2'>Fare Summary</div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm text-gray-600'>Min Fare per Litre</div>
              <div className='text-right font-semibold'>₦{formatNumber(result.minFarePerLitre)}</div>
            </div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm text-gray-600'>Max Fare per Litre</div>
              <div className='text-right font-semibold'>₦{formatNumber(result.maxFarePerLitre)}</div>
            </div>
            <div className='border-t my-2' />
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm text-gray-600'>Total Min</div>
              <div className='text-right font-semibold'>₦{formatNumber(result.totalMin)}</div>
            </div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm text-gray-600'>Total Max</div>
              <div className='text-right font-semibold'>₦{formatNumber(result.totalMax)}</div>
            </div>
          </div>

          <div className='p-4 bg-white border rounded'>
            <div className='text-lg font-semibold mb-2'>Breakdown</div>
            <div className='space-y-2 text-sm text-gray-700'>
              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Freight Rate (Min)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.freightRateMin)}</div>
                </div>
                <div className='text-xs text-gray-400'>Calculated rate for freight using min consumption and profit margins</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Freight Rate (Max)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.freightRateMax)}</div>
                </div>
                <div className='text-xs text-gray-400'>Calculated rate for freight using max consumption and profit margins</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Diesel Delivery Cost (Min)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.dieselDeliveryCostMin)}</div>
                </div>
                <div className='text-xs text-gray-400'>Cost of diesel required for round trip (min estimate)</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Diesel Delivery Cost (Max)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.dieselDeliveryCostMax)}</div>
                </div>
                <div className='text-xs text-gray-400'>Cost of diesel required for round trip (max estimate)</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Diesel Quantity (Min)</div>
                  <div className='font-medium'>{formatNumber(result.breakdowns?.dieselQuantityMin)} L</div>
                </div>
                <div className='text-xs text-gray-400'>Estimated litres of diesel (min)</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Diesel Quantity (Max)</div>
                  <div className='font-medium'>{formatNumber(result.breakdowns?.dieselQuantityMax)} L</div>
                </div>
                <div className='text-xs text-gray-400'>Estimated litres of diesel (max)</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Variable Cost per Km (Min)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.variableCostPerKmMin)}</div>
                </div>
                <div className='text-xs text-gray-400'>Includes diesel cost/km and maintenance</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Variable Cost per Km (Max)</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.variableCostPerKmMax)}</div>
                </div>
                <div className='text-xs text-gray-400'>Includes diesel cost/km and maintenance (max)</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Fixed Cost per Km</div>
                  <div className='font-medium'>₦{formatNumber(result.breakdowns?.fixedCostPerKm)}</div>
                </div>
                <div className='text-xs text-gray-400'>Driver, insurance and sundry fixed costs per km</div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <div className='text-gray-600'>Distance</div>
                  <div className='font-medium'>{result.breakdowns?.distance} km</div>
                </div>
                <div className='text-xs text-gray-400'>Distance between pickup/delivery and load point</div>
              </div>

              <div className='border-t pt-2'>
                <div className='flex justify-between font-semibold'>
                  <div>Total Min</div>
                  <div>₦{formatNumber(result.totalMin)}</div>
                </div>
                <div className='flex justify-between font-semibold'>
                  <div>Total Max</div>
                  <div>₦{formatNumber(result.totalMax)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FareCalculatorForm;

