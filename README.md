<div align="center" margin="0 auto 20px">
  <div align="center">
    <img src="logo.svg" alt="svelte-forms" height="120" />
  </div>
  <a href='https://travis-ci.com/github/svelteschool/svelte-forms'>
      <img src="https://travis-ci.com/svelteschool/svelte-forms.svg?branch=master" alt="Travis Badge" />
  </a>
  <a href='https://www.npmjs.com/package/@svelteschool/svelte-forms'>
      <img src="https://img.shields.io/npm/dt/@svelteschool/svelte-forms" alt="NPM Downloads Badge" />
  </a>
</div>

A no-fuss [Svelte](https://svelte.dev/) form component that just works.

  - **Plug'n'Play**. Input elements in, values out.
  - Works just like a normal form. Except it does all the tedious work for you.
  - **Extendable**. Work with most inputs and custom input components out of the box.
  - **Two-Way Binding**. Svelte-forms is two-way bound by default. Change a value in your object, and it changes in your inputs.
  - ~~**A toolbox of actions** to apply to your elements: **Validate**, **FocusOnSelect**, **Numbers**, **TextareaAutoRezie**, and many more.~~ (Soon!)

[**Try it out on the Svelte REPL!**](https://svelte.dev/repl/ddc56a9e9f9c4289bbe714c6dd48989d?version=3.20.1)

## Usage

Simply bind to the components values property:

Using built-in HTML input elements:
```html
<script>
  import Form from "@svelteschool/svelte-forms";
  let values;
</script>

<Form bind:values>
  <input
    placeholder="Enter first name..."
    type="text"
    name="firstName" />
  <input
    placeholder="Enter last name..."
    type="text"
    name="lastName" />
</Form>
```

Here's how the values object would be structured in the above case:

```js
{
  firstName: 'Svelte',
  lastName: 'School'
}
```

Inputs that do not have a `name` property or are `disabled` will not show up in the object.

__File inputs are not supported.__

## Props

prop name            | type                      | default
---------------------|---------------------------|-------------------------
`actions`            | `[[action, actionProp]]`  | `[]`

### `actions`
The actions prop takes an array of [action, options]. The `action` is applied to the form element using the `options` just like it would be if you manually applied it to an element: `use:action={options}`.

## Installing

Simple. Install it using `yarn` or `npm`.
```
yarn add @svelteschool/svelte-forms

npm install @svelteschool/svelte-forms
```

If you're using Sapper, make sure to install it as a dev dependency:
```
yarn add -D @svelteschool/svelte-forms
```

## Running the tests

Run tests by running the test script:
```
yarn test
```

## Contribute

If you are interested in contributing you are welcome to open PRs. Please make sure all tests pass and if you add functionality, add your own tests.


## Authors

* **Svelte School** - [Svelte School](https://github.com/svelteschool)
* **Kevin Åberg Kultalahti** -  [kevmodrome](https://github.com/kevmodrome)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspired by [lukeed](https://github.com/lukeed) and his [formee](https://github.com/lukeed/formee) library.
