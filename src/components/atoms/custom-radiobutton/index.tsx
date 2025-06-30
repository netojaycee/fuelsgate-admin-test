'use client';
import React, { forwardRef, memo } from 'react';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '../label';
import { cn } from '@/lib/utils';
import { RadioGroupItemProps } from '@radix-ui/react-radio-group';

type TCustomRadioButton = RadioGroupItemProps & {
  label?: string;
  name: string;
  value: string;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
};

const CustomRadioButton = forwardRef<HTMLButtonElement, TCustomRadioButton>(
  (
    {
      name,
      label,
      value,
      className,
      wrapperClassName,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('flex items-center space-x-2', wrapperClassName)}>
        <RadioGroupItem
          id={name}
          ref={ref}
          value={value}
          className={cn(
            'h-5 w-5 rounded-full border-mid-gray-450 data-[state=checked]:border-gray-900 text-gray-900',
            className,
          )}
          {...props}
        />
        {label && (
          <Label
            name={name}
            label={label}
            classNames={cn('cursor-pointer', labelClassName)}
          />
        )}
      </div>
    );
  },
);

CustomRadioButton.displayName = 'CustomRadioButton';

const MemoizedCustomRadioButton = memo(CustomRadioButton);

export {
  type TCustomRadioButton,
  MemoizedCustomRadioButton as CustomRadioButton,
};
