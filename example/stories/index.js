import { storiesOf } from '@storybook/vue'

import VueInfoAddon from 'storybook-addon-vue-info'

import BaseButton from '../src/components/BaseButton'

storiesOf('BaseButton', module)
  .addDecorator(VueInfoAddon)
  .add('global component', () => ({
    template: '<base-button type="primary" label="global"/>'
  }))
  .add('local component', () => ({
    components: {
      LocalButton: BaseButton
    },
    template: '<local-button :disabled="true" label="local"/>'
  }))
