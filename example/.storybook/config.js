import { configure } from '@storybook/vue'

import Vue from 'vue'

import BaseButton from '../components/BaseButton.vue'

Vue.component('base-button', BaseButton)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
