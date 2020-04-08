import '@testing-library/jest-dom/extend-expect'
import { getByPlaceholderText, getByTestId, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/svelte'
import TestWrapper from './TestWrapper.svelte'

function renderForm(props) {
  const { container } = render(TestWrapper, props);
  return container.firstChild;
}

describe('has correct values', () => {
  test('default values', async () => {
    const container = renderForm({ html: `<input name="name" placeholder="Enter name" value="From Test" />` });
    const pre = getByTestId(container, 'values')
    expect(pre).toHaveTextContent("From Test")
  });
  test('one input', async () => {
    const container = renderForm({ html: `<input name="name" placeholder="Enter name" />` });
    const input = getByPlaceholderText(container, 'Enter name')
    userEvent.type(input, "Kevin")
    const pre = getByTestId(container, 'values')
    await waitFor(() => {
      expect(pre).toHaveTextContent("Kevin")
    })
  });
});