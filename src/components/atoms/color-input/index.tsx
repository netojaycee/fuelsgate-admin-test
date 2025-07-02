"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/atoms/label";
import { Text } from "@/components/atoms/text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  register: any;
  classNames?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  name,
  error,
  register,
  value,
  onChange,
  classNames,
  ...props
}) => {
  const [localColor, setLocalColor] = useState(value as string);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setLocalColor(value as string);
  }, [value]);

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);

    // Create a synthetic event to match the expected input event structure
    const syntheticEvent = {
      target: {
        name,
        value: newColor,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) {
      onChange(syntheticEvent);
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='w-full'>
      {label && (
        <Label name={name} classNames='mb-2'>
          {label}
        </Label>
      )}
      <div className='flex items-center gap-2'>
        <div className='relative flex-grow'>
          <input
            {...register(name)}
            {...props}
            type='text'
            value={localColor}
            onChange={handleHexInputChange}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              classNames
            )}
          />
        </div>
        <Popover open={showPicker} onOpenChange={setShowPicker}>
          <PopoverTrigger asChild>
            <button
              type='button'
              className={cn(
                "h-10 w-10 rounded-md border border-input",
                error ? "border-red-500" : ""
              )}
              style={{
                backgroundColor:
                  localColor &&
                  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(localColor)
                    ? localColor
                    : "#ffffff",
              }}
            />
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <input
              type='color'
              value={localColor}
              onChange={handleColorPickerChange}
              className='w-[200px] h-[200px] cursor-pointer border-none p-0'
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && (
        <Text variant='ps' classNames='text-red-500 mt-1'>
          {error}
        </Text>
      )}
    </div>
  );
};

export default ColorInput;
