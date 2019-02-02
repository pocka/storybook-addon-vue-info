import { storiesOf } from '@storybook/vue'

import { withBackgrounds } from '@storybook/addon-backgrounds'
import { withInfo } from 'storybook-addon-vue-info'

import MyButton from './components/MyButton.vue'

storiesOf(
  'Compatibilities/@storybook/addon-backgrounds',
  module
)
  .addDecorator(
    withBackgrounds([
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
      { name: 'normal', value: '#fff', default: true }
    ])
  )
  .add(
    'panel',
    withInfo({})(() => ({
      components: { MyButton },
      template: '<my-button>FOO</my-button>'
    }))
  )
  .add(
    'inline',
    withInfo({
      docsInPanel: false
    })(() => ({
      components: { MyButton },
      template: '<my-button>FOO</my-button>'
    }))
  )
