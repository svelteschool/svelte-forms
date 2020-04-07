export function selectTextOnFocus(node) {

  const handleFocus = event => {
    node && typeof node.select === 'function' && node.select()
  }

  node.addEventListener('focus', handleFocus)

  return {
    destroy() {
      node.removeEventListener('focus', handleFocus)
    }
  }
}