const clone = require('clone')
const docgen = require('vue-docgen-api')
const loaderUtils = require('loader-utils')
const qs = require('querystring')

console.warn(
  'storybook-addon-vue-info/loader is deprecated. Please consider using vue-docgen-loader instead.'
)

module.exports = function(content, map) {
  const queries = qs.parse(this.resourceQuery.slice(1))

  // Ensure not to apply to each blocks (<script>, <template>...)
  if ('vue' in queries) {
    this.callback(null, content, map)
    return
  }

  try {
    const options = clone(loaderUtils.getOptions(this)) || {}

    const info = docgen.parse(this.resourcePath, options.docgenOptions)

    const js =
      content +
      '\n' +
      `component.options.__docgenInfo = ${JSON.stringify(info)}\n`

    this.callback(null, js)
  } catch (e) {
    if (e instanceof Error) {
      e.message =
        '[storybook-addon-vue-info/loader] failed to parse SFC with docgen-api: ' +
        e.message
    }
    this.emitWarning(e)
    this.callback(null, content, map)
  }
}
