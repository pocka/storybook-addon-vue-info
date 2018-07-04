import { StoryDecorator } from '@storybook/vue'

import { RuntimeComponentOptions } from './types/VueRuntime'

import { defaultOptions, InfoAddonOptions } from './options'
import withInfo from './withInfo'

export { default as withInfo } from './withInfo'

/**
 * Shows Vue component's information.
 *
 * @example
 * storiesOf('My Vue component')
 *   .addDecorator(VueInfoAddon)
 *   .add('default', () => ({
 *     components: { MyAwesomeComponent },
 *     template: '<my-awesome-component :value="0"/>'
 *   }))
 */
const VueInfoAddon: StoryDecorator = (
  storyFn: () => RuntimeComponentOptions,
  context
) => withInfo({})(storyFn)(context)

export default VueInfoAddon

export function setDefaults(opts: Partial<InfoAddonOptions> | string): void {
  Object.assign(
    defaultOptions,
    typeof opts === 'string' ? { summary: opts } : opts
  )
}
