import { storiesOf } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

import Issue71 from './component.vue'

storiesOf('Issues/#71', module).add(
  'Should not emit error when component has no props',
  withInfo({
    summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/71>'
  })(() => ({
    components: { Issue71 },
    template: '<issue-71/>'
  }))
)
