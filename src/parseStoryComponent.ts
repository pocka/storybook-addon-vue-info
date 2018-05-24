import Vue, { CreateElement, RenderContext, VueConstructor } from 'vue'

import ComponentInfo from './types/ComponentInfo'
import { RuntimeComponentOptions, RuntimeComponents } from './types/VueRuntime'

import getOutermostJSXTagName from './utils/getOutermostJSXTagName'
import getOutermostTagName from './utils/getOutermostTagName'
import hyphenate from './utils/hyphenate'

import lookupComponent from './lookupComponent'

/**
 * Returns target comopnent to show information from story component.
 * @param story A story component
 */
function parseStoryComponent(story: RuntimeComponentOptions): ComponentInfo {
  // We need template for display "Usage".
  if (!story.template && !story.render) {
    throw new Error(
      '`template` or `render` must be on component options, but got undefined.'
    )
  }

  const outermostTagName = story.template
    ? hyphenate(getOutermostTagName(story.template))
    : getOutermostJSXTagName(story.render!)

  // If component was not declared in `components` prop,
  // assume it was registered globally.
  const component = lookupComponent(
    outermostTagName,
    story.components as RuntimeComponents
  )

  if (!component) {
    throw new Error(`No match components registered: ${outermostTagName}`)
  }

  return component
}

export default parseStoryComponent
