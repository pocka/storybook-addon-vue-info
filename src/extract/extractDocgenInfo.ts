import { ComponentInfo } from '../types/info'
import { AnyComponent } from '../types/vue'

type Extracted = Pick<ComponentInfo, Exclude<keyof ComponentInfo, 'name'>>

export function extractDocgenInfo(
  component: AnyComponent
): Extracted {
  const docs = (component as any).__docgenInfo

  const props = Object.keys(docs.props).map(name => {
    const prop = docs.props[name]

    return {
      name,
      type: prop.type.name,
      required: !!prop.required,
      default: prop.defaultValue ? prop.defaultValue.value : undefined,
      description: prop.description
    }
  })

  const events = Object.keys(docs.events).map(name => {
    const ev = docs.events[name]

    return {
      name,
      type: ev.type.names.join(', '),
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
