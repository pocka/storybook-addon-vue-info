import constructorToString from './constructorToString'

it('Label of String to equal "string"', () => {
  expect(constructorToString(String)).toBe('string')
})

it('Label of Number to equal "number"', () => {
  expect(constructorToString(Number)).toBe('number')
})

it('Label of Object to equal "object"', () => {
  expect(constructorToString(Object)).toBe('object')
})

it('Label of Boolean to equal "boolean"', () => {
  expect(constructorToString(Boolean)).toBe('boolean')
})

it('Label of Function to equal "function"', () => {
  expect(constructorToString(Function)).toBe('function')
})

it('Label of Symbol to equal "Symbol"', () => {
  expect(constructorToString(Symbol)).toBe('Symbol')
})

it('Label of Function to equal "function"', () => {
  expect(constructorToString(Array)).toBe('array')
})

it('Other value will be "unknown"', () => {
  expect(constructorToString(() => null)).toBe('unknown')

  function MyClass() {}

  expect(constructorToString(MyClass)).toBe('unknown')
})
