import Vue, { ComponentOptions } from 'vue'

import addons from '@storybook/addons'

import { Events } from '../addon'
import { InfoAddonOptions } from '../options'
import { StoryInfo } from '../types/info'

export function wrap(
  component: ComponentOptions<Vue>,
  info: StoryInfo,
  options: InfoAddonOptions
): ComponentOptions<Vue> {
  return {
    render(h) {
      return h(
        options.wrapperComponent,
        {
          props: { info, options }
        },
        [h(component)]
      )
    }
  }
}

export function transfer(info: StoryInfo, options: InfoAddonOptions): void {
  const channel = addons.getChannel()

  channel.emit(Events.ShowDocs, { info, options })
}
