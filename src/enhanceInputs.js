import { selectTextOnFocus } from './selectTextOnFocus.js'
let destroyArray = []

export function enhanceInputs(node) {

  const inputs = [].slice.call(node.querySelectorAll('input'))

  inputs.forEach(el => {
    el.oninput = node.onchange
  })

  node.addEventListener('input', handleUpdate)

  function applyStyles(node) {
    Array.from(node.children).forEach(i => {
      if (i.type === 'text') destroyArray.push(selectTextOnFocus(i))
      if (i.type === 'number') i.style.borderColor = "blue";
      if (i.children) {
        applyStyles(i)
      }
    })
  }

  function handleUpdate() {
    node.dispatchEvent(new CustomEvent('update', {
      detail: { ...serialize(node) }
    }));
  }

  function serialize(form) {
    var i = 0, j, key, tmp, out = {};
    var rgx1 = /(radio|checkbox)/i;
    var rgx2 = /(file|reset|submit|button)/i;

    while (tmp = form.elements[i++]) {
      // Ignore unnamed, disabled, or (...rgx2) inputs

      if (!tmp.name || tmp.disabled || rgx2.test(tmp.type)) continue;

      key = tmp.name;

      // Grab all values from multi-select
      if (tmp.type === 'select-multiple') {
        out[key] = [];
        for (j = 0; j < tmp.options.length; j++) {
          if (tmp.options[j].selected) {
            out[key].push(tmp.options[j].value);
          }
        }
      } else if (rgx1.test(tmp.type)) {
        if (tmp.checked) {
          j = out[key];
          tmp = tmp.value === 'on' || tmp.value;
          out[key] = (j == null && j !== 0) ? tmp : [].concat(j, tmp);
        }
      } else if (tmp.value || tmp.value === 0) {
        j = out[key];
        out[key] = (j == null && j !== 0) ? tmp.value : [].concat(j, tmp.value);
      }
    }
    return out;
  }

  applyStyles(node)

  return {
    destroy() {
      destroyArray.forEach(destroy => destroy())
      node.removeEventListener('input', handleUpdate)
    }
  };
}