import { serialize, deserialize } from '../../utils/serialize'

export function getValues(node) {
  let initialUpdateDone = 0

  const inputs = [...node.getElementsByTagName('input')]

  inputs.forEach(el => {
    el.oninput = node.onchange
  })

  node.addEventListener('input', handleUpdate)

  function handleUpdate() {
    node.dispatchEvent(new CustomEvent('update', {
      detail: { ...serialize(node) }
    }));
  }

  handleUpdate()

  return {
    update(values) {
      if (initialUpdateDone === 2) {
        deserialize(node, values)
      }
      else {
        initialUpdateDone += 1;
      }
    },
    destroy() {
      node.removeEventListener('input', handleUpdate)
    }
  };
}
