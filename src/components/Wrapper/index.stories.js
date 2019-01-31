import { storiesOf } from '@storybook/vue'

import dedent from 'dedent'

import XWrapper from './index.vue'

storiesOf('Components/Wrapper', module)
  .add('Preview', () => ({
    components: {
      XWrapper
    },
    computed: {
      summary() {
        return dedent(`
        # Title1
        ## Title2
        ### Title3
        #### Title4
        ##### Title5
        ###### Title6

        Paragraph.

        Paragraph,<br/>paragrah, [link](#).

        \`\`\`js
        export default function foo() {
          console.log('Hello, World!')
        }
        \`\`\`
        `)
      },
      storySource() {
        return '<x-button disabled :type="type">Button</x-button>'
      },
      components() {
        return [
          {
            name: 'x-button',
            props: [
              {
                name: 'disabled',
                type: 'boolean',
                required: false,
                description: 'Whether to disable'
              },
              {
                name: 'type',
                type: 'string',
                required: false,
                default: 'normal',
                description: 'Button type'
              },
              {
                name: 'label',
                type: 'string',
                required: true
              }
            ]
          }
        ]
      },
      info() {
        return {
          title: 'Title',
          subtitle: 'Subtitle',
          summary: this.summary,
          storySource: this.storySource,
          jsxStory: false,
          components: this.components
        }
      },
      options() {
        return {
          header: true,
          source: true
        }
      }
    },
    template: '<x-wrapper :info="info" :options="options"><button>FOO</button></x-wrapper>'
  }))
