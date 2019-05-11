import { storiesOf } from '@storybook/vue'

import Issue95 from './component.vue'

storiesOf('Issues/#95', module)
  .add(
    'Should not emit error for no-type props (with docgen)',
    () => ({
      components: { Issue95 },
      template: '<issue-95/>'
    }),
    {
      info: '<https://github.com/pocka/storybook-addon-vue-info/issues/95>'
    }
  )
  .add(
    'Should not emit error for no-type props (runtime)',
    () => ({
      components: { Issue95 },
      template: '<issue-95/>'
    }),
    {
      info: {
        summary:
          '<https://github.com/pocka/storybook-addon-vue-info/issues/95>',
        useDocgen: false
      }
    }
  )
