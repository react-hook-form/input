import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RHFInput } from './index';

describe('React Hook Form Input', () => {
  it('should render correctly', () => {
    const setValue = () => {};
    const register = () => () => {};
    const { asFragment } = render(
      <RHFInput
        setValue={setValue}
        register={register}
        name="test"
        as={<input />}
      />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('should register input when component mount', () => {
    const setValue = () => {};
    const register = jest.fn();
    render(
      <RHFInput
        setValue={setValue}
        register={register}
        name="test"
        rules={{ required: true }}
        as={<input />}
      />,
    );

    expect(register).toBeCalledWith(
      { name: 'test' },
      { required: true },
    );
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

  it('should update internal value when onChange fired', () => {
    const setValue = jest.fn();
    const register = () => () => {};
    const { getByPlaceholderText } = render(
      <RHFInput
        setValue={setValue}
        register={register}
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
});
