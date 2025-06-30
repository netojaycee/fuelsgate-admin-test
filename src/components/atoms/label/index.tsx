import clsx from 'clsx';
import React, { forwardRef, LabelHTMLAttributes } from 'react';
import { Text } from '../text';

type LabelProps = {
  name: string;
  label?: string;
  classNames?: string;
  optional?: boolean;
  fontFamily?: string;
  children?: React.ReactNode;
  labelHTMLElements?: LabelHTMLAttributes<HTMLLabelElement>;
};

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      name,
      label,
      classNames,
      optional,
      children,
      fontFamily,
      labelHTMLElements,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        htmlFor={name}
        ref={ref}
        className={clsx(
          'flex items-center gap-1 text-dark-500 font-medium text-sm',
          classNames,
          fontFamily,
        )}
        {...labelHTMLElements}
        {...props}
      >
        {children}
        {label}
        {optional && (
          <Text
            variant="ps"
            color="text-mid-gray-600"
            fontWeight="medium"
            lineHeight="leading-[20px]"
          >
            (Optional)
          </Text>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';

export { Label };
