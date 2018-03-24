import { Component } from 'vue'

/**
 * We accepts Component object and Component name (which is registered globaly)
 */
export type VueComponent = Component<any, any, any, any> | string

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
   * Displays component name in kebab-case instead of PascalCase (Vue only option)
   */
  useKebabCase: boolean

  /**
   * Overrides styles of addon.
   */
  styles: {} // TODO: Implement!

  /**
   * Overrides components used to display markdown
   */
  components: {} // TODO: Implement!

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
