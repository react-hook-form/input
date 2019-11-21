import * as React from 'react';

type Props = {
  setValue: (name: string, value: any) => void;
  register: (ref: any) => void;
  name: string;
  children: any;
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
    );
  }, [props, value]);

  return React.createElement(props.children, {
    ...props,
    onChange: handleChange,
    value,
  });
};

export { HookFormInput };
