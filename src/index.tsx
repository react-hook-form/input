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
  component: React.ReactElement<any>;
  type?: string;
  rules?: ValidationOptions;
  value?: string | boolean;
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
  type,
  value,
  ...rest
}: Props) => {
  const isCheckbox = type === 'checkbox';
  const [inputValue, setInputValue] = React.useState(isCheckbox ? false : '');
  const valueRef = React.useRef();
  const handleChange = (e: any) => {
    const data = e.target
      ? isCheckbox
        ? e.target.checked
        : e.target.value
      : e;
    setInputValue(data);
    setValue(name, data, trigger);
    valueRef.current = data;
    if (onChange) {
      onChange(e);
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
  }, [register, inputValue, name, rules]);

  return React.cloneElement(component, {
    ...rest,
    onChange: handleChange,
    value: value || inputValue,
    ...(isCheckbox ? { checked: inputValue } : {}),
  });
};

export { HookFormInput };
