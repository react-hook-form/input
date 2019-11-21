import * as React from 'react';

type Props = {
  setValue: (name: string, value: any, trigger: boolean) => void;
  register: (ref: any, rules: any) => void;
  name: string;
  input: any;
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
  input,
  onChange,
  ...rest
}: Props) => {
  const [value, setInputValue] = React.useState();
  const valueRef = React.useRef();
  const handleChange = (value: any) => {
    setValue(name, value, trigger);
    valueRef.current = value;
    if (onChange) onChange(value);
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
  }, [register, value]);

  return React.createElement(input, {
    ...rest,
    onChange: handleChange,
    value,
  });
};

export { HookFormInput };
