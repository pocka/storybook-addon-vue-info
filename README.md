<div align="center">
  
  <img src="./assets/logo.png" width="104" alt="logo">
  <br/>

[![Build Status](https://travis-ci.com/pocka/storybook-addon-vue-info.svg?branch=master)](https://travis-ci.com/pocka/storybook-addon-vue-info)
[![npm version](https://badge.fury.io/js/storybook-addon-vue-info.svg)](https://badge.fury.io/js/storybook-addon-vue-info)
[![Monthly download](https://img.shields.io/npm/dm/storybook-addon-vue-info.svg)](https://www.npmjs.com/package/storybook-addon-vue-info)
[![GitHub license](https://img.shields.io/github/license/pocka/storybook-addon-vue-info.svg)](https://github.com/pocka/storybook-addon-vue-info/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

<hr/>

## storybook-addon-vue-info

A Storybook addon that shows Vue component's information.

- [Demo][live examples]

## Requirements

- `@storybook/vue>=4.0.0`

## Getting started

First, install the addon.

```sh
npm install --save-dev storybook-addon-vue-info

# yarn add -D storybook-addon-vue-info
```

Then register in `addons.js`.

```js
// .storybook/addons.js

// Don't forget "/lib/" !!
import 'storybook-addon-vue-info/lib/register'
```

And setup custom webpack loader in order to extract component information with [vue-docgen-api](https://github.com/vue-styleguidist/vue-docgen-api).

```js
// .storybook/webpack.config.js

// This example uses "Full control mode + default".
// If you are using other mode, add payload of `config.module.rules.push` to rules list.
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  })

  return config
}
```

## Usage

Add `withInfo` decorator then set `info` options to the story.

NOTE: `info` option is required for the addon. If you omit it, the addon does nothing.

```js
import { storiesOf } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

storiesOf('MyComponent', module)
  .addDecorator(withInfo)
  .add(
    'foo',
    () => ({
      components: { MyAwesomeComponent },
      template: '<my-awesome-component/>'
    }),
    {
      info: {
        summary: 'Summary for MyComponent'
      }
    }
  )
```

You can set the addon as global decorator.

```js
// config.js
import { addDecorator } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

addDecorator(withInfo)
```

To set default options, use `setDefaults`.

```js
// .storybook/config.js
import { setDefaults } from 'storybook-addon-vue-info'

setDefaults({
  header: false
})
```

For more details, see [live examples].

## Options

| Name               | Data type                             | Default value                                       | Description                                                                        |
| ------------------ | ------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `header`           | `boolean`                             | `true`                                              | Whether to show header or not.                                                     |
| `source`           | `boolean`                             | `true`                                              | Whether to show source(usage) or not.                                              |
| `wrapperComponent` | `Component`                           | [default wrapper](src/components/Wrapper/index.vue) | Override inline docs component.                                                    |
| `previewClassName` | `string`                              | `undefined`                                         | Class name passed down to preview container.                                       |
| `previewStyle`     | Style object                          | `undefined`                                         | Style passed down to preview container.                                            |
| `summary`          | `string`                              | `''`                                                | Summary for the story. Accepts Markdown.                                           |
| `components`       | `{ [name: string]: Component }\|null` | `null`                                              | Display info for these components. Same type as component's `components` property. |
| `docsInPanel`      | `boolean`                             | `true`                                              | Whether to show docs in addon panel.                                               |
| `useDocgen`        | `boolean`                             | `true`                                              | Whether to use result of vue-docgen-api.                                           |

In addition to addon options, we have a component option.

### Set descriptions manually

With vue-docgen-api, the addon automatically shows descriptions and types extracted by docgen ([see example in vue-docgen-api README](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#example)).
However, if you want to explicitly specify desciprion for component props, events or slots, add `description` option for your story component.

Assume `<my-awesome-component>` have props `label` and `visible`.

```js
storiesOf('MyComponent', module)
  .addDecorator(withInfo)
  .add(
    'foo',
    () => ({
      components: { MyAwesomeComponent },
      template: '<my-awesome-component/>',
      description: {
        MyAwesomeComponent: {
          props: {
            // These description will appear in `description` column in props table
            label: 'A label for my awesome component',
            visible: 'Whether component is visible or not'
          },
          events: {
            click: 'Event for user clicking the component'
          },
          slots: {
            default: 'Place text or icon here'
          }
        }
      }
    }),
    {
      info: true
    }
  )
```

For more detail, please take a look at [live example](https://storybook-addon-vue-info.netlify.com/?path=/story/examples-advance-usage--set-descriptions-manually).

### Loader options

You can pass options for vue-docgen-api through loader options (e.g. module alias).

```js
// .storybook/webpack.config.js

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    options: {
      docgenOptions: {
        // options for vue-docgen-api...
      }
    },
    enforce: 'post'
  })

  return config
}
```

## Example

For real example, see `example` directory.

[live examples]: https://storybook-addon-vue-info.netlify.com/?path=/story/examples-basic-usage--simple-example
