import clsx from 'clsx'
import { Label } from '../label'
import React, { forwardRef, memo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { TCustomCheckbox } from '../custom-checkbox'

const CheckboxField = forwardRef<HTMLButtonElement, TCustomCheckbox>(({ name, label, classNames }, ref) => {
  return (
    <Label name={name} label={label ? label : ''} classNames={clsx('flex items-center gap-2 h-[46px] cursor-pointer p-4 border border-mid-gray-550 rounded-lg', classNames)}>
      <Checkbox id={name} ref={ref} className='h-5 w-5 rounded-[4px] border-mid-gray-450 data-[state=checked]:border-gold data-[state=checked]:bg-gold' />
    </Label>
  )
});

CheckboxField.displayName = 'CheckboxField';
const MemoizedCheckboxField = memo(CheckboxField);
export { MemoizedCheckboxField as CheckboxField };