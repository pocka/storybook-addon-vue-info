import dedent from 'dedent'
import parse5 from 'parse5'

import removeDuplicates from './removeDuplicates'

/**
 * Returns tags used in template.
 * @param template
 */
export const fromTemplate = (template: string): string[] => {
  const tree = parse5.parseFragment(dedent(template))

  return removeDuplicates(retrieveTagNamesFromDOMNode(tree as DocumentFragment))
}

const retrieveTagNamesFromDOMNode = (
  el: DocumentFragment | Element | Node
): string[] => {
  return [
    ...Array.from(el.childNodes || []).map(e => retrieveTagNamesFromDOMNode(e))
  ].reduce(
    (dest, cur) => [...dest, ...cur],
    'tagName' in el ? [el.tagName] : []
  )
}

type Render = (
  h: (tag: any, dataObject?: any, children?: any[] | string) => any,
  hack: any
) => any

/**
 * Returns outermost tag name in JSX.
 * @param render
 */
export const fromJSX = (render: Render): string[] => {
  const result: string[] = []

  render((tag, dataObject, _children) => {
    switch (typeof tag) {
      case 'string':
        result.push(tag)
        return
      case 'object':
        if (tag.name) {
          result.push(tag.name)
          return
        }

        return
      case 'function':
        // component created with Vue.component/Vue.extend
        if (tag.options && typeof tag.options.name === 'string') {
          result.push(tag.options.name)
          return
        }

        return
      default:
        console.warn(tag)
        return
    }
  }, {})

  return removeDuplicates(result)
}
