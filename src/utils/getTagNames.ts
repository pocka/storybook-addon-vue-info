import dedent from 'dedent'
import { ASTElement, compile } from 'vue-template-compiler'

import removeDuplicates from './removeDuplicates'

/**
 * Returns tags used in template.
 * @param template
 */
export const fromTemplate = (template: string): string[] => {
  const { ast } = compile(dedent(template))

  if (!ast) {
    return []
  }

  return removeDuplicates(retrieveTagNamesFromAST(ast))
}

const retrieveTagNamesFromAST = (el: ASTElement): string[] => {
  return [
    ...Array.from(el.children || []).map(e => retrieveTagNamesFromAST(e))
  ].reduce((dest, cur) => [...dest, ...cur], [el.tag])
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
