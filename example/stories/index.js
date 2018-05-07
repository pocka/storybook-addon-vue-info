import { storiesOf } from '@storybook/vue'

import VueInfoAddon, { withInfo } from 'storybook-addon-vue-info'

import BaseBlank from '../src/components/BaseBlank.vue'
import BaseButton from '../src/components/BaseButton.vue'

import NumberList from '../src/components/NumberList.vue'

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
  .add('long long template', () => ({
    template:
      '<base-button type="primary" disabled label="Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components."/>'
  }))
  .add('multiline template', () => ({
    template: `
      <base-button label="You can also use multiline template!">
      </base-button>
    `
  }))

storiesOf('Multiple components props', module).add(
  'Shows multiple components props',
  withInfo({
    propTables: [BaseButton, 'local-button', BaseBlank]
  })(() => ({
    components: { LocalButton: BaseButton, BaseBlank },
    template: `
    <div>
      <base-button label="I'm <base-button>"/>
      <base-blank/>
      <local-button label="I'm <local-button>"/>
    </div>
    `
  }))
)

storiesOf('withInfo API', module)
  .add(
    'withInfo/1',
    withInfo({})(() => ({
      template: '<base-button label="You can use withInfo API"/>'
    }))
  )
  .add(
    'set .header=false',
    withInfo({
      header: false
    })(() => ({
      template: '<base-button label="No header info!"/>'
    }))
  )
  .add(
    'set .source=false',
    withInfo({
      source: false
    })(() => ({
      template: '<base-button label="Without source"/>'
    }))
  )
  .add(
    'set .style',
    withInfo({
      styles: {
        info: {
          backgroundColor: '#faa'
        },
        header: {
          h1: {
            fontSize: '1em'
          }
        },
        source: {
          h1: {
            fontStyle: 'italic'
          }
        },
        propTableHead: {
          color: '#f33'
        }
      }
    })(() => ({
      template: '<base-button label="funny styled info"/>'
    }))
  )
  .add(
    'set .summary',
    withInfo({
      summary: 'This summary is set by options.summary !!'
    })(() => ({
      template: '<base-button label="awesome button"/>'
    }))
  )
  .add(
    'pass summary strings to options',
    withInfo('Awesome button!')(() => ({
      template: '<base-button label="My Awesome Button!"/>'
    }))
  )

storiesOf('BaseBlank', module)
  .addDecorator(VueInfoAddon)
  .add('blank', () => ({
    components: { BaseBlank },
    template: '<base-blank/>'
  }))

storiesOf('NumberList', module)
  .addDecorator(VueInfoAddon)
  .add('A prop with `type: Array`', () => ({
    components: { NumberList },
    template: '<number-list :numbers="[3, 4, 5]"/>'
  }))
