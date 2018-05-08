import getOutermostTagName from './getOutermostTagName'

it('Returns "p" for <p></p>', () => {
  expect(getOutermostTagName('<p></p>')).toBe('p')
})

it('Returns "span" for <span/>', () => {
  expect(getOutermostTagName('<span/>')).toBe('span')
})

it('Returns outermost tag name', () => {
  expect(getOutermostTagName('<div><img/><a>foo</a></div>')).toBe('div')
})

it('Returns passed value when input was invalid', () => {
  expect(getOutermostTagName('foo')).toBe('foo')
})
