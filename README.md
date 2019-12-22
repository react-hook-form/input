<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use validation.</p>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/react-hook-form-input.svg?style=flat-square)](https://www.npmjs.com/package/react-hook-form)
[![npm](https://img.shields.io/npm/dt/react-hook-form-input.svg?style=flat-square)](https://www.npmjs.com/package/react-hook-form)
[![npm](https://badgen.net/bundlephobia/minzip/react-hook-form-input)](https://badgen.net/bundlephobia/minzip/react-hook-form)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hooks+for+form+validation+without+the+hassle&url=https://github.com/bluebill1049/react-hook-form)&nbsp;[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-hook-form)

</div>

<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form Input - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/react-hook-form/react-hook-form-input/master/src/example.gif" alt="React Hook Form video - React custom hook for form validation" width="750px" />
        </a>
    </p>
</div>

⚠️ This component is a part of React Hook Form V4, and renamed to <a href="http://react-hook-form.com/api#Controller">Controller</a> with much simpler API.

## Why?

<a href="https://github.com/react-hook-form/react-hook-form">React Hook Form</a> embrace uncontrolled components and native inputs, however it's hard to avoid working with external controlled component such as <a href="https://github.com/JedWatson/react-select">React-Select</a>, <a href="https://github.com/ant-design/ant-design">AntD</a> and <a href="https://material-ui.com/">Material-UI</a>. This wrapper component will make your life easier to work with them.

## Features

- Isolate re-rendering at component level
- Integrate easily with React Hook Form (skip custom register at `useEffect`)
- Enable <a href="https://react-hook-form.com/api#reset">reset</a> API with Controlled Components without external state

## Install

    $ npm install react-hook-form-input

## Demo

Check out this <a href="https://codesandbox.io/s/react-hook-form-hookforminput-rzu9s">React Web demo</a> or <a href="https://snack.expo.io/@bluebill1049/test-react-hook-form-input">React Native demo</a>.

## Quickstart

#### React Web

```jsx
import React from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
];

function App() {
  const { handleSubmit, register, setValue, reset } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <RHFInput
        as={<Select options={options} />}
        rules={{ required: true }}
        name="reactSelect"
        register={register}
        setValue={setValue}
      />
      <button type="button">Reset Form</button>
      <button>submit</button>
    </form>
  );
}
```

#### React Native

```jsx
import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import useForm from 'react-hook-form';
import { RHFInput } from './index';

export default () => {
  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const onChange = args => ({
    value: args[0].nativeEvent.text,
  });

  return (
    <View style={styles.container}>
      <RHFInput
        register={register}
        setValue={setValue}
        as={<TextInput />}
        onChangeEvent={onChange}
        name="firstName"
      />

      <Button title="Button" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
```

## API

| Prop            | Type      | Required |   Default   | Description                                                                                                                                                                              |
| :-------------- | :-------- | :------: | :---------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`            | Component |    ✓     |             | Component reference eg: `Select` from `react-select`                                                                                                                                     |
| `name`          | string    |    ✓     |             | Unique name to register the custom input                                                                                                                                                 |
| `setValue`      | Function  |          |             | (optional when using <a href="https://react-hook-form.com/api#FormContext">FormContext</a>) React Hook Form <a href="https://react-hook-form.com/api#setValue">setValue</a> function     |
| `register`      | Function  |          |             | (optional when using <a href="https://react-hook-form.com/api#FormContext">FormContext</a>) React Hook Form <a href="https://react-hook-form.com/api#register">register</a> function     |
| `unregister`    | Function  |          |             | (optional when using <a href="https://react-hook-form.com/api#FormContext">FormContext</a>) React Hook Form <a href="https://react-hook-form.com/api#unregister">unregister</a> function |
| `mode`          | string    |          | `onSubmit`  | <a href="https://react-hook-form.com/api#useForm">Mode</a> option for triggering validation                                                                                              |
| `rules`         | Object    |          | `undefined` | Validation rules according to <a href="https://react-hook-form.com/api#register">register</a> at React Hook Form                                                                         |
| `type`          | string    |          |   `input`   | Currently support `checkbox` or `input` input type includes: `radio` and `select`                                                                                                        |
| `onChangeName`  | string    |          |             | This prop allow you to target that specific event name, eg: when `onChange` event is named `onTextChange`                                                                                |
| `onChangeEvent` | Function  |          |             | Callback function to return `value` or `checked`. event callback argument may have different signature and this props allow you to customise the value return.                           |
| `onBlurName`    | string    |          |             | This prop allow you to target that specific event name, eg: when `onBlur` event is named `onTextBlur`                                                                                    |
| `onBlurEvent`   | Function  |          |             | Callback function to return `value` or `checked`. event callback argument may have different signature and this props allow you to customise the value return.                           |
| `...rest`       | Object    |          |             | Any props assigned will be pass through to your Input component                                                                                                                          |

## Backers

Thank goes to all our backers! [[Become a backer](https://opencollective.com/react-hook-form#backer)].

<a href="https://opencollective.com/react-hook-form#backers">
    <img src="https://opencollective.com/react-hook-form/backers.svg?width=950" />
</a>

## Contributors

Thanks goes to these wonderful people. [[Become a contributor](CONTRIBUTING.md)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/contributors.svg?width=950" />
</a>

#### Thanks to

- Inspiration goes to <a href="https://github.com/JedWatson">Jed Watson</a> @github <a href="https://github.com/JedWatson/react-select/issues/3855">issue #3855</a>.
- Shaping better API <a href="https://github.com/JeromeDeLeon">Jerome De Leon</a>
