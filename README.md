# storybook-addon-vue-info

A Storybook addon that shows component's information.

![Screenshot](https://raw.githubusercontent.com/pocka/storybook-addon-vue-info/master/assets/storybook-addon-vue-info--screen-shot.png)

## Install

```sh
npm install --save-dev storybook-addon-vue-info
```

## Usage

Set this addon as a decorator.

```js
import { storiesOf } from '@storybook/vue'

import VueInfoAddon from 'storybook-addon-vue-info'

storiesOf('MyComponent', module)
  .addDecorator(VueInfoAddon)
  .add('foo', () => ({
    components: { MyAwesomeComponent },
    template: '<my-awesome-component/>'
  })
```

## Example

For real example, see `example` directory.
