// import { FC } from 'react';
// import { cn } from '@/lib/utils';
// import { CustomSelectOption } from '@/components/atoms/custom-select';
// import { components, OptionProps, ValueContainerProps } from 'react-select';
// import { ListFilter } from 'lucide-react';

// type CustomOptionData = CustomSelectOption & {
//   color: string;
//   slug: string;
// };

// const CustomProductOption: FC<OptionProps<CustomOptionData, boolean>> = (
//   props,
// ) => {
//   const { children, innerProps, data } = props;
//   return (
//     <components.Option {...props} {...innerProps}>
//       <div className='flex items-center gap-2 !h-fit'>
//         {data.color.includes("-") ? (
//           <div className='h-[17px] w-10 rounded-sm overflow-hidden flex flex-col relative'>
//             <div
//               className='h-1/2 w-full'
//               style={{ backgroundColor: data.color.split("-")[0] }}
//             />
//             <div
//               className='h-1/2 w-full'
//               style={{ backgroundColor: data.color.split("-")[1] }}
//             />
//             <span className='absolute inset-0 flex items-center justify-center text-xs font-medium uppercase text-white'>
//               {data.slug}
//             </span>
//           </div>
//         ) : (
//           <span
//             className='inline-flex items-center justify-center h-[17px] w-10 text-xs font-medium rounded-sm uppercase text-white'
//             style={{ backgroundColor: data.color }}
//           >
//             {data.slug}
//           </span>
//         )}
//         <span>{children}</span>
//       </div>
//     </components.Option>
//   );
// };

// const CustomValueContainer = (
//   props: ValueContainerProps<CustomOptionData, boolean>,
// ) => {
//   const { children, selectProps } = props;

//   return (
//     <components.ValueContainer {...props}>
//       <div className='flex items-center justify-start h-[26px] px-1'>
//         {selectProps.value ? (
//           (selectProps.value as CustomOptionData).color.includes("-") ? (
//             <div className='h-[17px] w-10 rounded-sm overflow-hidden flex flex-col relative'>
//               <div
//                 className='h-1/2 w-full'
//                 style={{
//                   backgroundColor: (
//                     selectProps.value as CustomOptionData
//                   ).color.split("-")[0],
//                 }}
//               />
//               <div
//                 className='h-1/2 w-full'
//                 style={{
//                   backgroundColor: (
//                     selectProps.value as CustomOptionData
//                   ).color.split("-")[1],
//                 }}
//               />
//               <span className='absolute inset-0 flex items-center justify-center text-xs font-medium uppercase text-white'>
//                 {(selectProps.value as CustomOptionData).slug}
//               </span>
//             </div>
//           ) : (
//             <span
//               className='inline-flex items-center justify-center h-[17px] w-10 text-xs font-medium rounded-sm uppercase text-white'
//               style={{
//                 backgroundColor: (selectProps.value as CustomOptionData).color,
//               }}
//             >
//               {(selectProps.value as CustomOptionData).slug}
//             </span>
//           )
//         ) : null}
//         {children}
//       </div>
//     </components.ValueContainer>
//   );
// };

// const CustomProductOptionWrapper = (props: OptionProps<unknown, boolean>) => {
//   return (
//     <CustomProductOption
//       {...(props as OptionProps<CustomOptionData, boolean>)}
//     />
//   );
// };

// const CustomValueContainerWrapper = (
//   props: ValueContainerProps<unknown, boolean>,
// ) => {
//   return (
//     <CustomValueContainer
//       {...(props as ValueContainerProps<CustomOptionData, boolean>)}
//     />
//   );
// };

// const SortValueContainerWrapper = (
//   props: ValueContainerProps<unknown, boolean>,
// ) => {
//   return (
//     <SortValueContainer
//       {...(props as ValueContainerProps<CustomOptionData, boolean>)}
//     />
//   );
// };

// const SortValueContainer = (
//   props: ValueContainerProps<CustomOptionData, boolean>,
// ) => {
//   const { children, selectProps } = props;

//   return (
//     <components.ValueContainer {...props}>
//       <div className="flex items-center justify-start h-[26px] px-1 text-sm">
//         {selectProps.value ? (
//           <div className="flex items-center gap-2 text-xs text-dark-gray-400">
//             <ListFilter height={17} width={17} />
//             Sort by:
//           </div>
//         ) : null}
//         {children}
//       </div>
//     </components.ValueContainer>
//   );
// };

// export {
//   CustomProductOptionWrapper,
//   CustomValueContainerWrapper,
//   SortValueContainerWrapper,
// };



import { FC } from "react";
import { cn } from "@/lib/utils";
import { CustomSelectOption } from "@/components/atoms/custom-select";
import { components, OptionProps, ValueContainerProps } from "react-select";
import { ListFilter, Truck } from "lucide-react";

type CustomOptionData = CustomSelectOption & {
  color: string;
  slug: string;
};

const CustomProductOption: FC<OptionProps<CustomOptionData, boolean>> = (
  props
) => {
  const { children, innerProps, data } = props;
  return (
    <components.Option {...props} {...innerProps}>
      <div className='flex items-center gap-2 !h-fit'>
        {data.color.includes("-") ? (
          <div className='h-[17px] w-10 rounded-full overflow-hidden flex flex-col relative'>
            <div
              className='h-1/2 w-full'
              style={{ backgroundColor: data.color.split("-")[0] }}
            />
            <div
              className='h-1/2 w-full'
              style={{ backgroundColor: data.color.split("-")[1] }}
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <Truck className='h-3 w-3 text-white' />
            </div>
          </div>
        ) : (
          <div
            className='inline-flex items-center justify-center h-[17px] w-10 rounded-full'
            style={{ backgroundColor: data.color }}
          >
            <Truck className='h-3 w-3 text-white' />
          </div>
        )}
        <span>{children}</span>
      </div>
    </components.Option>
  );
};

const CustomValueContainer = (
  props: ValueContainerProps<CustomOptionData, boolean>
) => {
  const { children, selectProps } = props;

  return (
    <components.ValueContainer {...props}>
      <div className='flex items-center justify-start h-[26px] px-1'>
        {selectProps.value ? (
          (selectProps.value as CustomOptionData).color.includes("-") ? (
            <div className='h-[17px] w-10 rounded-full overflow-hidden flex flex-col relative'>
              <div
                className='h-1/2 w-full'
                style={{
                  backgroundColor: (
                    selectProps.value as CustomOptionData
                  ).color.split("-")[0],
                }}
              />
              <div
                className='h-1/2 w-full'
                style={{
                  backgroundColor: (
                    selectProps.value as CustomOptionData
                  ).color.split("-")[1],
                }}
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Truck className='h-3 w-3 text-white' />
              </div>
            </div>
          ) : (
            <div
              className='inline-flex items-center justify-center h-[17px] w-10 rounded-full'
              style={{
                backgroundColor: (selectProps.value as CustomOptionData).color,
              }}
            >
              <Truck className='h-3 w-3 text-white' />
            </div>
          )
        ) : null}
        {children}
      </div>
    </components.ValueContainer>
  );
};

const CustomProductOptionWrapper = (props: OptionProps<unknown, boolean>) => {
  return (
    <CustomProductOption
      {...(props as OptionProps<CustomOptionData, boolean>)}
    />
  );
};

const CustomValueContainerWrapper = (
  props: ValueContainerProps<unknown, boolean>
) => {
  return (
    <CustomValueContainer
      {...(props as ValueContainerProps<CustomOptionData, boolean>)}
    />
  );
};

const SortValueContainerWrapper = (
  props: ValueContainerProps<unknown, boolean>
) => {
  return (
    <SortValueContainer
      {...(props as ValueContainerProps<CustomOptionData, boolean>)}
    />
  );
};

const SortValueContainer = (
  props: ValueContainerProps<CustomOptionData, boolean>
) => {
  const { children, selectProps } = props;

  return (
    <components.ValueContainer {...props}>
      <div className='flex items-center justify-start h-[26px] px-1 text-sm'>
        {selectProps.value ? (
          <div className='flex items-center gap-2 text-xs text-dark-gray-400'>
            <ListFilter height={17} width={17} />
            Sort by:
          </div>
        ) : null}
        {children}
      </div>
    </components.ValueContainer>
  );
};

export {
  CustomProductOptionWrapper,
  CustomValueContainerWrapper,
  SortValueContainerWrapper,
};