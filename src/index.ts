import Vue from 'vue'

import { makeDecorator } from '@storybook/addons'

import { extract } from './extract'
import { defaultOptions, InfoAddonOptions } from './options'
import { renderToPanel } from './view'

export * from './components'

function findBottomStorybookWraps(w: any) {
  while (
    w &&
    w.options &&
    w.options.components &&
    w.options.components.story &&
    w.options.components.story.options &&
    w.options.components.story.options.STORYBOOK_WRAPS
  ) {
    w = w.options.components.story.options.STORYBOOK_WRAPS
  }
  return w
}

function getComponentOptions(story: any) {
  if (story.fnOptions && story.fnOptions.STORYBOOK_WRAPS) {
    return findBottomStorybookWraps(story.fnOptions.STORYBOOK_WRAPS).options
  }
  return ((story.componentOptions && story.componentOptions.Ctor) || {}).options
}

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
        const componentOptions = getComponentOptions(story)
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
