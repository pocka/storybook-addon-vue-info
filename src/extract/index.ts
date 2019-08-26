import dedent from 'dedent-tabs'
import hljs from 'highlight.js'
import marked from 'marked'
import Vue, { ComponentOptions } from 'vue'

import { InfoAddonOptions } from '../options'
import { ComponentInfo, StoryInfo } from '../types/info'
import { AnyComponent } from '../types/vue'
import { getJSXFromRenderFn } from '../utils/getJSXFromRenderFn'
import { hyphenate } from '../utils/hyphenate'

import { decideTargets } from './decideTargets'
import { extractDocgenInfo } from './extractDocgenInfo'
import { getProps } from './getProps'

export function extract(
  story: ComponentOptions<Vue>,
  kindName: string,
  storyName: string,
  options: InfoAddonOptions
): StoryInfo {
  const targets = decideTargets(story, options)

  const descriptions =
    getDescriptionsFromStory(story) || formatPropsDescription(story)

  const components = Object.keys(targets).map<ComponentInfo>(name => {
    const component = targets[name]
    const kebabName = hyphenate(name)

    const propDescriptions =
      (descriptions[kebabName] && descriptions[kebabName].props) || {}
    const eventDescriptions =
      (descriptions[kebabName] && descriptions[kebabName].events) || {}
    const slotDescriptions =
      (descriptions[kebabName] && descriptions[kebabName].slots) || {}

    if (options.useDocgen && '__docgenInfo' in component) {
      const partial = extractDocgenInfo(component)

      const hydrateStoryDescription = <
        T extends { name: string; description?: string }
      >(
        defs: T[],
        description: Description
      ): T[] => {
        return defs.map(def => {
          if (def.name in description) {
            return {
              ...def,
              description: description[def.name]
            }
          }

          return def
        })
      }

      return {
        name,
        ...partial,
        props:
          partial.props &&
          hydrateStoryDescription(partial.props, propDescriptions),
        events:
          partial.events &&
          hydrateStoryDescription(partial.events, eventDescriptions),
        slots:
          partial.slots &&
          hydrateStoryDescription(partial.slots, slotDescriptions)
      }
    }

    const props = getProps(component).map(prop => {
      if (prop.name in propDescriptions) {
        return {
          ...prop,
          description: propDescriptions[prop.name]
        }
      }

      return prop
    })

    const events = Object.keys(eventDescriptions).map(eventName => {
      return {
        name: eventName,
        description: eventDescriptions[eventName]
      }
    })

    const slots = Object.keys(slotDescriptions).map(slotName => {
      return {
        name: slotName,
        description: slotDescriptions[slotName]
      }
    })

    return { name, props, events, slots }
  })

  // Set up markdown renderer for summary
  const renderer = new marked.Renderer()

  renderer.code = (code, lang) =>
    `<pre><code class="hljs">${
      hljs.highlightAuto(code, lang ? [lang] : undefined).value
    }</code></pre>`

  marked.setOptions({ renderer })

  return {
    title: kindName,
    subtitle: storyName,
    summary: marked(dedent(options.summary)),
    storySource: dedent(
      story.template || getJSXFromRenderFn(story.render! as any)
    ),
    jsxStory: !!story.render,
    components
  }
}

// Description for props, events and methods.
interface Description {
  [name: string]: string
}

// Description object user
interface Descriptions {
  [componentName: string]: {
    props?: Description
    events?: Description
    slots?: Description
  }
}

const getDescriptionsFromStory = (story: any): Descriptions | null => {
  if (!story.description) {
    return null
  }

  const ret: Descriptions = {}

  for (const component of Object.keys(story.description)) {
    ret[hyphenate(component)] = story.description[component]
  }

  return ret
}

const formatPropsDescription = (story: any): Descriptions => {
  if (!story.propsDescription) {
    return {}
  }

  console.warn(
    '[storybook-addon-vue-info] `propsDescription` is deprecated. Please consider switching to `description.props`'
  )

  const components: Descriptions = {}

  for (const component of Object.keys(story.propsDescription)) {
    components[hyphenate(component)] = {
      props: story.propsDescription[component]
    }
  }

  return components
}
