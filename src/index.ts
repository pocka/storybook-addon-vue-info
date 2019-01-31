import Vue, { ComponentOptions } from 'vue'

import { StoryDecorator, StoryFunction } from '@storybook/vue'

import { extract } from './extract'
import { defaultOptions, InfoAddonOptions } from './options'
import { wrap } from './view'

export * from './components'

type StoryWrapper = (
  story: StoryFunction
) => (ctx: { kind: string; story: string }) => ComponentOptions<Vue>

export function withInfo(
  options: Partial<InfoAddonOptions>,
  actualStoryComponent?: ComponentOptions<Vue>
): StoryWrapper
export function withInfo(
  summary: string,
  actualStoryComponent?: ComponentOptions<Vue>
): StoryWrapper

/**
 * Display story's information.
 *
 * @example
 * storiesOf('stories')
 *   .add('story', withInfo('summary')(() => '<foo/>'))
 */
export function withInfo(
  options: Partial<InfoAddonOptions> | string,
  actualStoryComponent?: ComponentOptions<Vue>
): StoryWrapper {
  return story => ctx => {
    // Normalize options and set defaults
    const opts = {
      ...defaultOptions,
      ...(typeof options === 'string' ? { summary: options } : options)
    }

    // Get component options inside story
    const storyResult = actualStoryComponent || story()
    const storyComponent =
      typeof storyResult === 'string' ? { template: storyResult } : storyResult

    // Extract information to display
    const info = extract(storyComponent, ctx.kind, ctx.story, opts)

    // Return story component wrapped with docs
    return wrap(storyComponent, info, opts)
  }
}

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

/**
 * Story decorator.
 *
 * @example
 * storiesOf('stories')
 *   .addDecorator(VueInfoAddon)
 *   .add('story', () => '<foo/>')
 */
export const VueInfoAddon: StoryDecorator = (story, ctx) => {
  console.warn(
    "[storybook-addon-vue-info] DEPRECATE: Using this plugin with .addDecorator API is deprecated due to storybook's internal API changes."
  )

  // Since @storybook/vue@4.2.0-alpha.6, story component is wrapped
  // by storybook and cannot get component options in straight.
  let wrappedComponent

  try {
    const s = new (story() as any)()

    if (s.$options && s.$options.STORYBOOK_WRAPS) {
      wrappedComponent = s.$options.STORYBOOK_WRAPS.options
    }
  } catch (e) {
    // If `new` fails, we get story component directly
  }

  return withInfo({}, wrappedComponent)(story)(ctx)
}

export default VueInfoAddon
