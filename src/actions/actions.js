export function useActions(node, actions = []) {
  let cleanUpFunctions = []

  // Apply each action
  actions.forEach(([action, options]) => {

    const { destroy } = action(node, options) || {}; 
    destroy && cleanupFunction.push(destroy);
  })

  return {
    destroy() {
      cleanUpFunctions.forEach(destroy => destroy())
    }
  };
}
