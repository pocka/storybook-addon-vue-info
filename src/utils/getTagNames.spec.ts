import Vue from 'vue'

import { fromJSX, fromTemplate } from './getTagNames'

describe('#fromTemplate', () => {
  it('Returns ["p"] for <p></p>', () => {
    expect(fromTemplate('<p></p>')).toEqual(['p'])
  })

  it('Returns ["p"] for <p/>', () => {
    expect(fromTemplate('<p/>')).toEqual(['p'])
  })

  it('Returns ["div","span","a"] for <div><span><a></a></span></div>', () => {
    expect(fromTemplate('<div><span><a></a></span></div>')).toEqual([
      'div',
      'span',
      'a'
    ])
  })

  it('Remove duplicate tags', () => {
    expect(fromTemplate('<div><div/><div/></div>')).toEqual(['div'])
  })

  it('Works with multiline template', () => {
    expect(
      fromTemplate(`
      <div>
        <p/>
      </div>
    `)
    ).toEqual(['div', 'p'])
  })

  it('Keeps case of tag names', () => {
    expect(fromTemplate('<FooBar/>')).toEqual(['FooBar'])
  })
})

describe('#fromJSX', () => {
  it('Returns ["p"] for h("p")', () => {
    expect(fromJSX(h => h('p'))).toEqual(['p'])
  })

  it('Returns ["span", "a", "p"] for h("p", [h("span"), h("a")])', () => {
    expect(fromJSX(h => h('p', [h('span'), h('a')]))).toEqual([
      'span',
      'a',
      'p'
    ])
  })

  it('Parse component', () => {
    const Component = Vue.extend({
      render(h) {
        return h('div')
      }
    })

    expect(fromJSX(h => h(Component))).toEqual([])
  })

  it('Parse component', () => {
    const Component = Vue.component('foo', {
      render(h) {
        return h('div')
      }
    })

    expect(fromJSX(h => h(Component))).toEqual(['foo'])
  })
})
