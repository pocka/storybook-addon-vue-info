import { AsyncComponent, Component } from 'vue'

/**
 * Any component, for convenience.
 */
export type AnyComponent =
  | Component<any, any, any, any>
  | AsyncComponent<any, any, any, any>

/**
 * Type of components property.
 */
export interface ComponentRegistory {
  [name: string]:
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>
}
