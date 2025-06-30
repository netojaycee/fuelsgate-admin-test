'use client'
import React from 'react'
import clsx from 'clsx'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '../label'

export type TCustomCheckbox = {
  name: string, 
  label?: string,
  classNames?: string
}

const CustomCheckbox = ({ name, label, classNames }: TCustomCheckbox) => {
  return (
    <div className={clsx("flex items-center space-x-2", classNames)}>
      <Checkbox id={name} className='h-5 w-5 rounded-[4px] border-mid-gray-450' />
      {label && <Label name={name} label={label} />}
    </div>
  )
}

export default CustomCheckbox