import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';
import { Text } from '../text';
import { Label } from '../label';
import Image from 'next/image';
import { Checkbox } from '../../ui/checkbox';

type CheckboxCardProps = {
  image: string,
  name: string,
  label: string,
  description: string,
  labelClassName?: string,
} & React.HTMLAttributes<HTMLDivElement>

const CheckboxCard = forwardRef<HTMLButtonElement, CheckboxCardProps>(({ image, name, label, description, labelClassName }, ref) => {
  return (
    <Label name={name} classNames={clsx('relative flex-col cursor-pointer border border-mid-gray-550 rounded-[10px] overflow-hidden', labelClassName)}>
      <div className='relative h-[87px] w-full'>
        <Image src={image} fill alt={label} className='object-cover' loading='lazy' />
        <Checkbox id={name} ref={ref} className='absolute top-3 right-3 bg-white h-5 w-5 rounded-[4px] border-mid-gray-450' />
      </div>
      <div className='px-4 py-3'>
        <Text variant='ps' color='text-dark-500' fontWeight='semibold' classNames='mb-1.5' lineHeight='leading-[20px]'>{label}</Text>
        <Text variant='pxs' color='text-deep-gray-50' fontWeight='medium' lineHeight='leading-[17px]'>{description}</Text>
      </div>
    </Label>
  )
})

CheckboxCard.displayName ='CheckboxCard'

export default memo(CheckboxCard)