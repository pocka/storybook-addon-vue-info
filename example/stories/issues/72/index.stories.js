import { storiesOf } from '@storybook/vue'

import Issue72 from './component.vue'

storiesOf('Issues/#72', module).add(
  'Should not emit error when events has no payloads',
  () => ({
    components: { Issue72 },
    template: '<issue-72/>'
  }),
  {
    info: '<https://github.com/pocka/storybook-addon-vue-info/issues/72>'
  }
)
