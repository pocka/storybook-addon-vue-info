/**
 * Convert string to kebab-case
 */
function hyphenate(input: string): string {
  return input.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export default hyphenate
