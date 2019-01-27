import { ComponentRegistory } from './types/vue'

export const defaultOptions: InfoAddonOptions = {
  header: true,
  source: true,
  styles: {},
  summary: '',
  components: null
}

export interface InlineStyle {
  [key: string]: string | number
}

/**
 * Addon options
 */
export interface InfoAddonOptions {
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
