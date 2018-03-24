import { Component } from 'vue'

/**
 * We accepts Component object and Component name (which is registered globaly)
 */
export type VueComponent = Component<any, any, any, any> | string

export type InlineStyle = { [key: string]: string | number }

/**
 * Addon options
 * NOTE: There are no maxProp*** options since we use template strings to render source code.
 */
interface VueInfoAddonOptions {
  /**
   * Toggles display of header with component name and description
   */
  header: boolean

  /**
   * Displays the source of story Component
   */
  source: boolean

  /**
   * Overrides styles of addon.
   */
  styles: {
    info?: InlineStyle
    header?: {
      h1?: InlineStyle
    }
    source?: {
      h1?: InlineStyle
    }
    propTableHead?: InlineStyle
  }

  /**
   * Override the component used to render the props table
   */
  TableComponent: VueComponent | null

  /**
   * Summary for the Story
   */
  summary: string
}

export default VueInfoAddonOptions
