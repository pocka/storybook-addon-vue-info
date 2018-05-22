import Vue, {
  RenderContext,
  Component,
  AsyncComponent,
  VNodeData,
  ComponentOptions,
  PropOptions
} from 'vue'

import { RuntimeComponent } from '../types/VueRuntime'

export type RenderFn = (h: CreateJSX) => any

/**
 * Get JSX strings from render function.
 * @param render
 */
const getJSXFromRenderFn = (render: RenderFn): string => {
  return render(createJSX)
}

export default getJSXFromRenderFn

export interface CreateJSX {
  (tag?: Tag, children?: JSXStringChildren): string
  (tag?: Tag, data?: VNodeData, children?: JSXStringChildren): string
}

function createJSX(tag?: Tag, children?: JSXStringChildren): string
function createJSX(
  tag?: Tag,
  data?: VNodeData,
  children?: JSXStringChildren
): string

/**
 * Custom renderer building JSX strings.
 */
function createJSX(
  tag?: Tag,
  childrenOrData?: VNodeData | JSXStringChildren,
  _children?: JSXStringChildren
): string {
  const data = (childrenOrData instanceof Array ? {} : childrenOrData) || {}
  const children =
    (childrenOrData instanceof Array ? childrenOrData : _children) || []

  const tagName = getTagName(tag)

  const props = formatDataObject(data)

  return children.length
    ? `<${tagName}${props ? ' ' + props : ''}>${children.join('')}</${tagName}>`
    : `<${tagName}${props ? ' ' + props : ''}/>`
}

export type JSXStringChildren = string[]
export type Tag =
  | string
  | Component<any, any, any, any>
  | AsyncComponent<any, any, any, any>
  | (() => Component)
  | undefined

/** Tag name for components that have no name on runtime */
const Anonymous = 'Anonymous'

/**
 * Get tag name from 1st argument for h (createJSX).
 * @param tag
 */
const getTagName = (tag: Tag) => {
  if (!tag) {
    return Anonymous
  } else if (typeof tag === 'string') {
    return tag
  } else if (tag.name) {
    const t = tag as RuntimeComponent

    if (!t.options) {
      return t.name || Anonymous
    } else {
      return t.options.name || Anonymous
    }
  } else {
    return Anonymous
  }
}

const formatDataObject = (dataObject: VNodeData): string =>
  [
    ...formatDataObjectItem(dataObject.props),
    ...formatDataObjectItem(dataObject.attrs),
    ...formatDataObjectItem(dataObject.domProps, 'domProps'),
    ...formatDataObjectItem(dataObject.on, 'on'),
    ...formatDataObjectItem(dataObject.nativeOn, 'nativeOn'),
    ...(dataObject.class ? [formatProp('class', dataObject.class)] : []),
    ...(dataObject.style ? [formatProp('style', dataObject.style)] : []),
    ...(dataObject.key ? [formatProp('key', dataObject.key)] : []),
    ...(dataObject.ref ? [formatProp('ref', dataObject.ref)] : []),
    ...(dataObject.slot ? [formatProp('slot', dataObject.slot)] : [])
  ].join(' ')

const formatDataObjectItem = (
  item?: { [key: string]: any },
  prefix: string = ''
) =>
  item
    ? Object.keys(item).map(key =>
        formatProp(
          prefix ? prefix + key[0].toUpperCase() + key.slice(1) : key,
          item[key]
        )
      )
    : []

const formatProp = (k: string, v: any): string =>
  typeof v === 'string'
    ? `${k}="${v}"`
    : typeof v === 'function'
      ? `${k}={${v.toString()}}`
      : `${k}={${JSON.stringify(v)}}`
