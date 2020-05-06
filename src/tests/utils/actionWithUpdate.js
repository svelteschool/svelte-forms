export function actionWithUpdate(node, options = "blue") {
  node.parentNode.style.setProperty('background', options)

  return {
    update(options) {
      node.parentNode.style.setProperty('background', options)
    }
  }
}