# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2019-09-07

### Fixed

- Ignore story decorators. (Issue: [#50](https://github.com/pocka/storybook-addon-vue-info/issues/50), PR: [#113](https://github.com/pocka/storybook-addon-vue-info/pull/113))

## [1.3.0] - 2019-08-26

### Added

- Add `description` story option, which supports descriptions for props, events and slots.

### Deprecated

- Deprecate `propsDescription` in favor of `description`.

## [1.2.3] - 2019-08-15

### Security

- Bump marked from 0.6.2 to 0.7.0. (Issue: [#110](https://github.com/pocka/storybook-addon-vue-info/issues/110), Vulnerability detail: [npm](https://github.com/pocka/storybook-addon-vue-info/issues/110))

## [1.2.2] - 2019-07-26

### Fixed

- Get default value only if prop is specified as an object. (Issue: [#107](https://github.com/pocka/storybook-addon-vue-info/issues/107), PR: [#108](https://github.com/pocka/storybook-addon-vue-info/pull/108))

## [1.2.1] - 2019-06-06

### Fixed

- Styling problems in props table on narrow screen/addon-panel (PR: [#103](https://github.com/pocka/storybook-addon-vue-info/pull/103))

## [1.2.0] - 2019-05-11

### Added

- `previewClassName` and `previewStyle` option (Issue: [#93](https://github.com/pocka/storybook-addon-vue-info/issues/93), PR: [#98](https://github.com/pocka/storybook-addon-vue-info/pull/98))

## [1.1.2] - 2019-05-11

### Fixed

- Show `any` for prop type when the prop has no `type` field (Issue: [#95](https://github.com/pocka/storybook-addon-vue-info/issues/95), PR: [#97](https://github.com/pocka/storybook-addon-vue-info/pull/97))

## [1.1.1] - 2019-04-20

### Fixed

- Use dedent-tabs, which is a fork of dedent, to support tab dedenting. (Issue: [#79](https://github.com/pocka/storybook-addon-vue-info/issues/79), PR: [#90](https://github.com/pocka/storybook-addon-vue-info/pull/90))

## [1.1.0] - 2019-04-20

### Added

- Allow passing options for vue-docgen-api (PR: [#86](https://github.com/pocka/storybook-addon-vue-info/pull/86)).
- Show error message if vue-docgen-api fails to parse component (PR: [#85](https://github.com/pocka/storybook-addon-vue-info/pull/85)).

### Fixed

- Remove global affecting highlight.js' CSS (PR: [#87](https://github.com/pocka/storybook-addon-vue-info/pull/87)).

## [1.0.1] - 2019-03-21

### Fixed

- Fix re-render issue (only when using `docsInPanel = true`).

## [1.0.0] - 2019-03-06

### Changed

- **BREAKING**: Adapt to the latest decorator API. You need to specify the info parameters for each story (can omit by setting default).
- **BREAKING**: `propTables` option changed to `components`.
- **BREAKING**: `propsDescription` now takes the components' name as a key.
- Massive changes to UI.

### Removed

- **BREAKING**: Support for SB3.
- `propTablesExclude` option.

### Added

- Support for SB4&5.
- `docsInPanel` option to show the info in an addon panel (enabled by default)
- Added a webpack loader parsing Vue components with vue-docgen-api. Thanks to this feature, you can see info for events and slots, and show info exists in mixins or inherited components.

## [0.7.1] - 2019-01-23

### Fixed

- Display class name when prop type is class (PR: [#64](https://github.com/pocka/storybook-addon-vue-info/pull/64))
