import { RuntimeComponents, RuntimeComponentOptions } from './types/VueRuntime'
import ComponentInfo from './types/ComponentInfo'

import hyphenate from './utils/hyphenate'
import getOutermostTagName from './utils/getOutermostTagName'

import lookupComponent from './lookupComponent'

/**
 * Returns target comopnent to show information from story component.
 * @param story A story component
 */
function parseStoryComponent(story: RuntimeComponentOptions): ComponentInfo {
  // We need template for display "Usage".
  if (!story.template) {
    throw new Error(
      '`template` must be on component options, but got undefined.'
    )
  }

  const outermostTagName = hyphenate(getOutermostTagName(story.template))

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
