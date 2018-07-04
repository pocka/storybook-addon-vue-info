/**
 * Remove duplicates from given array.
 */
export default <P>(arr: P[]): P[] => {
  return arr.filter((e, i) => arr.indexOf(e) === i)
}
