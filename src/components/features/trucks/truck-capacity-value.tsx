import { CustomSelectOption } from "@/components/atoms/custom-select";
import React from "react";
import { components, ValueContainerProps } from "react-select";

const LitreValueContainer = (
  props: ValueContainerProps<CustomSelectOption, boolean>
) => {
  const { children } = props;

  return (
    <components.ValueContainer {...props}>
      <div className='flex items-center justify-start gap-2 h-[26px] px-1 text-sm'>
        <div className='text-xs text-dark-gray-400'>Ltr</div>
        {children}
      </div>
    </components.ValueContainer>
  );
};

const LitreValueContainerWrapper = (
  props: ValueContainerProps<unknown, boolean>
) => {
  return (
    <LitreValueContainer
      {...(props as ValueContainerProps<CustomSelectOption, boolean>)}
    />
  );
};

export { LitreValueContainerWrapper };
