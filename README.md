# storybook-addon-vue-info

[![npm version](https://badge.fury.io/js/storybook-addon-vue-info.svg)](https://badge.fury.io/js/storybook-addon-vue-info)
[![GitHub license](https://img.shields.io/github/license/pocka/storybook-addon-vue-info.svg)](https://github.com/pocka/storybook-addon-vue-info/blob/master/LICENSE)
![Top Language](https://img.shields.io/github/languages/top/pocka/storybook-addon-vue-info.svg)
[![GitHub last commit](https://img.shields.io/github/last-commit/pocka/storybook-addon-vue-info.svg)](https://github.com/pocka/storybook-addon-vue-info/commits/master)

A Storybook addon that shows component's information.

- [Demo](https://storybook-addon-vue-info.netlify.com/)

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
