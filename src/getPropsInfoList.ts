import constructorToString from './utils/constructorToString'

import { RuntimeComponentOptions } from './types/VueRuntime'
import PropInfo from './types/PropInfo'

/**
 * Get properties informations from component instance.
 * @param component Runtime component instance
 */
function getPropsInfoList(component: RuntimeComponentOptions): PropInfo[] {
  const { props } = component

  if (!props) {
    return []
  }

  return Object.keys(props).map(name => {
    const prop = (props as any)[name]

    // If there are no props defined in Object sytle,
    // Vue does not convert "prop: Constructor" into Object style (See #3).
    if (typeof prop === 'function') {
      return {
        name,
        type: constructorToString(prop),
        required: false,
        default: undefined
      }
    }

    return {
      name,
      type: constructorToString(prop.type),
      required: !!prop.required,
      default: typeof prop.default === 'function' ? prop.default() : prop.default
    }
  })
}

export default getPropsInfoList
