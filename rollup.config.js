import path from 'path'

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import license from 'rollup-plugin-license'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'es'
  },
  plugins: [
    commonjs(),
    license({
      banner: {
        file: path.join(__dirname, 'LICENSE')
      },
      thirdParty: {
        output: path.join(__dirname, 'lib', 'dependencies.txt')
      }
    }),
    typescript({
      typescript: require('typescript')
    }),
    vue(),
    babel({
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }]]
    })
  ],
  external: ['vue', 'dedent', 'marked', 'highlight.js', 'parse5']
}
