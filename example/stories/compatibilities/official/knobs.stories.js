import { storiesOf } from '@storybook/vue'

import { withKnobs, text } from '@storybook/addon-knobs'

import MyButton from './components/MyButton.vue'

/**
 * Vue.js + addon-knobs has no-updating issue now.
 * Stories here written with a workaround described in the issue.
 * https://github.com/storybooks/storybook/issues/5129
 */

storiesOf('Compatibilities/@storybook/addon-knobs', module)
  .addDecorator(withKnobs)
  .add(
    'panel',
    () => ({
      props: {
        label: {
          type: String,
          default: text('Label', 'foo')
        }
      },
      components: { MyButton },
      template: '<my-button>{{label}}</my-button>'
    }),
    {
      info: {}
    }
  )
  .add(
    'inline',
    () => ({
      props: {
        label: {
          type: String,
          default: text('Label', 'foo')
        }
      },
      components: { MyButton },
      template: '<my-button>{{label}}</my-button>'
    }),
    {
      info: { docsInPanel: false }
    }
  )
