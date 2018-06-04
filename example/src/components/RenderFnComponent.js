import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: () => 'World'
    }
  },
  computed: {
    message() {
      return `Hello, ${this.name}!`
    }
  },
  render(h) {
    return h('span', [this.message])
  }
})
