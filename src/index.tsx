import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Props, EventFunction } from './types';

const isUndefined = (val: unknown): val is undefined => val === undefined;

function getValue(target: any, { isCheckbox }: { isCheckbox: boolean }) {
  // the following logic is specific for react-select
  if (target && (Array.isArray(target) || (target.label && target.value))) {
    return target;
  }

  return target
    ? isCheckbox
      ? isUndefined(target.checked)
        ? target.checked
        : target
      : isUndefined(target.value)
      ? target
      : target.value
    : target;
}

const RHFInput = ({
  innerProps,
  setValue: setValueFromProp,
  register: registerFromProp,
  unregister: unregisterFromProp,
  name,
  rules,
  mode = 'onSubmit',
  as: InnerComponent,
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
    ? isUndefined(defaultChecked)
      ? false
      : defaultChecked
    : defaultValue;
  const [inputValue, setInputValue] = React.useState(defaultData);
  const valueRef = React.useRef(defaultData);
  const methods = useFormContext() || {};
  const setValue = setValueFromProp || methods.setValue;
  const register = registerFromProp || methods.register;
  const unregister = unregisterFromProp || methods.unregister;

  const commonTask = (target: any) => {
    const data = getValue(target, { isCheckbox });
    setInputValue(data);
    valueRef.current = data;
    return data;
  };

  const eventWrapper = (event: EventFunction, eventName: string) => {
    return async (...arg: any) => {
      const data = commonTask(await event(arg));
      setValue(
        name,
        data,
        (isOnChange && eventName === 'onChange') ||
          (isOnBlur && eventName === 'onBlur'),
      );
    };
  };

  const handleChange = (e: any) => {
    const data = commonTask(e && e.target ? e.target : e);
    setValue(name, data, isOnChange);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: any) => {
    const data = commonTask(e && e.target ? e.target : e);
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

  const props = {
    ...innerProps,
    ...(onChangeEvent
      ? {
          [onChangeName || 'onChange']: eventWrapper(onChangeEvent, 'onChange'),
        }
      : { onChange: handleChange }),
    ...(isOnBlur
      ? onBlurEvent
        ? {
            [onBlurName || 'onBlur']: eventWrapper(onBlurEvent, 'onBlur'),
          }
        : { onBlur: handleBlur }
      : {}),
    value: inputValue || value || '',
    ...(isCheckbox ? { checked: inputValue } : {}),
    ...rest,
  };

  return React.isValidElement(InnerComponent) ? (
    React.cloneElement(InnerComponent, props)
  ) : (
    <InnerComponent {...props} />
  );
};

export { RHFInput };
