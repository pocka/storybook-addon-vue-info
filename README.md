# storybook-addon-vue-info

[![Build Status](https://travis-ci.com/pocka/storybook-addon-vue-info.svg?branch=master)](https://travis-ci.com/pocka/storybook-addon-vue-info)
[![npm version](https://badge.fury.io/js/storybook-addon-vue-info.svg)](https://badge.fury.io/js/storybook-addon-vue-info)
[![Monthly download](https://img.shields.io/npm/dm/storybook-addon-vue-info.svg)](https://www.npmjs.com/package/storybook-addon-vue-info)
[![GitHub license](https://img.shields.io/github/license/pocka/storybook-addon-vue-info.svg)](https://github.com/pocka/storybook-addon-vue-info/blob/master/LICENSE)
![Top Language](https://img.shields.io/github/languages/top/pocka/storybook-addon-vue-info.svg)
[![GitHub last commit](https://img.shields.io/github/last-commit/pocka/storybook-addon-vue-info.svg)](https://github.com/pocka/storybook-addon-vue-info/commits/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


A Storybook addon that shows component's information.

- [Demo](https://storybook-addon-vue-info.netlify.com/)

![Screenshot](https://raw.githubusercontent.com/pocka/storybook-addon-vue-info/master/assets/storybook-addon-vue-info--screen-shot.png)

## Install

```sh
npm install --save-dev storybook-addon-vue-info
```

## Usage

Wrap story with `withInfo` function.

```js
import { storiesOf } from '@storybook/vue'

import { withInfo } from 'storybook-addon-vue-info'

storiesOf('MyComponent', module)
  .add('foo', withInfo({
    summary: 'Summary for MyComponent'
  })(() => ({
    components: { MyAwesomeComponent },
    template: '<my-awesome-component/>'
  })))
```

Or, set this addon as a decorator.

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

You can specify default options with `setDefaults`.

```js
// config.js
import { setDefaults } from 'storybook-addon-vue-info'

setDefaults({
  header: false
})
```

## Options

This addon accepts [@storybook/addon-info](https://github.com/storybooks/storybook/tree/master/addons/info) like options.

| Name                | Data type                     | Default value | Description                                                                                                                                                                                                                 |
| ------------------- | ----------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `header`            | `boolean`                     | `true`        | Whether to show header or not.                                                                                                                                                                                              |
| `source`            | `boolean`                     | `true`        | Whether to show source(usage) or not.                                                                                                                                                                                       |
| `styles`            | `object`                      | `{}`          | Styles override. See [`src/options/InfoAddonOptions.ts`](src/options/InfoAddonOptions.ts) for available fields.                                                                                                             |
| `summary`           | `string`                      | `''`          | Summary for the story. Accepts Markdown.                                                                                                                                                                                    |
| `propTables`        | `(string\|Component)[]\|null` | `null`        | Display prop tables for these components. `string[]` is recommended. If specified `null` or `false`, this addon use outermost tag in `template`. When using `render` method in a story component, this option is required.  |
| `propTablesExclude` | `(string\|Component)[]\|null` | `null`        | Don't display prop tables for these components. `string[]` is recommended.                                                                                                                                                  |

In addition to addon options, we have a component option.

### `propsDescription`

If you want to add desciprion for component props, you can add `propsDescription` option for your story component.

Assume `<my-awesome-component>` have props `label` and `visible`.

```js
storiesOf('MyComponent', module)
  .add('foo', withInfo({})(() => ({
    components: { MyAwesomeComponent },
    template: '<my-awesome-component/>',
    propsDescription: {
      // These description will appear in `description` column in props table
      label: 'A label for my awesome component',
      visible: 'Whether component is visible or not'
    }
  })))
```

**NOTE:** This addon cannot distinguish props that have same name. For example, both `<component-a>` and `<component-b>` have prop named `foo`, and `propsDescription` has `foo: 'bar'`, then description for `foo` of both components will be `bar`.

## Example

For real example, see `example` directory.
