import Vue, { ComponentOptions, PropOptions } from 'vue'

import {
  RuntimeComponent, RuntimeComponents, RuntimeComponentOptions
} from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'
import PropInfo from './types/PropInfo'

import constructorToString from './utils/constructorToString'
import hyphenate from './utils/hyphenate'
import getOutermostTagName from './utils/getOutermostTagName'

import getPropsInfoList from './getPropsInfoList'

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

const lookupMatchedComponent = (tagName: string, components?: RuntimeComponents): ComponentInfo | undefined => {
  if (!components) {
    return undefined
  }

  return Object.keys(components).map(name => {
    return {
      name,
      component: components[name]
    }
  }).find(info => {
    return hyphenate(info.name) === tagName
  })
}

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
  const info = lookupMatchedComponent(outermostTagName, localComponents) ||
    lookupMatchedComponent(outermostTagName, globalComponents)

  if (!info) {
    throw new Error(`No match components registered: ${outermostTagName}`)
  }

  return [info, template]
}
