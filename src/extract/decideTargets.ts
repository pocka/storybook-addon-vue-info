import { paramCase } from 'change-case'
import Vue, { ComponentOptions } from 'vue'

import { InfoAddonOptions } from '../options'
import { ComponentRegistory } from '../types/vue'
import * as getTagNames from '../utils/getTagNames'

import { lookupGlobalComponent, LookupResult } from './lookup'

export function decideTargets(
  story: ComponentOptions<Vue>,
  options: InfoAddonOptions
): ComponentRegistory {
  // Components user set explicitly
  if (options.components) {
    return normalizeComponents(options.components)
  }

  // Components used in story
  if (story.components) {
    return normalizeComponents(story.components)
  }

  // If components property does not exist in options nor story components,
  // parse template/render and return components used in template/render.

  if (!story.template && !story.render) {
    throw new Error('`template` or `render` must be on component options.')
  }

  const tagNames = story.template
    ? getTagNames.fromTemplate(story.template).map(s => paramCase(s))
    : getTagNames.fromJSX(story.render!)

  const components = tagNames
    .map(tagName => lookupGlobalComponent(tagName))
    .filter((res): res is LookupResult => !!res)

  const ret: ComponentRegistory = {}

  for (const { name, component } of components) {
    ret[name] = component
  }

  return normalizeComponents(ret)
}

const normalizeComponents = (c: ComponentRegistory): ComponentRegistory => {
  const ret: ComponentRegistory = {}

  // There are cases component options only exists under "options" property
  for (const key of Object.keys(c)) {
    ret[key] = (c[key] as any).options || c[key]
  }

  return ret
}
