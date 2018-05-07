import Vue, { ComponentOptions } from 'vue'

import { Story, StoryDecorator } from '@storybook/vue'

import { defaultOptions, InfoAddonOptions } from '../options'
import {
  RuntimeComponentOptions,
  RuntimeComponent,
  RuntimeComponents
} from '../types/VueRuntime'
import ComponentInfo from '../types/ComponentInfo'

import getPropsInfoList from '../getPropsInfoList'
import parseStoryComponent from '../parseStoryComponent'

import InfoView from '../components/InfoView.vue'
import { Runtime } from 'inspector'
import lookupComponent from '../lookupComponent'

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
        propsList: getPropsInfoList(c!.component)
      }))

    return {
      render(h) {
        return h(InfoView, {
          props: {
            storyKind: context.kind,
            storyTitle: context.story,
            summary: opts.summary,
            template: story.template,
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
