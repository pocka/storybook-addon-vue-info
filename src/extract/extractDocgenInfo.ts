import { ComponentInfo } from '../types/info'
import { AnyComponent } from '../types/vue'

type Extracted = Pick<ComponentInfo, Exclude<keyof ComponentInfo, 'name'>>

export function extractDocgenInfo(component: AnyComponent): Extracted {
  const docs = (component as any).__docgenInfo

  const props = docs.props
    ? Object.keys(docs.props).map(name => {
        const prop = docs.props[name]

        return {
          name,
          type: prop.type.name,
          required: !!prop.required,
          default: prop.defaultValue ? prop.defaultValue.value : undefined,
          description: prop.description
        }
      })
    : []

  const events = Object.keys(docs.events).map(name => {
    const ev = docs.events[name]

    const type = ev.type ? ev.type.names.join(', ') : ''

    return {
      name,
      type,
      description: ev.description
    }
  })

  const slots = Object.keys(docs.slots).map(name => {
    const slot = docs.slots[name]

    return {
      name,
      description: slot.description
    }
  })

  return { props, events, slots }
}
