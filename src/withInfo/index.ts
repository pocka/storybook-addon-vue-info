import Vue, { ComponentOptions } from 'vue'

import InfoAddonOptions from '../types/InfoAddonOptions'
import { RuntimeComponentOptions } from '../types/VueRuntime'

import getPropsInfoList from '../getPropsInfoList'
import parseStoryComponent from '../parseStoryComponent'

const InfoView = require('../components/InfoView')

const defaultOptions: InfoAddonOptions = {
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

export type StoryFactory = () => RuntimeComponentOptions
export type WithInfo = (story: StoryFactory) => () => ComponentOptions<Vue>

function withInfo(options: Partial<InfoAddonOptions>): WithInfo
function withInfo(summary: string): WithInfo

/**
 * Displays Component information
 */
function withInfo(options: Partial<InfoAddonOptions> | string): WithInfo {
  const opts = {
    ...defaultOptions,
    ...(typeof options === 'string' ? { summary: options } : options)
  }

  return storyFn => () => {
    const story = storyFn()

    const componentInfo = parseStoryComponent(story)

    const propsList = getPropsInfoList(componentInfo.component)

    return {
      render(h) {
        return h(InfoView, {
          props: {
            name: componentInfo.name,
            template: story.template,
            propsList
          },
          scopedSlots: {
            default: () => [h(story)]
          }
        })
      }
    }
  }
}

export default withInfo
