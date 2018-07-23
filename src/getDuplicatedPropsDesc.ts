export default function getDuplicatedPropsDesc(
  story: any,
  propTablesComponents: any
): string {
  const { propsDescription } = story
  let duplicatedPropName = ''

  if (propsDescription) {
    Object.keys(propsDescription).some(propName => {
      const isDuplicated = propTablesComponents.every(({ component }: any) => {
        return component.props.hasOwnProperty(propName)
      })

      if (isDuplicated) {
        duplicatedPropName = propName
      }

      return isDuplicated
    })
  }

  return duplicatedPropName
}
