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
   * Displays info inline vs click button to view
   */
  inline: boolean

  /**
   * Displays the source of story Component
   */
  source: boolean

  /**
   * Whether to lookup Components registered globaly (Vue only option)
   */
  lookupGlobalComponent: boolean

  /**
   * Displays component name in kebab-case instead of PascalCase (Vue only option)
   */
  useKebabCase: boolean

  /**
   * Displays Prop Tables with this components
   */
  propTables: VueComponent[]

  /**
   * Exclude Components from being shown in Prop Tables section
   */
  propTablesExclude: VueComponent[]

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
