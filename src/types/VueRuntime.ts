import { ComponentOptions } from 'vue'

import ComponentInfo from './ComponentInfo'

export type RuntimeComponentOptions = ComponentOptions<any>

export interface RuntimeComponent {
  name: string
  options: RuntimeComponentOptions
  extendedOptions: RuntimeComponentOptions
}
export const RuntimeComponent = {
  toInfo(c: RuntimeComponent, name?: string): ComponentInfo {
    return {
      name: name || c.name || (c.options && c.options.name) || '',
      component: c.options || c
    }
  }
}

export interface RuntimeComponents {
  [name: string]: RuntimeComponent
}
