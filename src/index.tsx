import * as React from 'react';

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
  register: (ref: any, rules: ValidationOptions) => void;
  unregister: (name: string) => void;
  name: string;
  component: React.ReactElement<any>;
  type?: string;
  rules?: ValidationOptions;
  value?: string | boolean;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
};

function getValue(e: any, { isCheckbox }: { isCheckbox: boolean }) {
  return e.target ? (isCheckbox ? e.target.checked : e.target.value) : e;
}

const HookFormInput = React.memo(
  ({
    setValue,
    name,
    register,
    rules,
    mode = 'onSubmit',
    component,
    onChange,
    onBlur,
    type,
    value,
    unregister,
    ...rest
  }: Props) => {
    const isCheckbox = type === 'checkbox';
    const isOnChange = mode === 'onChange';
    const isOnBlur = mode === 'onBlur';
    const [inputValue, setInputValue] = React.useState(isCheckbox ? false : '');
    const valueRef = React.useRef();
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
      register(
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

      return () => {
        if (unregister) unregister(name);
      };
    }, [register, inputValue, name, rules]);

    return React.cloneElement(component, {
      ...rest,
      onChange: handleChange,
      ...(isOnBlur ? { onBlur: handleBlur } : {}),
      value: value || inputValue,
      ...(isCheckbox ? { checked: inputValue } : {}),
    });
  },
);

export { HookFormInput };
