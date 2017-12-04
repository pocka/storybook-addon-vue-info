import Vue, { ComponentOptions, PropOptions } from 'vue'

import {
  RuntimeComponent, RuntimeComponents, RuntimeComponentOptions
} from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'

import constructorToString from './utils/constructorToString'
import hyphenate from './utils/hyphenate'
import getOutermostTagName from './utils/getOutermostTagName'

const InfoView = require('./components/InfoView')

const VueInfoDecorator = (storyFn: () => RuntimeComponentOptions) => {
  const story = storyFn()

  const [componentInfo, template] = parseComponent(story)

  const { props } = componentInfo.component.options

  const propsList = Object.keys(props as any).map(name => {
    const prop = (props as any)[name]

    return {
      name,
      type: constructorToString(prop.type),
      required: !!prop.required,
      default: prop.default
    }
  })

  return {
    render(h) {
      return h(InfoView, {
        props: {
          name: componentInfo.name,
          template,
          propsList
        },
        scopedSlots: {
          default: () => [h(story as () => any)]
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
  const template = component.template

  if (!template) {
    throw new Error('`template` must be on component options, but got undefined.')
  }

  const tagName = hyphenate(getOutermostTagName(template))

  const components = component.components as RuntimeComponents

  const info = lookupMatchedComponent(tagName, components) ||
    lookupMatchedComponent(tagName, (Vue as any).options.components as RuntimeComponents)

  if (!info) {
    throw new Error(`No match components registered: ${tagName}`)
  }

  return [info, template]
}
