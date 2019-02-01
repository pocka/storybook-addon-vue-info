import { storiesOf } from '@storybook/vue'

import VueInfoAddon, { withInfo } from 'storybook-addon-vue-info'

import NumberList from '../../../components/NumberList.vue'

storiesOf('Issues/#53', module).add(
  'Should load tables even for PascalCase components',
  withInfo({
    summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/53>',
    useDocgen: false
  })(() => ({
    components: { NumberList },
    template: '<NumberList :numbers="[1, 2]"/>'
  }))
)

