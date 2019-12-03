import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RHFInput } from './index';
import { FormContext } from 'react-hook-form';
import { FormStateProxy } from 'react-hook-form/dist/types';

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
        as={<input />}
      />,
    );

    expect(asFragment).toMatchSnapshot();
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
        as={<input />}
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
        as={<input />}
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
        as={<input />}
      />,
    );
    rerender(
      <RHFInput
        setValue={() => {}}
        register={register}
        unregister={unregister}
        name="test"
        rules={{ required: false }}
        as={<input />}
      />,
    );
    expect(unregister).not.toBeCalled();
  });

  it('should update internal value when onChange fired', () => {
    const setValue = jest.fn();
    const register = () => () => {};
    const unregister = () => {};
    const { getByPlaceholderText } = render(
      <RHFInput
        setValue={setValue}
        register={register}
        unregister={unregister}
        name="test"
        as={<input placeholder="test" />}
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
        <RHFInput
          name="test"
          as={<input placeholder="test" />}
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
        <RHFInput
          name="test"
          as={<input placeholder="test" />}
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
        <RHFInput
          name="test"
          as={<input placeholder="test" />}
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
