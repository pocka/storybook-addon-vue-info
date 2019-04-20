const docgen = require('vue-docgen-api')
const qs = require('querystring')

module.exports = function(content, map) {
  const queries = qs.parse(this.resourceQuery.slice(1))

  // Ensure not to apply to each blocks (<script>, <template>...)
  if ('vue' in queries) {
    this.callback(null, content, map)
    return
  }

  try {
    const info = docgen.parse(this.resourcePath)

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
