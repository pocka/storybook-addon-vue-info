module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  })

  defaultConfig.module.rules.push({
    test: /\.stories\.js$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  })

  return defaultConfig
}
