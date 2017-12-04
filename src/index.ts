import Vue, { ComponentOptions, PropOptions } from 'vue'

import {
  RuntimeComponents, RuntimeComponentOptions
} from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'

import hyphenate from './utils/hyphenate'
import getOutermostTagName from './utils/getOutermostTagName'

import getPropsInfoList from './getPropsInfoList'
import lookupComponent from './lookupComponent'

// Since addon's component is compiled by vueify,
// tsc cannot resolve module at compile-time.
const InfoView = require('./components/InfoView')

const VueInfoDecorator = (storyFn: () => RuntimeComponentOptions) => {
  const story = storyFn()

  const [componentInfo, template] = parseComponent(story)

  const propsList = getPropsInfoList(componentInfo.component)

  return {
    render(h) {
      return h(InfoView, {
        props: {
          name: componentInfo.name,
          template,
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

const parseComponent = (component: RuntimeComponentOptions): [ComponentInfo, string] => {
  const { template } = component

  // We need template for display "Usage".
  if (!template) {
    throw new Error('`template` must be on component options, but got undefined.')
  }

  const outermostTagName = hyphenate(getOutermostTagName(template))

  // Components registered by `{ components: { Foo }}`
  const localComponents = component.components as RuntimeComponents

  // Components registered by `Vue.component('foo', Foo)`
  const globalComponents = (Vue as any).options.components as RuntimeComponents

  // If component was not declared in `components` prop,
  // assume it was registered globally.
  const info = lookupComponent(outermostTagName, localComponents) ||
    lookupComponent(outermostTagName, globalComponents)

  if (!info) {
    throw new Error(`No match components registered: ${outermostTagName}`)
  }

  return [info, template]
}
