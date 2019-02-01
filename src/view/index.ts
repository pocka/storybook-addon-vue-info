import Vue, { ComponentOptions } from 'vue'

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
