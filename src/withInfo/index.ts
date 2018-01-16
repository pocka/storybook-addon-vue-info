import Vue, { ComponentOptions } from 'vue'

import InfoAddonOptions from '../types/InfoAddonOptions'
import { RuntimeComponentOptions } from '../types/VueRuntime'

const InfoView = require('./components/InfoView')

const defaultOptions: InfoAddonOptions {}

type StoryFactory = () => RuntimeComponentOptions
type WithInfo = (story: StoryFactory) => ComponentOptions<Vue>

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

  return (storyFn) => {
    const story = storyFn()

    return {
      render(h) {
        return h(InfoView, {
          props: {
            name: '',
            template: story.template,
            propsList: []
          },
          scopedSlots: {
            default: () => [h(story)]
          }
        })
      }
    }
  }
}
