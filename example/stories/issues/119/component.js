import Vue from 'vue'

const JsButton = Vue.extend({
  props: {
    /**
     * My awesome props!
     */
    awesome: {
      type: String,
      default: 'foo'
    }
  },
  template: '<button>Awesome</button>'
})

export { JsButton }
