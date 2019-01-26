import Vue, { ComponentOptions } from 'vue'

import { StoryDecorator } from '@storybook/vue'

import { defaultOptions, InfoAddonOptions } from './options'

export function withInfo(options: Partial<InfoAddonOptions>): StoryDecorator
export function withInfo(summary: string): StoryDecorator

/**
 * Display story's information.
 *
 * @example
 * storiesOf('stories')
 *   .add('story', withInfo('summary')(() => '<foo/>'))
 */
export function withInfo(options: Partial<InfoAddonOptions> | string): StoryDecorator {
  return (story, ctx = { kind: '', story: '' }) => {
    // Normalize options and set defaults
    const opts = {
      ...defaultOptions,
      ...(typeof options === 'string' ? { summary: options } : options)
    }

    // Get component options inside story
    const storyComponent = story()

    // Extract information to display from "story component"
    const info = extract(storyComponent, opts)

    // Return story component wrapped with docs
    return wrapComponent(storyComponent, info, opts)
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
export const VueInfoAddon: StoryDecorator = (story, ctx) => withInfo({})(story)(ctx)

export default VueInfoAddon
