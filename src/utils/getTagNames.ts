import removeDuplicates from './removeDuplicates'

/**
 * Returns tags used in template.
 * @param template
 */
export const fromTemplate = (template: string): string[] => {
  const parser = new DOMParser()

  const tree = parser.parseFromString(template, 'application/xml')

  return removeDuplicates(retrieveTagNamesFromDOMNode(tree))
}

const retrieveTagNamesFromDOMNode = (el: Element | Document): string[] => {
  return [
    ...Array.from(el.children).map(e => retrieveTagNamesFromDOMNode(e))
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
  let result: string[] = []

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
