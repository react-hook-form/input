import * as React from 'react';
import { useFormContext, isUndefined, get, isCheckbox } from 'react-hook-form';
import { Props, EventFunction } from './types';

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
  const isCheckboxInput = isCheckbox(type);
  // const formState = control.formState;
  const defaultValue = control.defaultValues[name];
  const [inputState, setInputState] = React.useState(defaultValue || value);
  const valueRef = React.useRef(defaultValue || value);
  const methods = useFormContext() || {};
  const setValue = control.setValue || methods.setValue;
  const register = control.register || methods.register;
  const unregister = control.unregister || methods.unregister;

  const shouldValidate = () => {
    return !!get(control.errors, name);
  };

  const commonTask = (target: any) => {
    const data = getValue(target, { isCheckbox: isCheckboxInput });
    setInputState(data);
    valueRef.current = data;
    return data;
  };

  const eventWrapper = (event: EventFunction, eventName: string) => {
    return async (...arg: any) => {
      const data = commonTask(await event(arg));
      setValue(
        name,
        data,
        (control.mode.isOnChange && eventName === 'onChange') ||
          (control.mode.isOnBlur && eventName === 'onBlur'),
      );
    };
  };

  const handleChange = (e: any) => {
    const data = commonTask(e && e.target ? e.target : e);
    setValue(name, data, shouldValidate());
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: any) => {
    const data = commonTask(e && e.target ? e.target : e);
    setValue(name, data, shouldValidate());
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
            setInputState(data);
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
    ...(control.mode.isOnBlur || control.reValidateMode.isReValidateOnBlur
      ? onBlurEvent
        ? {
            [onBlurName || 'onBlur']: eventWrapper(onBlurEvent, 'onBlur'),
          }
        : { onBlur: handleBlur }
      : {}),
    value: inputState || value || '',
    ...(isCheckboxInput ? { checked: inputState } : {}),
    ...rest,
  };

  return React.isValidElement(InnerComponent) ? (
    React.cloneElement(InnerComponent, props)
  ) : (
    <InnerComponent {...props} />
  );
};

export { RHFInput };
