import Vue from 'vue'

import hyphenate from './utils/hyphenate'

import { RuntimeComponent, RuntimeComponents } from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'

/**
 * Lookup component matched to specified name.
 * @param name A name to lookup (must be hyphenate)
 * @param localComponents Components to be searched
 */
function lookupComponent(
  name: string,
  localComponents?: RuntimeComponents
): ComponentInfo | null {
  return (
    // Components registered by `{ components: { Foo }}`
    lookupComponentFrom(name, localComponents) ||
    // Components registered by `Vue.component('foo', Foo)`
    lookupComponentFrom(name, (Vue as any).options.components)
  )
}

export default lookupComponent

function lookupComponentFrom(
  name: string,
  components?: RuntimeComponents
): ComponentInfo | null {
  if (!components) {
    return null
  }

  for (let componentName in components) {
    if (hyphenate(componentName) === name) {
      const component = components[componentName]

      return RuntimeComponent.toInfo(component, componentName)
    }
  }

  return null
}
