import { ComponentInfo } from '../types/info'
import { AnyComponent } from '../types/vue'

type Extracted = Pick<ComponentInfo, Exclude<keyof ComponentInfo, 'name'>>

const normalizeAttrs = (attrs: { [name: string]: any } | any[]): any[] =>
  attrs instanceof Array ? attrs : Object.keys(attrs).map(key => attrs[key])

export function extractDocgenInfo(component: AnyComponent): Extracted {
  const docs = (component as any).__docgenInfo

  const props = docs.props
    ? normalizeAttrs(docs.props).map(prop => {
        return {
          name: prop.name,
          type: prop.type ? prop.type.name : 'any',
          required: !!prop.required,
          default: prop.defaultValue ? prop.defaultValue.value : undefined,
          description: prop.description
        }
      })
    : []

  const events = docs.events
    ? normalizeAttrs(docs.events).map(ev => {
        const type = ev.type ? ev.type.names.join(', ') : ''

        return {
          name: ev.name,
          type,
          description: ev.description
        }
      })
    : []

  const slots = docs.slots
    ? normalizeAttrs(docs.slots).map(slot => {
        return {
          name: slot.name,
          description: slot.description
        }
      })
    : []

  return { props, events, slots }
}
