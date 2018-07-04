import ComponentInfo from './types/ComponentInfo'
import { RuntimeComponentOptions, RuntimeComponents } from './types/VueRuntime'

import * as getTagNames from './utils/getTagNames'
import hyphenate from './utils/hyphenate'

import lookupComponent from './lookupComponent'

/**
 * Returns target comopnent to show information from story component.
 * @param story A story component
 */
function parseStoryComponent(story: RuntimeComponentOptions): ComponentInfo[] {
  // We need template for display "Usage".
  if (!story.template && !story.render) {
    throw new Error(
      '`template` or `render` must be on component options, but got undefined.'
    )
  }

  const tagNames = story.template
    ? getTagNames.fromTemplate(story.template).map(hyphenate)
    : getTagNames.fromJSX(story.render!)

  // If component was not declared in `components` prop,
  // assume it was registered globally.
  const components = tagNames
    .map(tagName =>
      lookupComponent(tagName, story.components as RuntimeComponents)
    )
    .filter((info): info is ComponentInfo => !!info)

  return components
}

export default parseStoryComponent
