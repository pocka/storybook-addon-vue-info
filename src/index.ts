import Vue from 'vue'

import { makeDecorator } from '@storybook/addons'

import { extract } from './extract'
import { defaultOptions, InfoAddonOptions } from './options'
import { renderToPanel } from './view'

export * from './components'

export const withInfo = makeDecorator({
  name: 'withInfo',
  parameterName: 'info',
  skipIfNoParametersOrOptions: true,
  wrapper(getStory, context, { parameters }) {
    // Normalize options and set defaults
    const options = {
      ...defaultOptions,
      ...(parameters === true
        ? {}
        : typeof parameters === 'string'
        ? { summary: parameters }
        : parameters)
    }

    return Vue.extend({
      render(h) {
        const story = h(getStory(context)) as any

        const { options: componentOptions } = (story.fnOptions &&
          story.fnOptions.STORYBOOK_WRAPS) ||
          (story.componentOptions && story.componentOptions.Ctor) || {
            options: undefined
          }

        const info = extract(
          componentOptions,
          context.kind,
          context.story,
          options
        )

        if (options.docsInPanel) {
          renderToPanel(info, options)
          return story
        }

        return h(options.wrapperComponent, { props: { info, options } }, [
          story
        ])
      }
    })
  }
})

/**
 * Set default options.
 *
 * @param options options to override with
 */
export function setDefaults(options: Partial<InfoAddonOptions> | string): void {
  Object.assign(
    defaultOptions,
    typeof options === 'string' ? { summary: options } : options
  )
}
