import { storiesOf } from '@storybook/vue'

import Issue71 from './component.vue'

storiesOf('Issues/#71', module).add(
  'Should not emit error when component has no props',
  () => ({
    components: { Issue71 },
    template: '<issue-71/>'
  }),
  {
    info: '<https://github.com/pocka/storybook-addon-vue-info/issues/71>'
  }
)
