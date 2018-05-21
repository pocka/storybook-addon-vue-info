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
      default:
        return ''
    }
  }, {})

export default getOutermostJSXTagName
