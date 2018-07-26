export default function getDuplicatedPropsDesc(
  story: any,
  propTablesComponents: any
): string {
  const { propsDescription } = story
  let duplicatedPropName = ''

  if (propsDescription) {
    Object.keys(propsDescription).some(propName => {
      let count = 0

      return propTablesComponents.some(({ component }: any) => {
        if (component.props.hasOwnProperty(propName)) {
          count++
        }

        if (count > 1) {
          duplicatedPropName = propName
          return true
        }
      })
    })
  }

  return duplicatedPropName
}
