module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = defaultConfig.module.rules.filter(
    r => r.test.toString() !== /\.css$/.toString()
  )

  defaultConfig.module.rules.push({
    test: /\.css$/,
    oneOf: [
      {
        resourceQuery: /module/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  })

  return defaultConfig
}
