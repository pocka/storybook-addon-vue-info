<script>
import hljs from 'highlight.js'

import SectionTitle from './SectionTitle.vue'

export default {
  components: {
    SectionTitle
  },
  props: {
    userStyle: {
      default: () => ({})
    },
    source: {
      type: String,
      required: true
    }
  },
  methods: {
    highlight() {
      if (!this.$refs.code) {
        return
      }

      hljs.highlightBlock(this.$refs.code, {
        languages: ['html', 'javascript']
      })
    }
  },
  mounted() {
    this.highlight()
  },
  watch: {
    source() {
      this.highlight()
    }
  }
}
</script>

<template>
  <div>
    <section-title :style="userStyle.h1">Story Source</section-title>
    <pre ref="code" class="code html"><code>{{source}}</code></pre>
  </div>
</template>

<style src="../../node_modules/highlight.js/styles/github.css">

</style>

<style scoped>
.code {
  overflow: auto;
  padding: 1em;
  border-radius: 3px;
}
</style>
