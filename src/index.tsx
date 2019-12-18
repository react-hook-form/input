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
        ? target
        : target.checked
      : isUndefined(target.value)
      ? target
      : target.value
    : target;
}

const RHFInput = ({
  name,
  rules,
  mode = 'onSubmit',
  as: InnerComponent,
  onChange,
  onBlur,
  type,
  value,
  onChangeName,
  onChangeEvent,
  onBlurName,
  onBlurEvent,
  control,
  ...rest
}: Props) => {
  const isCheckbox = type === 'checkbox';
  const isOnChange = mode === 'onChange';
  const isOnBlur = mode === 'onBlur';
  const [inputValue, setInputValue] = React.useState(value);
  const valueRef = React.useRef(value);
  const methods = useFormContext() || {};
  const setValue = control.setValue || methods.setValue;
  const register = control.register || methods.register;
  const unregister = control.unregister || methods.unregister;

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
        unregister(name);
      }
    };
  }, [register, unregister, name]); // eslint-disable-line react-hooks/exhaustive-deps

  const props = {
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
