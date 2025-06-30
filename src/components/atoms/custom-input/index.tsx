'use client';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Text } from '../text';
import { Label } from '../label';
import { cn } from '@/lib/utils';

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  classNames?: string;
  optional?: boolean;
  affix?: string | React.ReactNode;
  prefix?: string | React.ReactNode;
  prefixPadding?: string;
  affixPadding?: string;
  // onChange?: (newValue: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  error?: string;
  className?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
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
      prefix,
      prefixPadding,
      affix,
      affixPadding,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   if (onChange) {
    //     onChange(e.target.value);
    //   }
    // };

    return (
      <div className={cn(classNames)}>
        {label && <Label {...{ name, label, optional }} classNames="mb-1" />}
        <div className="relative h-fit w-full">
          {(type === 'tel' || prefix) && (
            <div className="absolute top-2.5 left-2 text-sm text-center font-normal text-dark-500 bg-transparent backdrop-blur-sm p-2">
              {type === 'tel' ? '+234 |' : prefix}
            </div>
          )}
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            className={cn(
              'w-full h-14 px-4 text-sm border border-mid-gray-450 rounded-md focus:outline-none',
              (type === 'tel' || prefix) && (prefixPadding ?? 'pl-20'),
              affix && (affixPadding ?? 'pr-4'),
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
          {affix && (
            <div className="absolute top-2.5 right-2 text-sm font-normal text-dark-gray-150 bg-transparent backdrop-blur-sm p-2">
              {affix}
            </div>
          )}
          {type === 'password' && (
            <button
              title="visibility toggle"
              type="button"
              className="absolute top-2.5 right-2 bg-transparent backdrop-blur-sm p-2"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          )}
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

CustomInput.displayName = 'CustomInput';

export default memo(CustomInput);
