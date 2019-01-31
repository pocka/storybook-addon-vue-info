import { storiesOf } from '@storybook/vue'

import XTable from './index.vue'

const slotContent = `
  <thead>
    <tr>
      <th>Col1</th>
      <th>Col2</th>
      <th>Col3</th>
      <th>Col4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>item1-1</td>
      <td>item1-2</td>
      <td>item1-3</td>
      <td>item1-4</td>
    </tr>
    <tr>
      <td>item2-1</td>
      <td>item2-2</td>
      <td>item2-3</td>
      <td>item2-4</td>
    </tr>
    <tr>
      <td>item3-1</td>
      <td>item3-2</td>
      <td>item3-3</td>
      <td>item3-4</td>
    </tr>
  </tbody>
`

storiesOf('Components/Table', module)
  .add('Preview', () => ({
    components: { XTable },
    template: `
      <x-table>${slotContent}</x-table>
    `
  }))
  .add('With label', () => ({
    components: { XTable },
    template: `
      <x-table label="Label">${slotContent}</x-table>
    `
  }))
