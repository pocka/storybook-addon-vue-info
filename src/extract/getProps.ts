import { PropInfo } from '../types/info'
import { AnyComponent } from '../types/vue'
import { constructorToString } from '../utils/constructorToString'

export function getProps(component: AnyComponent): PropInfo[] {
  // Async component (Promise)
  if (
    component instanceof Promise ||
    ('component' in component && component.component instanceof Promise)
  ) {
    console.warn(
      '[storybook-addon-vue-info] Cannot enumerate props for async component'
    )
    return []
  }

  // Case given Vue instance
  if (!('props' in component)) {
    return []
  }

  const { props } = component

  if (!props) {
    return []
  }

  return Object.keys(props).map(name => {
    const propDef = props[name]

    // If there are no props defined in "prop: Object" sytle,
    // Vue does not convert "prop: Constructor" into "prop: Object" style (See #3).
    if (typeof propDef === 'function') {
      return {
        name,
        type: constructorToString(propDef),
        required: false,
        default: undefined
      }
    }

    let default$

    if (typeof propDef.default === 'function') {
      try {
        default$ = JSON.stringify(propDef.default.apply(component))
      } catch (e) {
        console.error(e)
        console.warn(
          `[storybook-addon-vue-info] Failed to get default value for ${name}`
        )
        default$ = 'Failed to get default value'
      }
    } else {
      default$ = 'default' in propDef ? JSON.stringify(propDef.default) : ''
    }

    return {
      name,
      type: propDef.type ? constructorToString(propDef.type) : 'any',
      required: propDef.required,
      default: default$
    }
  })
}
