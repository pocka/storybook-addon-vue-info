import Vue, { ComponentOptions } from 'vue'

import InfoView from '../components/InfoView.vue'
import { InfoAddonOptions } from '../options'
import { StoryInfo } from '../types/info'

export function wrap(
  component: ComponentOptions<Vue>,
  info: StoryInfo,
  options: InfoAddonOptions
): ComponentOptions<Vue> {
  return {
    render(h) {
      return h(InfoView, {
        props: {
          storyKind: info.title,
          storyTitle: info.subtitle,
          summary: info.summary,
          template: info.storySource,
          lang: info.jsxStory ? 'jsx' : 'html',
          componentDetails: info.components.map(c => ({
            info: {
              name: c.name
            },
            propsList: c.props
          })),
          showHeader: options.header,
          showSource: options.source,
          userStyle: options.styles
        },
        scopedSlots: {
          default: () => [h(component)]
        }
      })
    }
  }
}
