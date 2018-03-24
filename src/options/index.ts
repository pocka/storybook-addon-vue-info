import InfoAddonOptions from './InfoAddonOptions'

export { default as InfoAddonOptions } from './InfoAddonOptions'

export const defaultOptions: InfoAddonOptions = {
  header: true,
  inline: true,
  source: true,
  lookupGlobalComponent: true,
  useKebabCase: true,
  propTables: [],
  propTablesExclude: [],
  styles: {},
  components: {},
  TableComponent: null,
  summary: ''
}
