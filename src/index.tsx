import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export type ValidateResult = string | boolean | undefined;

export type Validate = (data: any) => ValidateResult;

type ValidationOptionObject<Value> = Value | { value: Value; message: string };

type ValidationOptions = Partial<{
  required: boolean | string;
  min: ValidationOptionObject<number | string>;
  max: ValidationOptionObject<number | string>;
  maxLength: ValidationOptionObject<number | string>;
  minLength: ValidationOptionObject<number | string>;
  pattern: ValidationOptionObject<RegExp>;
  validate:
    | Validate
    | Record<string, Validate>
    | { value: Validate | Record<string, Validate>; message: string };
}>;

type Props = {
  setValue: (name: string, value: any, trigger?: boolean) => void;
  register: (ref: any, rules: ValidationOptions) => (name: string) => void;
  name: string;
  as: React.ReactElement<any>;
  type?: string;
  rules?: ValidationOptions;
  value?: string | boolean;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  defaultValue?: string;
  defaultChecked?: boolean;
};

function getValue(e: any, { isCheckbox }: { isCheckbox: boolean }) {
  return e.target ? (isCheckbox ? e.target.checked : e.target.value) : e;
}

const RHFInput = React.memo(
  ({
    setValue: setValueFromProp,
    register: registerFromProp,
    name,
    rules,
    mode = 'onSubmit',
    as,
    onChange,
    onBlur,
    type,
    value,
    defaultValue,
    defaultChecked,
    ...rest
  }: Props) => {
    const isCheckbox = type === 'checkbox';
    const isOnChange = mode === 'onChange';
    const isOnBlur = mode === 'onBlur';
    const [inputValue, setInputValue] = React.useState(
      isCheckbox
        ? defaultChecked === undefined
          ? false
          : defaultChecked
        : defaultValue === undefined
        ? ''
        : defaultValue,
    );
    const valueRef = React.useRef();
    const methods = useFormContext();
    const setValue = methods ? methods.setValue : setValueFromProp;
    const register = methods ? methods.register : registerFromProp;

    const commonTask = (e: any) => {
      const data = getValue(e, { isCheckbox });
      setInputValue(data);
      valueRef.current = data;
      return data;
    };

    const handleChange = (e: any) => {
      const data = commonTask(e);
      setValue(name, data, isOnChange);
      if (onChange) {
        onChange(e);
      }
    };

    const handleBlur = (e: any) => {
      const data = commonTask(e);
      setValue(name, data, isOnBlur);
      if (onBlur) {
        onBlur(e);
      }
    };

    React.useEffect(() => {
      const unregister = register(
        Object.defineProperty(
          {
            name,
            type: 'custom',
          },
          'value',
          {
            set(data) {
              setInputValue(data);
              valueRef.current = data;
            },
            get() {
              return valueRef.current;
            },
          },
        ),
        { ...rules },
      );

      return (): void => {
        if (unregister) {
          unregister(name as any);
        }
      };
    }, [register, inputValue, name, rules]);

    return React.cloneElement(as, {
      ...rest,
      onChange: handleChange,
      ...(isOnBlur ? { onBlur: handleBlur } : {}),
      value: value || inputValue,
      ...(isCheckbox ? { checked: inputValue } : {}),
    });
  },
);

export { RHFInput };
