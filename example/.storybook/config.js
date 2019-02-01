import { configure } from '@storybook/vue'

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import BaseButton from '../components/BaseButton.vue'

Vue.component('base-button', BaseButton)

Vue.use(VueI18n)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
