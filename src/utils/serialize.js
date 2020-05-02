export function serialize(form) {
  const response = {};

  [...form.elements].forEach(function elements(input, _index) {
    // I know this "switch (true)" isn't beautiful, but it works!!!
    switch (true) {
      case !input.name:
      case input.disabled:
      case /(file|reset|submit|button)/i.test(input.type):
        break;
      case /(select-multiple)/i.test(input.type):
        response[input.name] = [];
        [...input.options].forEach(function options(option, _selectIndex) {
          if (option.selected) {
            response[input.name].push(option.value);
          }
        });
        break;
      case /(radio)/i.test(input.type):
        if (input.checked) {
          response[input.name] = input.value;
        }
        break;
      case /(checkbox)/i.test(input.type):
        if (input.checked) {
          response[input.name] = [...(response[input.name] || []), input.value];
        }
        break;
      default:
        if (input.value) {
          response[input.name] = input.value;
        }
        break;
    }
  });
  return response;
}

export function deserialize(form, values) {
  [...form.elements].forEach(function elements(input, _index) {
    // I know this "switch (true)" isn't beautiful, but it works!!!
    switch (true) {
      case !input.name:
      case input.disabled:
      case /(file|reset|submit|button)/i.test(input.type):
        break;
      case /(select-multiple)/i.test(input.type):
        [...input.options].forEach(function options(option, _selectIndex) {
          option.selected =
            values[input.name] && values[input.name].includes(option.value);
        });
        break;
      case /(radio)/i.test(input.type):
        input.checked =
          values[input.name] && values[input.name] === input.value;
        break;
      case /(checkbox)/i.test(input.type):
        input.checked =
          values[input.name] && values[input.name].includes(input.value);
        break;
      default:
        input.value = values[input.name] || "";
        break;
    }
  });
}
