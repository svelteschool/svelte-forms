import '@testing-library/jest-dom/extend-expect'
import { getByPlaceholderText, getByTestId, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/svelte'
import TestWrapper from './TestWrapper.svelte'

function renderForm(props) {
  const { container } = render(TestWrapper, props);
  return container.firstChild;
}
function renderComponent(props) {
  const { container } = render(TestWrapper, props);
  return container.firstChild;
}

describe('has correct values', () => {
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