import Vue, { ComponentOptions } from 'vue'

import { StoryDecorator, StoryFunction } from '@storybook/vue'

import { defaultOptions, InfoAddonOptions } from './options'
import { extract } from './extract'
import { wrap } from './view'

type StoryWrapper = (
  story: StoryFunction
) => (ctx: { kind: string; story: string }) => ComponentOptions<Vue>

export function withInfo(options: Partial<InfoAddonOptions>): StoryWrapper
export function withInfo(summary: string): StoryWrapper

/**
 * Display story's information.
 *
 * @example
 * storiesOf('stories')
 *   .add('story', withInfo('summary')(() => '<foo/>'))
 */
export function withInfo(
  options: Partial<InfoAddonOptions> | string
): StoryWrapper {
  return story => ctx => {
    // Normalize options and set defaults
    const opts = {
      ...defaultOptions,
      ...(typeof options === 'string' ? { summary: options } : options)
    }

    // Get component options inside story
    const storyResult = story()
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
export const VueInfoAddon: StoryDecorator = (story, ctx) =>
  withInfo({})(story)(ctx)

export default VueInfoAddon
