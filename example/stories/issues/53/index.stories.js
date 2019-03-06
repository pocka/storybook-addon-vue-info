import { storiesOf } from '@storybook/vue'

import NumberList from '../../../components/NumberList.vue'

storiesOf('Issues/#53', module).add(
  'Should load tables even for PascalCase components',
  () => ({
    components: { NumberList },
    template: '<NumberList :numbers="[1, 2]"/>'
  }),
  {
    info: {
      summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/53>',
      useDocgen: false
    }
  }
)
