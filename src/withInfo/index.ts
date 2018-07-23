import Vue, { ComponentOptions } from 'vue'

import dedent from 'dedent'
import hljs from 'highlight.js'
import marked from 'marked'

import { StoryDecorator } from '@storybook/vue'

import { defaultOptions, InfoAddonOptions } from '../options'
import ComponentInfo from '../types/ComponentInfo'
import {
  RuntimeComponent,
  RuntimeComponentOptions,
  RuntimeComponents
} from '../types/VueRuntime'

import getPropsInfoList from '../getPropsInfoList'
import parseStoryComponent from '../parseStoryComponent'

import getJSXFromRenderFn from '../utils/getJSXFromRenderFn'

import InfoView from '../components/InfoView.vue'
import lookupComponent from '../lookupComponent'

import getDuplicatedPropsDesc from '../getDuplicatedPropsDesc'

const renderer = new marked.Renderer()

renderer.code = (code, lang) =>
  `<pre><code class="hljs">${
    hljs.highlightAuto(code, lang ? [lang] : undefined).value
  }</code></pre>`

marked.setOptions({ renderer })

export type StoryFactory = () => RuntimeComponentOptions
export type WithInfo = (
  story: StoryFactory
) => (context?: { kind: string; story: string }) => ComponentOptions<Vue>

function withInfo(options: Partial<InfoAddonOptions>): WithInfo
function withInfo(summary: string): WithInfo

/**
 * Displays Component information
 */
function withInfo(options: Partial<InfoAddonOptions> | string): WithInfo {
  return storyFn => (context = { kind: '', story: '' }) => {
    const opts = {
      ...defaultOptions,
      ...(typeof options === 'string' ? { summary: options } : options)
    }

    const story = storyFn()

    if (!story.template && story.render) {
      console.warn(
        'This plugins does not support showing story source when using render method.'
      )
    }

    // Components shown in props tables
    const propTablesComponents = opts.propTables
      ? opts.propTables.map(
          c =>
            typeof c === 'string'
              ? lookupComponent(c, story.components as RuntimeComponents)
              : RuntimeComponent.toInfo(c as RuntimeComponent)
        )
      : [parseStoryComponent(story)]

    propTablesComponents.forEach((c, i) => {
      // Dispay console error if failed to lookup component
      if (!c) {
        console.error(`Failed to lookup component at propTables[${i}].`)

        return
      }

      // Display warning if there were no-runtime-name components
      if (!c.name) {
        console.warn(
          `A component specified in propTables[${i}] has no "runtime name". Please consider using string literal.`
        )
      }
    })

    // Check duplicated props description and log warning.
    const duplicatedPropsDesc = getDuplicatedPropsDesc(
      story,
      propTablesComponents
    )

    if (duplicatedPropsDesc) {
      console.warn(
        `'${duplicatedPropsDesc}' property is used as duplicates. All '${duplicatedPropsDesc}' propsDescription may appear identical in all components.`
      )
    }

    // Component details to be passed to <props-table>
    const componentDetails = propTablesComponents
      .map(
        (c, i) =>
          !c || c.name
            ? c
            : {
                ...c,
                name: `<anonymous>propTables[${i}]`
              }
      )
      .filter(c => c !== null)
      .map(c => ({
        info: c,
        propsList: getPropsInfoList(c!.component, story!)
      }))

    return {
      render(h) {
        return h(InfoView, {
          props: {
            storyKind: context.kind,
            storyTitle: context.story,
            summary: marked(dedent(opts.summary)),
            template: dedent(
              story.template || getJSXFromRenderFn(story.render! as any)
            ),
            lang: story.template ? 'html' : 'jsx',
            componentDetails,
            showHeader: opts.header,
            showSource: opts.source,
            userStyle: opts.styles
          },
          scopedSlots: {
            default: () => [h(story)]
          }
        })
      }
    }
  }
}

export default withInfo
