import path from 'path'

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import license from 'rollup-plugin-license'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

const commonConfig = {
  plugins: [
    resolve({
      only: ['parse5']
    }),
    commonjs(),
    license({
      banner: {
        file: path.join(__dirname, 'LICENSE')
      },
      thirdParty: {
        output: path.join(__dirname, 'lib', 'dependencies.txt')
      }
    }),
    postcss({
      modules: true,
      plugins: ['autoprefixer']
    }),
    typescript({
      typescript: require('typescript'),
      clean: true
    }),
    vue(),
    babel({
      exclude: '!node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
      externalHelpers: true
    })
  ],
  external: [
    'vue',
    'dedent',
    'marked',
    'highlight.js',
    'vue-template-compiler',
    'react',
    'vuera',
    '@storybook/addons'
  ]
}

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'es'
    },
    ...commonConfig
  },
  {
    input: './src/register.tsx',
    output: {
      file: './lib/register.js',
      format: 'es'
    },
    ...commonConfig
  }
]
