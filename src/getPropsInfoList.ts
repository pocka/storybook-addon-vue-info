import constructorToString from './utils/constructorToString'

import PropInfo from './types/PropInfo'
import { RuntimeComponentOptions } from './types/VueRuntime'

/**
 * Get properties informations from component instance.
 * @param component Runtime component instance
 * @param story
 * @returns {PropInfo[]}
 */
function getPropsInfoList(component: RuntimeComponentOptions, story: any): PropInfo[] {
  const { props } = component

  if (!props) {
    return []
  }

  return Object.keys(props).map(name => {
    const prop = (props as any)[name]
    let desc = ''

    if (story.propsDesc && story.propsDesc[name]) {
      desc = story.propsDesc[name]
    }

    // If there are no props defined in Object sytle,
    // Vue does not convert "prop: Constructor" into Object style (See #3).
    if (typeof prop === 'function') {
      return {
        name,
        type: constructorToString(prop),
        required: false,
        description: desc,
        default: undefined
      }
    }

    return {
      name,
      type: constructorToString(prop.type),
      required: !!prop.required,
      description: desc,
      default:
        typeof prop.default === 'function' ? prop.default() : prop.default
    }
  })
}

export default getPropsInfoList
