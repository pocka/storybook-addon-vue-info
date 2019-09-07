import { storiesOf } from '@storybook/vue'

import BaseButton from '../../../components/BaseButton.vue'

storiesOf('Issues/#50', module)
  .addDecorator(() => ({
    template: '<div style="background: red"><story/></div>'
  }))
  .add(
    'Do not show decorators',
    () => ({
      components: { BaseButton },
      template: '<BaseButton label="button" />'
    }),
    {
      info: {
        summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/50>'
      }
    }
  )
