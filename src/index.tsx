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
  name: string;
  component: any;
  rules?: any;
  onChange?: (value: any) => void;
  trigger?: boolean;
};

const HookFormInput = ({
  setValue,
  name,
  register,
  rules,
  trigger,
  component,
  onChange,
  ...rest
}: Props) => {
  const [value, setInputValue] = React.useState();
  const valueRef = React.useRef();
  const handleChange = (e: any) => {
    const data = e.target ? e.target.value || e.target.checked : e;
    setValue(name, data, trigger);
    valueRef.current = data;
    if (onChange) {
      onChange(data);
    }
  };

  React.useEffect(() => {
    register(
      Object.defineProperty(
        {
          name: name,
          type: 'custom',
        },
        'value',
        {
          set(value) {
            setInputValue(value);
            valueRef.current = value;
          },
          get() {
            return valueRef.current;
          },
        },
      ),
      { ...rules },
    );
  }, [register, value, name, rules]);

  return React.cloneElement(component, {
    ...rest,
    onChange: handleChange,
    value,
  });
};

export { HookFormInput };
