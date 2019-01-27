import { Component } from 'vue'

import { ComponentRegistory } from '../types/vue'


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
   * Explicitly specify components to display info
   */
  components: ComponentRegistory | false | null
}

export default VueInfoAddonOptions
