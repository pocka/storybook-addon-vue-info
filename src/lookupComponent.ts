import hyphenate from './utils/hyphenate'

import { RuntimeComponents } from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'

/**
 * Lookup component matched to specified name.
 * @param name A name to lookup (must be hyphenate)
 * @param components Components to be searched
 */
function lookupComponent(name: string, components?: RuntimeComponents): ComponentInfo | null {
  if (!components) {
    return null
  }

  for (let componentName in components) {
    if (hyphenate(componentName) === name) {
      const component = components[componentName]

      return {
        name: componentName,
        component: component.options ? component.options : component
      }
    }
  }

  return null
}

export default lookupComponent
