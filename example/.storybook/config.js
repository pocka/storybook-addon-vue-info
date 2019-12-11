import { configure, addDecorator } from '@storybook/vue'

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { withInfo } from 'storybook-addon-vue-info'

import BaseButton from '../components/BaseButton.vue'

Vue.component('base-button', BaseButton)

Vue.use(VueI18n)

addDecorator(withInfo)

configure(require.context('../stories', true, /\.stories\.js$/), module)
