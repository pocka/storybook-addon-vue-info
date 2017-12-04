const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
