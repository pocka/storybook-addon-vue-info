import Vue, { ComponentOptions } from 'vue'

import { defaultOptions, InfoAddonOptions } from '../options'
import { RuntimeComponentOptions } from '../types/VueRuntime'

import getPropsInfoList from '../getPropsInfoList'
import parseStoryComponent from '../parseStoryComponent'

const InfoView = require('../components/InfoView')

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
            propsList,
            showHeader: opts.header,
            showSource: opts.source,
            userStyle: opts.styles
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
