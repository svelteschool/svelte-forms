export function useActions(node, actions = []) {
  let cleanUpFunctions = []

  // Apply each action
  actions.forEach(([action, options]) => {

    // Save the destroy method, supply a dummy one if the action doesn't contain one.
    const { destroy = () => { } } = action(node, options) || { destroy: () => { } }
    cleanUpFunctions.push(destroy)
  })

  return {
    destroy() {
      cleanUpFunctions.forEach(destroy => destroy())
    }
  };
}