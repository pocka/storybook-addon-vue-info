import getOutermostJSXTagName from './getOutermostJSXTagName'

it('Should returns outermost tag name', () => {
  expect(getOutermostJSXTagName(h => h('div'))).toBe('div')

  expect(getOutermostJSXTagName(h => h('div', [h('span')]))).toBe('div')
})
