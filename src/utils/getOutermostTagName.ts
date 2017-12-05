/**
 * Get outermost tag's name.
 * e.g. The outermost tag name of <p><span></span></p> is "p"
 * @param xmlString XML string to get tag name
 * @returns An outermost tag name (not include "<" nor ">")
 */
function getOutermostTagName(xmlString: string): string {
  return xmlString.replace(/<([^\s>\/]+)[\s\S]+$/, '$1')
}

export default getOutermostTagName
