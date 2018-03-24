import Vue from 'vue'

import { RuntimeComponents, RuntimeComponentOptions, RuntimeComponent } from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'
import { InfoAddonOptions } from './options'

import hyphenate from './utils/hyphenate'
import getOutermostTagName from './utils/getOutermostTagName'

import lookupComponent from './lookupComponent'

/**
 * Returns target comopnent to show information from story component.
 * @param story A story component
 */
function parseStoryComponent(story: RuntimeComponentOptions, opts: InfoAddonOptions): ComponentInfo {
  if (opts.TableComponent) {
    const target = opts.TableComponent as RuntimeComponent

    return {
      name: target.name,
      component: target
    }
  }

  // We need template for display "Usage".
  if (!story.template) {
    throw new Error('`template` must be on component options, but got undefined.')
  }

  const outermostTagName = hyphenate(getOutermostTagName(story.template))

  // Components registered by `{ components: { Foo }}`
  const localComponents = story.components as RuntimeComponents

  // Components registered by `Vue.component('foo', Foo)`
  const globalComponents = (Vue as any).options.components as RuntimeComponents

  // If component was not declared in `components` prop,
  // assume it was registered globally.
  const component = lookupComponent(outermostTagName, localComponents) ||
    lookupComponent(outermostTagName, globalComponents)

  if (!component) {
    throw new Error(`No match components registered: ${outermostTagName}`)
  }

  return component
}

export default parseStoryComponent
