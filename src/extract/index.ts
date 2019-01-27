import Vue, { ComponentOptions } from 'vue'
import dedent from 'dedent'
import hljs from 'highlight.js'
import marked from 'marked'

import { InfoAddonOptions } from '../options'
import { StoryInfo } from '../types/info'
import { AnyComponent } from '../types/vue'
import { hyphenate } from '../utils/hyphenate'
import { getJSXFromRenderFn } from '../utils/getJSXFromRenderFn'

import { decideTargets } from './decideTargets'
import { getProps } from './getProps'

export function extract(
  story: ComponentOptions<Vue>,
  kindName: string,
  storyName: string,
  options: InfoAddonOptions
): StoryInfo {
  const targets = decideTargets(story, options)

  const propsDescription = formatPropsDescription(story)

  const components = Object.keys(targets).map(name => {
    const component = targets[name]
    const kebabName = hyphenate(name)

    const props = getProps(component).map(prop => {
      if (
        kebabName in propsDescription &&
        prop.name in propsDescription[kebabName]
      ) {
        return {
          ...prop,
          description: propsDescription[kebabName][prop.name]
        }
      }

      return prop
    })

    return { name, props }
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

interface PropsDescription {
  [componentName: string]: {
    [propName: string]: string
  }
}

const formatPropsDescription = (story: any): PropsDescription => {
  if (!story.propsDescription) {
    return {}
  }

  let components: PropsDescription = {}

  for (const component in story.propsDescription) {
    components[hyphenate(component)] = story.propsDescription[component]
  }

  return components
}
