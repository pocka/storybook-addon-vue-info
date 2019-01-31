import Vue, { ComponentOptions } from 'vue'

import { InfoAddonOptions } from '../options'
import { StoryInfo } from '../types/info'

import Wrapper from '../components/Wrapper/index.vue'

export function wrap(
  component: ComponentOptions<Vue>,
  info: StoryInfo,
  options: InfoAddonOptions
): ComponentOptions<Vue> {
  return {
    render(h) {
      return h(
        Wrapper,
        {
          props: { info, options }
        },
        [h(component)]
      )
    }
  }
}
