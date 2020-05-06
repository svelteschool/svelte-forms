import "@testing-library/jest-dom/extend-expect";
import {
  getByPlaceholderText,
  getByTestId,
  waitFor,
} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/svelte";
import TestWrapper from "./TestWrapper.svelte";

// Things needed in the tests
import { testAction } from "./utils/testAction.js";

function renderForm(props) {
  const container = render(TestWrapper, props);
  return container.container.firstChild;
}

describe("has correct values", () => {
  test("default values", async () => {
    const container = renderForm({
      html: `<input name="name" placeholder="Enter name" value="From Test" />`,
    });
    const pre = getByTestId(container, "values");
    expect(pre).toHaveTextContent("From Test");
  });
  test("one input", async () => {
    const container = renderForm({
      html: `<input name="name" placeholder="Enter name" />`,
    });
    const input = getByPlaceholderText(container, "Enter name");
    userEvent.type(input, "Kevin");
    const pre = getByTestId(container, "values");
    await waitFor(() => {
      expect(pre).toHaveTextContent("Kevin");
    });
  });
  test("checkbox inputs", async () => {
    const container = renderForm({
      html: `
        <input type="checkbox" name="movies" value="Space Jam" data-testid="m1" />
        <input type="checkbox" name="movies" value="Home Alone" data-testid="m2" />
      `,
    });
    const input = getByTestId(container, "m2");
    userEvent.click(input);
    const pre = getByTestId(container, "values");
    await waitFor(() => {
      expect(pre).toHaveTextContent('{"movies":["Home Alone"]}');
    });
  });
  test("radio button inputs", async () => {
    const container = renderForm({
      html: `
        <input type="radio" name="gender" value="M" data-testid="g1"/>
        <input type="radio" name="gender" value="F" data-testid="g2"/>
      `,
    });
    const input = getByTestId(container, "g2");
    userEvent.click(input);
    const pre = getByTestId(container, "values");
    await waitFor(() => {
      expect(pre).toHaveTextContent('{"gender":"F"}');
    });
  });
  test("multi-select input", async () => {
    const container = renderForm({
      html: `
        <input type="checkbox" name="movies" value="Space Jam" data-testid="m1" />
        <select name="pets" id="pet-select" multiple data-testid="p1">
          <option value="dog" data-testid="o1">Dog</option>
          <option value="cat" data-testid="o2">Cat</option>
          <option value="hamster" data-testid="o3">Hamster</option>
          <option value="parrot" data-testid="o4">Parrot</option>
          <option value="spider" data-testid="o5">Spider</option>
          <option value="goldfish" data-testid="o6">Goldfish</option>
        </select>
      `,
    });
    const select = getByTestId(container, "p1");
    userEvent.selectOptions(select, ["dog", "hamster"]);
    // TODO: Fix this
    // userEvent.selectOptions doesn't trigger the update
    // A checkbox was included just to trigger the update with the click below.
    userEvent.click(getByTestId(container, "m1"));
    const pre = getByTestId(container, "values");
    await waitFor(() => {
      expect(pre).toHaveTextContent(
        '{"movies":["Space Jam"],"pets":["dog","hamster"]}'
      );
    });
  });
});

describe("handles reactivity", () => {
  test("one input", async () => {
    const container = renderForm({
      html: `<input name="name" placeholder="Enter name" data-testid="t1"/>`,
      input: { name: "Rodrigo" },
    });
    userEvent.click(getByTestId(container, "b1"));

    const pre = getByTestId(container, "t1");
    await waitFor(() => {
      expect(pre.value).toEqual("Rodrigo");
    });
  });
  test("checkbox inputs", async () => {
    const container = renderForm({
      html: `
        <input type="checkbox" name="movies" value="Space Jam" data-testid="m1" />
        <input type="checkbox" name="movies" value="Home Alone" data-testid="m2" />
      `,
      input: { movies: ["Home Alone"] },
    });
    userEvent.click(getByTestId(container, "b1"));
    await waitFor(() => {
      expect(getByTestId(container, "m1").checked).toBe(false);
      expect(getByTestId(container, "m2").checked).toBe(true);
    });
  });
  test("radio button", async () => {
    const container = renderForm({
      html: `
        <input type="radio" name="gender" value="M" data-testid="g1"/>
        <input type="radio" name="gender" value="F" data-testid="g2"/>
      `,
      input: { gender: "M" },
    });
    userEvent.click(getByTestId(container, "b1"));
    await waitFor(() => {
      expect(getByTestId(container, "g1").checked).toBe(true);
      expect(getByTestId(container, "g2").checked).toBe(false);
    });
  });
  test("multi-select input", async () => {
    const container = renderForm({
      html: `
        <input type="checkbox" name="movies" value="Space Jam" data-testid="m1" />
        <select name="pets" id="pet-select" multiple data-testid="p1">
          <option value="dog" data-testid="o1">Dog</option>
          <option value="cat" data-testid="o2">Cat</option>
          <option value="hamster" data-testid="o3">Hamster</option>
          <option value="parrot" data-testid="o4">Parrot</option>
          <option value="spider" data-testid="o5">Spider</option>
          <option value="goldfish" data-testid="o6">Goldfish</option>
        </select>
      `,
      input: { pets: ["dog", "hamster"] },
    });
    userEvent.click(getByTestId(container, "b1"));
    await waitFor(() => {
      expect(getByTestId(container, "o1").selected).toBe(true);
      expect(getByTestId(container, "o2").selected).toBe(false);
      expect(getByTestId(container, "o3").selected).toBe(true);
      expect(getByTestId(container, "o4").selected).toBe(false);
      expect(getByTestId(container, "o5").selected).toBe(false);
      expect(getByTestId(container, "o6").selected).toBe(false);
    });
  });
});

describe("can handle supplied actions", () => {
  test("one action with props", async () => {
    const container = renderForm({
      actions: [[testAction, "brown"]]
    });

    await waitFor(() => {
      expect(container.style.getPropertyValue('background')).toEqual("brown");
    });
  });
  test("one action without props", async () => {
    const container = renderForm({
      actions: [[testAction]]
    });

    await waitFor(() => {
      expect(container.style.getPropertyValue('background')).toEqual("blue");
    });
  });
});
