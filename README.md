<div align="center" margin="0 auto 20px">
  <h1>svelte-forms</h1>
    <a href='https://travis-ci.com/github/svelteschool/svelte-forms'>
        <img src="https://travis-ci.com/svelteschool/svelte-forms.svg?branch=master" alt="Travis Badge" />
    </a>
  </div>
</div>

A no-fuss [Svelte](https://svelte.dev/) forms component that just works.

  - **Plug'n'Play**. Input elements in, values out.
  - Works just like a normal form. Except it does all the tedious work for you.
  - **Extendable**. Work with most inputs and custom input components out of the box. No more fussing around with custom components and passing data back-and-forth between components.
  - ~~**A toolbox of actions** to apply to your elements: **Validate**, **FocusOnSelect**, **Numbers**, **TextareaAutoRezie**, and many more.~~ (Soon!)

[**Try it out on the Svelte REPL!**](https://www.google.com)

## Usage

The package emits an `update` event that contains an object with all the values of your input elements.

Using built-in HTML input elements:
```html
<script>
  import Form from "@svelteschool/svelte-forms";
  let formValues;
</script>

<Form on:update={({ detail }) => (formValues = detail)}>
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

The `update` event emits an object containing your values. In the above example it would look something like this:

```js
{
  firstName: 'Svelte',
  lastName: 'School
}
```

Inputs that do not have a `name` property or are `disabled` will not show up in the object.

__File inputs are not supported.__

### Installing

Simple. Install it using `yarn` or `npm`.
```
yarn add @svelteschool/svelte-forms
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
