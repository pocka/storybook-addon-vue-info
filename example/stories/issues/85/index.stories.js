import { storiesOf } from '@storybook/vue'

import Issue85 from './component.vue'

storiesOf('Issues/#85', module).add(
  'Should show an error when docgen-api failed to parse',
  () => ({
    components: { Issue85 },
    template: '<issue-85/>'
  }),
  {
    info: '<https://github.com/pocka/storybook-addon-vue-info/issues/85>'
  }
)
