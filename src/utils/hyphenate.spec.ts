import hyphenate from './hyphenate'

it('Turns PascalCase into kebab-case', () => {
  expect(hyphenate('FooBar')).toBe('foo-bar')

  expect(hyphenate('FOOBAR')).toBe('f-o-o-b-a-r')

  expect(hyphenate('Foobar')).toBe('foobar')
})
