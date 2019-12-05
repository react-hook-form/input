import * as React from 'react';

export type ValidateResult = string | boolean | undefined;

export type Validate = (data: any) => ValidateResult;

export type ValidationOptionObject<Value> =
  | Value
  | { value: Value; message: string };

export type ValidationOptions = Partial<{
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

export type EventFunction = (
  args: any,
) => {
  value?: any;
  checked?: boolean;
};

export type Props<T> = {
  children?: React.ReactNode;
  innerProps?: T;
  setValue?: (name: string, value: any, trigger?: boolean) => void;
  register?: (ref: any, rules: ValidationOptions) => (name: string) => void;
  unregister?: (name: string) => void;
  name: string;
  as: React.ElementType<any>;
  type?: string;
  rules?: ValidationOptions;
  value?: string | boolean;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  defaultValue?: string;
  defaultChecked?: boolean;
  onChangeName?: string;
  onChangeEvent?: EventFunction;
  onBlurName?: string;
  onBlurEvent?: EventFunction;
};
