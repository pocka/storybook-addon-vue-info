import { configure } from '@storybook/vue'
import { setDefaults } from 'storybook-addon-vue-info'

import Vue from 'vue'

import BaseButton from '../src/components/BaseButton.vue'

Vue.component('base-button', BaseButton)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)

setDefaults({
  summary: 'This summary is set by setDefaults/1'
})
