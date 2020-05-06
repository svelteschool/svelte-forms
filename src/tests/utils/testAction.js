export function testAction(node, options = "blue") {
  node.parentNode.style.setProperty('background', options)
}