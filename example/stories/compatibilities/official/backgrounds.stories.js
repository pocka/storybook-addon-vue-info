import { storiesOf } from '@storybook/vue'

import { withBackgrounds } from '@storybook/addon-backgrounds'

import MyButton from './components/MyButton.vue'

storiesOf('Compatibilities/@storybook/addon-backgrounds', module)
  .addDecorator(
    withBackgrounds([
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
      { name: 'normal', value: '#fff', default: true }
    ])
  )
  .add(
    'panel',
    () => ({
      components: { MyButton },
      template: '<my-button>FOO</my-button>'
    }),
    {
      info: {}
    }
  )
  .add(
    'inline',
    () => ({
      components: { MyButton },
      template: '<my-button>FOO</my-button>'
    }),
    {
      info: {
        docsInPanel: false
      }
    }
  )
