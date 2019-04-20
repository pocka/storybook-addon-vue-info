import { storiesOf } from '@storybook/vue'

import Issue86 from './component.vue'

storiesOf('Issues/#86', module).add(
  'Configure docgen-api via loader options',
  () => ({
    components: { Issue86 },
    template: '<issue-86/>'
  }),
  {
    info: '<https://github.com/pocka/storybook-addon-vue-info/issues/86>'
  }
)
