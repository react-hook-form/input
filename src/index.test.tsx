import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HookFormInput } from './index';

describe('React Hook Form Input', () => {
  it('should render correctly', () => {
    const setValue = () => {};
    const register = () => {};
    const { asFragment } = render(
      <HookFormInput
        setValue={setValue}
        register={register}
        name="test"
        component={<input />}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should register input when component mount', () => {
    const setValue = () => {};
    const register = jest.fn();
    render(
      <HookFormInput
        setValue={setValue}
        register={register}
        name="test"
        rules={{ required: true }}
        component={<input />}
      />,
    );

    expect(register).toBeCalledWith(
      { name: 'test', type: 'custom' },
      { required: true },
    );
  });

  it('should update internal value when onChange fired', () => {
    const setValue = jest.fn();
    const register = () => {};
    const { getByPlaceholderText } = render(
      <HookFormInput
        setValue={setValue}
        register={register}
        name="test"
        component={<input placeholder="test" />}
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
});
