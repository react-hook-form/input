import * as React from 'react';

type Props = {
  setValue: (name: string, value: any, trigger?: boolean) => void;
  register: (ref: any, rules: any) => void;
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
