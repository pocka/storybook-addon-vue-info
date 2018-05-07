import Vue, { ComponentOptions, PropOptions } from 'vue'

import { RuntimeComponentOptions } from './types/VueRuntime'

import getPropsInfoList from './getPropsInfoList'
import parseStoryComponent from './parseStoryComponent'
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
const VueInfoAddon = (storyFn: () => RuntimeComponentOptions) =>
  withInfo({})(storyFn)()

export default VueInfoAddon

export function setDefaults(opts: Partial<InfoAddonOptions> | string): void {
  Object.assign(
    defaultOptions,
    typeof opts === 'string' ? { summary: opts } : opts
  )
}
