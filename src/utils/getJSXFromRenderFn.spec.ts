import Vue, { CreateElement } from 'vue'

import getJSXFromRenderFn, { CreateJSX } from './getJSXFromRenderFn'

it('First argument for createElement will be tag name', () => {
  expect(getJSXFromRenderFn(h => h('div'))).toBe('<div/>')

  const MyButton = Vue.component('my-button', {
    template: '<button>foo</button>'
  })

  expect(getJSXFromRenderFn(h => h(MyButton))).toBe('<my-button/>')
})

it('Anonymous component will be shown as <Anonymous/>', () => {
  const MyLabel = Vue.extend({
    template: '<label/>'
  })

  expect(getJSXFromRenderFn(h => h(MyLabel))).toBe('<Anonymous/>')

  expect(getJSXFromRenderFn(h => h(MyLabel, [h(MyLabel)]))).toBe(
    '<Anonymous><Anonymous/></Anonymous>'
  )
})

it('Renders children', () => {
  const render = (h: CreateJSX) => h('div', [h('span', [h('a')])])

  expect(getJSXFromRenderFn(render)).toBe('<div><span><a/></span></div>')
})

it('Renderes text node', () => {
  expect(getJSXFromRenderFn(h => 'foo')).toBe('foo')

  expect(getJSXFromRenderFn(h => h('p', ['foo']))).toBe('<p>foo</p>')
})

it('Renderes attributes and props', () => {
  const bar = false

  const render = (h: CreateJSX) =>
    h('div', {
      props: {
        foo: 'foo',
        bar
      },
      attrs: {
        label: 'baz'
      },
      on: {
        click: (ev: any) => console.log(ev)
      }
    })

  expect(getJSXFromRenderFn(render)).toBe(
    '<div foo="foo" bar={false} label="baz" onClick={function (ev) {return console.log(ev);}}/>'
  )
})
