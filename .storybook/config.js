import { configure } from '@storybook/vue'

const req = require.context('../src/components', true, /.stories.js$/)

configure(function loadStories() {
  req.keys().forEach(f => req(f))
}, module)
