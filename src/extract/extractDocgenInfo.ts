import { ComponentInfo } from '../types/info'
import { AnyComponent } from '../types/vue'

export function extractDocgenInfo(
  component: AnyComponent
): Partial<ComponentInfo> {
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

  return { props }
}
