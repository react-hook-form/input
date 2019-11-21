<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use for validation.</p>

This wrapper component will make your life easier to work with Controlled components such as <a href="https://github.com/JedWatson/react-select">React-Select</a>, <a href="https://github.com/ant-design/ant-design">antd</a> and <a href="https://material-ui.com/">Material-UI</a>.

## Quickstart

```jsx
import React from "react";
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
  const { handleSubmit, register, setValue, Reset } = methods;

  return (
    <form onSubmit={handleSubmit(e => console.log(e))}>
      <input name="test" ref={register} />
      <HookFormInput
        children={Select}
        options={options}
        name="ReactSelect"
        {...methods}
      />
      <button
        type="button"
        onClick={() => {
          setValue("ReactSelect", "");
        }}
      >
        Reset React-Select
      </button>
      <button type="button" onClick={() => {
          setValue("ReactSelect", "");
        }}>Reset</button>
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

