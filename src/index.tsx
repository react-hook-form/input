import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Props, EventFunction } from './types';

function getValue(e: any, { isCheckbox }: { isCheckbox: boolean }) {
  return e.target ? (isCheckbox ? e.target.checked : e.target.value) : e;
}

const RHFInput = React.memo(
  ({
    setValue: setValueFromProp,
    register: registerFromProp,
    unregister: unregisterFromProp,
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
    onChangeName,
    onChangeEvent,
    onBlurName,
    onBlurEvent,
    ...rest
  }: Props) => {
    const isCheckbox = type === 'checkbox';
    const isOnChange = mode === 'onChange';
    const isOnBlur = mode === 'onBlur';
    const defaultData = isCheckbox
      ? defaultChecked === undefined
        ? false
        : defaultChecked
      : defaultValue === undefined
      ? ''
      : defaultValue;
    const [inputValue, setInputValue] = React.useState(defaultData);
    const valueRef = React.useRef(defaultData);
    const methods = useFormContext();
    const setValue = methods ? methods.setValue : setValueFromProp;
    const register = methods ? methods.register : registerFromProp;
    const unregister = methods ? methods.unregister : unregisterFromProp;

    const commonTask = (e: any) => {
      const data = getValue(e, { isCheckbox });
      setInputValue(data);
      valueRef.current = data;
      return data;
    };

    const eventWrapper = (event: EventFunction) => {
      return (...arg: any) => {
        commonTask(event(arg));
      };
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
          unregister(name as string);
        }
      };
    }, [register, unregister, name]); // eslint-disable-line react-hooks/exhaustive-deps

    return React.cloneElement(as, {
      ...rest,
      ...(onChangeName && onChangeEvent
        ? { [onChangeName]: eventWrapper(onChangeEvent) }
        : { onChange: handleChange }),
      ...(isOnBlur
        ? onBlurName && onBlurEvent
          ? { [onBlurName]: eventWrapper(onBlurEvent) }
          : { onBlur: handleBlur }
        : {}),
      value: value || inputValue,
      ...(isCheckbox ? { checked: inputValue } : {}),
    });
  },
);

export { RHFInput };
