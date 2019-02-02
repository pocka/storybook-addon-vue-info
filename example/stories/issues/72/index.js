
import { storiesOf } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

import Issue72 from './component.vue'

storiesOf('Issues/#72', module).add(
  'Should not emit error when events has no payloads',
  withInfo({
    summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/72>'
  })(() => ({
    components: { Issue72 },
    template: '<issue-72/>'
  }))
)
