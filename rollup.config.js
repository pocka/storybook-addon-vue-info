import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'es'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    vue()
  ],
  external: ['vue']
}
