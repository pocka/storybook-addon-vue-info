import { storiesOf } from '@storybook/vue'

import { checkA11y } from '@storybook/addon-a11y'

import MyButton from './components/MyButton.vue'

/**
 * a11y addon does not show result until we change addon panel tab.
 * I don't know this is our bug or addon-a11y's one...
 */

storiesOf('Compatibilities/@storybook/addon-a11y', module)
  .addDecorator(checkA11y)
  .add(
    'panel',
    () => ({
      components: { MyButton },
      template: '<my-button bad-a11y>FOO</my-button>'
    }),
    {
      info: {}
    }
  )
  .add(
    'inline',
    () => ({
      components: { MyButton },
      template: '<my-button bad-a11y>FOO</my-button>'
    }),
    {
      info: {
        docsInPanel: false
      }
    }
  )
