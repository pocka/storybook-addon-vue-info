import { storiesOf } from '@storybook/vue'

import Issue59 from './child.vue'

storiesOf('Issues/#59', module).add(
  'Should load extended component properly',
  () => ({
    components: { Issue59 },
    template: '<issue-59 foo="FOO"/>'
  }),
  {
    info: '<https://github.com/pocka/storybook-addon-vue-info/issues/59>'
  }
)
