import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormContext } from 'react-hook-form';
import { FormStateProxy } from 'react-hook-form/dist/types';
import ReactSelect, { Props } from 'react-select';
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  RadioGroupProps,
} from '@material-ui/core';
import { RHFInput } from './index';

describe('React Hook Form Input', () => {
  it('should render correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};
    const { asFragment } = render(
      <RHFInput
        setValue={setValue}
        register={register}
        unregister={unregister}
        name="test"
        as="input"
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render MUI Checkbox correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};
    const { asFragment } = render(
      <RHFInput
        as={Checkbox}
        name="Checkbox"
        type="checkbox"
        value="test"
        unregister={unregister}
        register={register}
        setValue={setValue}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render MUI Radio correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};

    const { asFragment } = render(
      <RHFInput<RadioGroupProps>
        as={RadioGroup}
        innerProps={{ 'aria-label': 'gender', name: 'gender1' }}
        aria-label="gender"
        name="RadioGroup"
        register={register}
        setValue={setValue}
        unregister={unregister}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RHFInput>,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render MUI TextField correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};

    const { asFragment } = render(
      <RHFInput
        as={TextField}
        name="TextField"
        register={register}
        setValue={setValue}
        unregister={unregister}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render MUI Switch correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};

    const { asFragment } = render(
      <RHFInput
        as={Switch}
        value="checkedA"
        name="switch"
        type="checkbox"
        register={register}
        setValue={setValue}
        unregister={unregister}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render MUI Select correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const unregister = () => {};

    const { asFragment } = render(
      <RHFInput
        as={Select}
        name="Select"
        register={register}
        setValue={setValue}
        unregister={unregister}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </RHFInput>,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should render react-select correctly', () => {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];

    <RHFInput<Props>
      as={ReactSelect}
      innerProps={{
        options,
        isClearable: true,
      }}
      name="ReactSelect"
    />;
  });

  it('should register input when component mount', () => {
    const setValue = () => {};
    const register = jest.fn();
    const unregister = () => {};
    render(
      <RHFInput
        setValue={setValue}
        register={register}
        unregister={unregister}
        name="test"
        rules={{ required: true }}
        as="input"
      />,
    );

    expect(register).toBeCalledWith({ name: 'test' }, { required: true });
  });

  it('should unregister input when component unmount', () => {
    const setValue = () => {};
    const register = jest.fn();
    const unregister = jest.fn();
    const { unmount } = render(
      <RHFInput
        setValue={setValue}
        register={register}
        unregister={unregister}
        name="test"
        rules={{ required: true }}
        as="input"
      />,
    );
    expect(unregister).not.toBeCalled();
    unmount();
    expect(unregister).toBeCalledWith('test');
  });

  it("shouldn't unregister even if props changed", () => {
    const unregister = jest.fn();
    const register = jest.fn();
    const { rerender } = render(
      <RHFInput
        setValue={() => {}}
        register={register}
        unregister={unregister}
        name="test"
        rules={{ required: true }}
        as="input"
      />,
    );
    rerender(
      <RHFInput
        setValue={() => {}}
        register={register}
        unregister={unregister}
        name="test"
        rules={{ required: false }}
        as="input"
      />,
    );
    expect(unregister).not.toBeCalled();
  });

  it('should update internal value when onChange fired', () => {
    const setValue = jest.fn();
    const register = () => () => {};
    const unregister = () => {};
    const { getByPlaceholderText } = render(
      <RHFInput<React.HTMLAttributes<HTMLInputElement>>
        innerProps={{ placeholder: 'test' }}
        setValue={setValue}
        register={register}
        unregister={unregister}
        name="test"
        as="input"
      />,
    );

    const input = getByPlaceholderText('test');
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    expect(setValue).toBeCalledWith('test', 'test', false);
  });

  it('should use formContext when setValue prop not provided', () => {
    const record: Record<string, any> = {};
    const formState: FormStateProxy = {
      dirty: true,
      isSubmitted: true,
      isSubmitting: false,
      isValid: true,
      submitCount: 1,
      touched: [],
    };
    const methods = {
      setValue: jest.fn(),
      register: () => () => {},
      unregister: () => {},
      watch: () => () => {},
      reset: () => {},
      clearError: () => {},
      setError: () => {},
      triggerValidation: () => new Promise<boolean>(resolve => resolve(true)),
      getValues: () => record,
      handleSubmit: () => () => new Promise<void>(resolve => resolve()),
      errors: {},
      formState: formState,
    };

    const register = () => () => {};
    const unregister = () => {};

    const { getByPlaceholderText } = render(
      <FormContext {...methods}>
        <RHFInput<React.HTMLAttributes<HTMLInputElement>>
          innerProps={{ placeholder: 'test' }}
          name="test"
          as="input"
          register={register}
          unregister={unregister}
        />
      </FormContext>,
    );

    const input = getByPlaceholderText('test');
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    expect(methods.setValue).toBeCalledWith('test', 'test', false);
  });

  it('should use formContext when register prop not provided', () => {
    const record: Record<string, any> = {};
    const formState: FormStateProxy = {
      dirty: true,
      isSubmitted: true,
      isSubmitting: false,
      isValid: true,
      submitCount: 1,
      touched: [],
    };
    const methods = {
      setValue: () => {},
      register: jest.fn(),
      unregister: () => {},
      watch: () => () => {},
      reset: () => {},
      clearError: () => {},
      setError: () => {},
      triggerValidation: () => new Promise<boolean>(resolve => resolve(true)),
      getValues: () => record,
      handleSubmit: () => () => new Promise<void>(resolve => resolve()),
      errors: {},
      formState: formState,
    };

    const setValue = () => {};
    const unregister = () => {};

    render(
      <FormContext {...methods}>
        <RHFInput<React.HTMLAttributes<HTMLInputElement>>
          innerProps={{ placeholder: 'test' }}
          name="test"
          as="input"
          setValue={setValue}
          rules={{ required: true }}
          unregister={unregister}
        />
      </FormContext>,
    );

    expect(methods.register).toBeCalledWith(
      { name: 'test' },
      { required: true },
    );
  });

  it('should use formContext when unregister prop not provided', () => {
    const record: Record<string, any> = {};
    const formState: FormStateProxy = {
      dirty: true,
      isSubmitted: true,
      isSubmitting: false,
      isValid: true,
      submitCount: 1,
      touched: [],
    };
    const methods = {
      setValue: () => {},
      register: () => () => {},
      unregister: jest.fn(),
      watch: () => () => {},
      reset: () => {},
      clearError: () => {},
      setError: () => {},
      triggerValidation: () => new Promise<boolean>(resolve => resolve(true)),
      getValues: () => record,
      handleSubmit: () => () => new Promise<void>(resolve => resolve()),
      errors: {},
      formState: formState,
    };

    const setValue = () => {};
    const register = () => () => {};

    const { unmount } = render(
      <FormContext {...methods}>
        <RHFInput<React.HTMLAttributes<HTMLInputElement>>
          innerProps={{ placeholder: 'test' }}
          name="test"
          as="input"
          setValue={setValue}
          rules={{ required: true }}
          register={register}
        />
      </FormContext>,
    );

    unmount();

    expect(methods.unregister).toBeCalledWith('test');
  });
});
