import { VueConstructor } from 'vue'

/**
 * Returns outermost tag name in JSX.
 * @param render
 */
const getOutermostJSXTagName = (
  render: (
    h: (tag: any, dataObject?: any, children?: any[] | string) => any,
    hack: any
  ) => any
): string =>
  render((tag, dataObject, _children) => {
    switch (typeof tag) {
      case 'string':
        return tag
      case 'object':
        if (tag.name) {
          return tag.name
        }

        return 'Anonymous'
      case 'function':
        // component created with Vue.component/Vue.extend
        if (tag.options && typeof tag.options.name === 'string') {
          return tag.options.name
        }

        return 'Anonymous'
      default:
        console.warn(tag)
        return ''
    }
  }, {})

export default getOutermostJSXTagName
