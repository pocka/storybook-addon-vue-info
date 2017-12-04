import Vue, { ComponentOptions, PropOptions } from 'vue'

import {
  RuntimeComponentOptions
} from './types/VueRuntime'

import getPropsInfoList from './getPropsInfoList'
import parseStoryComponent from './parseStoryComponent'

// Since addon's component is compiled by vueify,
// tsc cannot resolve module at compile-time.
const InfoView = require('./components/InfoView')

const VueInfoDecorator = (storyFn: () => RuntimeComponentOptions) => {
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
  } as ComponentOptions<Vue>
}

export default VueInfoDecorator
