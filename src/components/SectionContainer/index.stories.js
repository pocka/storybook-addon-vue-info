import { storiesOf } from '@storybook/vue'

import XSectionContainer from './index.vue'

storiesOf('Components/SectionContainer', module)
  .add('Preview', () => ({
    components: { XSectionContainer },
    template: `
      <x-section-container label="Label">
        <p>I'm contents!</p>
        <p>I'm contents!</p>
        <p>I'm contents!</p>
        <p>I'm contents!</p>
        <p>I'm contents!</p>
      </x-section-container>
    `
  }))
