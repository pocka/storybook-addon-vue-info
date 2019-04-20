const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    options: {
      docgenOptions: {
        alias: {
          '~': path.resolve(__dirname, '../stories')
        }
      }
    },
    enforce: 'post'
  })

  config.module.rules.push({
    test: /\.stories\.js$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  })

  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '../stories')
  }

  return config
}
