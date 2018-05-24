import { Component } from 'vue'

/**
 * We accepts Component object and Component name (which is registered globaly)
 */
export type VueComponent = Component<any, any, any, any> | string

export interface InlineStyle {
  [key: string]: string | number
}

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
    infoContent?: InlineStyle
    header?: {
      h1?: InlineStyle
      h2?: InlineStyle
      body?: InlineStyle
    }
    source?: {
      h1?: InlineStyle
    }
    propTableHead?: InlineStyle
  }

  /**
   * Summary for the Story
   */
  summary: string

  /**
   * Displays Props Tables with these components
   */
  propTables: VueComponent[] | false | null
}

export default VueInfoAddonOptions
