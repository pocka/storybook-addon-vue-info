import { storiesOf } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

import Issue59 from '../../components/issues/59/child.vue'

storiesOf('Issues/#59', module).add(
  'Should load extended component properly',
  withInfo({
    summary: '<https://github.com/pocka/storybook-addon-vue-info/issues/59>'
  })(() => ({
    components: { Issue59 },
    template: '<issue-59 foo="FOO"/>'
  }))
)

