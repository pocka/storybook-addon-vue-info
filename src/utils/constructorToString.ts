type Constructor = () => void

/**
 * Returns type string of constructor.
 * @param constructor Constructor function
 */
const constructorToString = (
  constructor: Constructor | Constructor[]
): string => {
  if (constructor instanceof Array) {
    return constructor.map(constructorToString).join(' | ')
  } else if (constructor === Number) {
    return 'number'
  } else if (constructor === String) {
    return 'string'
  } else if (constructor === Object) {
    return 'object'
  } else if (constructor === Boolean) {
    return 'boolean'
  } else if (constructor === Function) {
    return `function`
  } else if (constructor === Symbol) {
    return 'Symbol'
  } else if (constructor === Array) {
    return 'array'
  } else {
    return constructor.name || 'unknown'
  }
}

export default constructorToString
