import * as React from 'react';

type Props = {
  setValue: (name: string, value: any) => void;
  register: (ref: any, rules: any) => void;
  name: string;
  input: any;
  rules: any;
};

const HookFormInput = (props: Props) => {
  const [value, setValue] = React.useState();
  const valueRef = React.useRef();
  const handleChange = (value: any) => {
    props.setValue(props.name, value);
    valueRef.current = value;
  };

  React.useEffect(() => {
    props.register(
      Object.defineProperty(
        {
          name: props.name,
          type: 'custom',
        },
        'value',
        {
          set(value) {
            setValue(value);
            valueRef.current = value;
          },
          get() {
            return valueRef.current;
          },
        },
      ),
      { ...props.rules },
    );
  }, [props, value]);

  return React.createElement(props.input, {
    ...props,
    onChange: handleChange,
    value,
  });
};

export { HookFormInput };
