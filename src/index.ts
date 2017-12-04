import Vue, { ComponentOptions, PropOptions } from 'vue'

import constructorToString from './utils/constructorToString'

const InfoView = require('./components/InfoView')

interface RawComponent {
  name: string
  options: ComponentOptions<any>
  extendedOptions: ComponentOptions<any>
}

interface RawComponents {
  [name: string]: RawComponent
}

interface ComponentInfo {
  name: string
  component: RawComponent
}

const VueInfoDecorator = (storyFn: () => ComponentOptions<any>) => {
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

const hyphenate = (input: string): string => input.replace(/\B([A-Z])/g, '-$1').toLowerCase()

const getOuterTagName = (template: string): string => template.replace(/<([^\s>]+)[\s\S]+$/, '$1')

const lookupMatchedComponent = (tagName: string, components?: RawComponents): ComponentInfo | undefined => {
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

const parseComponent = (component: ComponentOptions<any>): [ComponentInfo, string] => {
  const template = component.template

  if (!template) {
    throw new Error('`template` must be on component options, but got undefined.')
  }

  const tagName = hyphenate(getOuterTagName(template))

  const components = component.components as { [name: string]: RawComponent }

  const info = lookupMatchedComponent(tagName, component.components as RawComponents) ||
    lookupMatchedComponent(tagName, (Vue as any).options.components)

  if (!info) {
    throw new Error(`No match components registered: ${tagName}`)
  }

  return [info, template]
}
