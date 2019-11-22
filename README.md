<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use for validation.</p>

<p align="center">⚠️Still under construction. API may change as testing with more external components⚠️</p>

## 🤔 Why?

<a href="https://github.com/react-hook-form/react-hook-form">React Hook Form</a> embrace uncontrolled components and native inputs, however it's hard to avoid working with external controlled component such as <a href="https://github.com/JedWatson/react-select">React-Select</a>, <a href="https://github.com/ant-design/ant-design">AntD</a> and <a href="https://material-ui.com/">Material-UI</a>. This wrapper component will make your life easier to work with them.

Inspiration and credit goes to <a href="https://github.com/JedWatson">Jed Watson</a> @github <a href="https://github.com/JedWatson/react-select/issues/3855">issue #3855</a>.

## ✨ Features

- isolate re-rendering at your component level
- easily integrate with React Hook Form
- tiny component

## 📦 Install

    $ npm install react-hook-form-input

## 🎪 Demo

Check out this <a href="https://codesandbox.io/s/react-hook-form-hookforminput-rzu9s">demo</a>.

## 🎬 Quickstart

```jsx
import React from 'react';
import useForm from 'react-hook-form';
import { HookFormInput } from 'react-hook-form-input';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function App() {
  const { handleSubmit, register, setValue, reset } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <HookFormInput
        component={<Select options={options} />}
        rules={{ required: true }}
        name="reactSelect"
        register={register}
        setValue={setValue}
      />
      <button
        type="button"
        onClick={() => {
          reset({
            reactSelect: '',
          });
        }}
      >
        Reset Form
      </button>
      <button>submit</button>
    </form>
  );
}
```

## 📖 API

| Prop        | Type      | Required | Description                                                                                                      |
| :---------- | :-------- | :------: | :--------------------------------------------------------------------------------------------------------------- |
| `component` | Component |    ✓     | Component reference eg: `Select` from `react-select`                                                             |
| `setValue`  | Function  |    ✓     | React Hook Form <a href="https://react-hook-form.com/api#setValue">setValue</a> function                         |
| `register`  | Function  |    ✓     | React Hook Form <a href="https://react-hook-form.com/api#register">register</a> function                         |
| `name`      | string    |    ✓     | Unique name for React Hook Form to register the input                                                            |
| `mode`      | string    |          | default to `onSubmit`                                                                                            |
| `rules`     | Object    |          | Validation rules according to <a href="https://react-hook-form.com/api#register">register</a> at React Hook Form |
| `type`      | string    |          | Currently support `checkbox` or `input` input type includes: `radio` and `select`                                |
| `value`     | string    |          | value can be applied for `checkbox`                                                                              |
| `...rest`   | Object    |          | any props assigned will be pass through to your Input component                                                  |

## Contributors

Thanks goes to these wonderful people. [[Become a contributor](CONTRIBUTING.md)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/contributors.svg?width=950" />
</a>

## Backers

Thank goes to all our backers! [[Become a backer](https://opencollective.com/react-hook-form#backer)].

<a href="https://opencollective.com/react-hook-form#backers">
    <img src="https://opencollective.com/react-hook-form/backers.svg?width=950" />
</a>
