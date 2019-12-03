import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Props, EventFunction } from './types';

function getValue(target: any, { isCheckbox }: { isCheckbox: boolean }) {
  return target ? (isCheckbox ? target.checked : target.value) : target;
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
    const setValue = setValueFromProp !== undefined ? setValueFromProp : methods ? methods.setValue : () => {throw Error("Must provide setValue prop or formContext")};
    const register = registerFromProp !== undefined ? registerFromProp : methods ? methods.register : () => {throw Error("Must provide register prop or formContext")};
    const unregister = unregisterFromProp !== undefined ? unregisterFromProp : methods ? methods.unregister : () => {throw Error("Must provide unregister prop or formContext")};

    const commonTask = (target: any) => {
      const data = getValue(target, { isCheckbox });
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
      const data = commonTask(e ? e.target : e);
      setValue(name, data, isOnChange);
      if (onChange) {
        onChange(e);
      }
    };

    const handleBlur = (e: any) => {
      const data = commonTask(e ? e.target : e);
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
      ...(onChangeEvent
        ? { [onChangeName || 'onChange']: eventWrapper(onChangeEvent) }
        : { onChange: handleChange }),
      ...(isOnBlur
        ? onBlurEvent
          ? { [onBlurName || 'onBlur']: eventWrapper(onBlurEvent) }
          : { onBlur: handleBlur }
        : {}),
      value: value || inputValue,
      ...(isCheckbox ? { checked: inputValue } : {}),
    });
  },
);

export { RHFInput };
