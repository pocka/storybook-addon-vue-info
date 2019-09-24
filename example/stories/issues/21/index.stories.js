import { storiesOf } from '@storybook/vue'

import BulmaButton from './BulmaButton'

storiesOf('Issues/#21', module).add(
  'Do not reset preview style',
  () => ({
    components: { BulmaButton },
    template: '<bulma-button/>'
  }),
  {
    info: {
      docsInPanel: false,
      summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/21>'
    }
  }
)
