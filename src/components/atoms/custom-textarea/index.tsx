'use client';
import React, { forwardRef, memo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Text } from '../text';
import { Label } from '../label';
import { cn } from '@/lib/utils';

type CustomTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  classNames?: string;
  optional?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: any;
  error?: string;
  className?: string;
};

const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
  (
    {
      type = 'text',
      label,
      name,
      classNames,
      className,
      value,
      onChange,
      optional,
      register,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(classNames)}>
        {label && <Label {...{ name, label, optional }} classNames="mb-1" />}
        <div className="relative h-fit w-full">
          <textarea
            className={cn(
              'w-full h-[128px] px-4 py-3 text-sm border border-mid-gray-450 rounded-md focus:outline-none',
              className,
            )}
            id={name}
            name={name}
            title={name}
            min={0}
            step=".001"
            defaultValue={value}
            onChange={onChange}
            ref={ref}
            {...(register && { ...register(`${name}`) })}
            {...props}
          />
        </div>
        {error && (
          <Text
            variant="ps"
            color="text-red-500"
            fontWeight="regular"
            classNames="mt-1"
          >
            {error}
          </Text>
        )}
      </div>
    );
  },
);

CustomTextArea.displayName = 'CustomTextArea';

export default memo(CustomTextArea);
