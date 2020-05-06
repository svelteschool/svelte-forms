export function useActions(node, actions = []) {
  let cleanUpFunctions = []

  actions.forEach(([action, options]) => {
    const { destroy } = action(node, options)
    cleanUpFunctions.push(destroy)
  })

  return {
    destroy() {
      cleanUpFunctions.forEach(destroy => destroy())
    }
  };
}