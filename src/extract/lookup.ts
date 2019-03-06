import Vue from 'vue'

import hyphenate from '../utils/hyphenate'

import { AnyComponent } from '../types/vue'

export interface LookupResult {
  name: string
  component: AnyComponent
}

/**
 * Lookup component matched to specified name which registered at global level.
 * @param name A name to lookup (must be hyphenate)
 */
export function lookupGlobalComponent(name: string): LookupResult | null {
  for (const componentName in (Vue as any).options.components) {
    if (hyphenate(componentName) === name) {
      const target = (Vue as any).options.components[componentName]

      return {
        name,
        component: target
      }
    }
  }

  return null
}
