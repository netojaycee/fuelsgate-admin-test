import { ChevronDown } from "lucide-react";
import React, {
  ComponentType,
  forwardRef,
  LabelHTMLAttributes,
  memo,
  useEffect,
  useState,
} from "react";
import ReactSelect, {
  StylesConfig,
  type DropdownIndicatorProps,
  components,
  GroupBase,
  SelectInstance,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { Label } from "../label";
import { Text } from "../text";
import { cn } from "@/lib/utils";

type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  label?: string;
  multiple?: boolean;
  name: string;
  classNames?: string;
  height?: string;
  borderRadius?: string;
  options?: CustomSelectOption[];
  Option?:
    | ComponentType<OptionProps<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  ValueContainer?:
    | ComponentType<ValueContainerProps<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  value?: CustomSelectOption | CustomSelectOption[];
  onChange?: (newValue: unknown) => void;
  error?: string;
  labelHTMLElements?: LabelHTMLAttributes<HTMLLabelElement>;
  isDisabled?: boolean;
  placeholder?: string;
};

const DefaultOption: React.FC<
  OptionProps<unknown, boolean, GroupBase<unknown>>
> = (props) => (
  <components.Option {...props}>{props.children}</components.Option>
);

const DefaultValueContainer: React.FC<
  ValueContainerProps<unknown, boolean, GroupBase<unknown>>
> = (props) => (
  <components.ValueContainer className="min-h-[26px]" {...props}>
    {props.children}
  </components.ValueContainer>
);

const CustomSelect = forwardRef<
  SelectInstance<unknown, boolean> | null,
  CustomSelectProps
>(
  (
    {
      options,
      label,
      height,
      borderRadius,
      multiple,
      name,
      classNames,
      value,
      placeholder,
      onChange,
      Option = DefaultOption,
      ValueContainer = DefaultValueContainer,
      labelHTMLElements,
      error,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => setIsMounted(true), []);

    const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "white",
        fontSize: "14px",
        fontWeight: "normal",
        height: "auto",
        minHeight: height ?? "40px",
        borderRadius: borderRadius ?? "6px",
        borderColor: "#D0D5DD",
        boxShadow: "none",
        "&:hover": { borderColor: "#D0D5DD" },
      }),
      option: (styles, { isSelected }) => {
        return {
          ...styles,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontSize: "14px",
          backgroundColor: isSelected ? "#D4B172CC" : "#fff",
          color: isSelected ? "#fff" : "#000",
          ":hover": {
            ...styles[":active"],
            backgroundColor: isSelected ? "#D4B172CC" : "#eee",
          },
          ".selected": {
            backgroundColor: "#D4B172CC",
            color: "#fff",
          },
        };
      },
      singleValue: (base) => ({
        ...base,
        padding: "0 6px",
      }),
      input: (styles, { value }) => ({
        ...styles,
        position: "absolute",
        width: (value as string)?.length > 0 ? "100%" : "auto",
        height: "100%",
        top: "0px",
        left: "0px",
        padding: "0 8px",
        background: (value as string)?.length > 0 ? "white" : "transparent",
      }),
      indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
      indicatorsContainer: (styles) => ({ ...styles, padding: "0 4px" }),
      placeholder: (styles) => ({ ...styles, padding: "0 6px" }),
    };

    const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <ChevronDown className="h-5 w-5 text-dark-500" />
        </components.DropdownIndicator>
      );
    };

    return (
      <div className={cn("relative", classNames)}>
        {label && (
          <Label
            name={name}
            label={label}
            classNames="mb-1"
            {...labelHTMLElements}
          />
        )}
        {isMounted && (
          <ReactSelect
            options={options}
            isMulti={multiple}
            name={name}
            id={name}
            ref={ref}
            styles={customStyles}
            value={value}
            onChange={onChange}
            components={{ DropdownIndicator, Option, ValueContainer }}
            isDisabled={isDisabled}
            {...props}
          />
        )}
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
  }
);

CustomSelect.displayName = "CustomSelect";

const MemoizedCustomSelect = memo(CustomSelect);

export {
  MemoizedCustomSelect as CustomSelect,
  type CustomSelectOption,
  type CustomSelectProps,
};
