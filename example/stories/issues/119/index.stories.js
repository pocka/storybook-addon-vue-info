import { storiesOf } from '@storybook/vue'

import { JsButton as Issue119 } from './component.js?component'

storiesOf('Issues/#119', module).add(
  'Parse non-SFC component with docgen',
  () => ({
    components: { Issue119 },
    template: '<issue-119/>'
  }),
  {
    info: {
      summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/119>'
    }
  }
)
