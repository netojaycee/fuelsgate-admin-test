import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Label } from '../label';
import { TCustomRadioButton } from '../custom-radiobutton';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const RadioButtonField = forwardRef<HTMLButtonElement, TCustomRadioButton>(
  ({ name, label, value, className }, ref) => {
    return (
      <Label
        name={name}
        label={label ? label : ''}
        classNames={cn(
          'flex items-center gap-2 h-[46px] cursor-pointer p-4 border border-mid-gray-550 rounded-lg',
          className,
        )}
      >
        <RadioGroupItem
          id={name}
          value={value}
          className="h-5 w-5 rounded-full border-mid-gray-450 text-gold data-[state=checked]:border-gold"
          ref={ref}
        />
      </Label>
    );
  },
);

RadioButtonField.displayName = 'RadioButtonField';

export { RadioButtonField };
