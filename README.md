<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use for validation.</p>

## Why?
React Hook Form embrace uncontrolled components and native inputs, however it's hard to avoid working with external controlled component. This wrapper component will make your life easier to work with Controlled components such as <a href="https://github.com/JedWatson/react-select">React-Select</a>, <a href="https://github.com/ant-design/ant-design">AntD</a> and <a href="https://material-ui.com/">Material-UI</a>.

Inspiration and credit goes to <a href="https://github.com/JedWatson">Jed Watson</a> @github <a href="https://github.com/JedWatson/react-select/issues/3855">issue #3855</a>.

## Install

    $ npm install react-hook-form-input

## Quickstart

```jsx
import React from "react";
import useForm from "react-hook-form";
import { HookFormInput } from "react-hook-form-input";
import Select from "react-select";
import React from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import Select from "react-select";
import HookFormInput from "./HookFormInput";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

function App() {
  const methods = useForm();
  const { handleSubmit, register, setValue, reset } = methods;

  return (
    <form onSubmit={handleSubmit(e => console.log(e))}>
      <input name="test" ref={register} />
      <HookFormInput
        input={Select}
        rules={{ required: true }}
        options={options}
        name="test1"
        {...methods}
      />
      <button
        type="button"
        onClick={() => {
          setValue("test1", "");
        }}
      >
        Reset React Select
      </button>
      <button
        type="button"
        onClick={() => {
          reset({
            test1: "",
            test: ""
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

