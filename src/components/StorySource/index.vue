<script>
import hljs from 'highlight.js'

import XSectionContainer from '../SectionContainer/index.vue'

export default {
  components: { XSectionContainer },
  props: {
    source: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'html'
    }
  },
  computed: {
    sourceCode() {
      return this.lang === 'jsx' ? `;${this.source}` : this.source
    }
  },
  watch: {
    source() {
      this.highlight()
    }
  },
  mounted() {
    this.highlight()
  },
  methods: {
    highlight() {
      if (!this.$refs.code) {
        return
      }

      hljs.highlightBlock(this.$refs.code, {
        languages: [this.lang]
      })
    }
  }
}
</script>

<template>
  <x-section-container label="Story source">
    <pre
      ref="code"
      :class="[lang, $style.codeBlock]"
    ><code>{{ sourceCode }}</code></pre>
  </x-section-container>
</template>

<style module src="./style.css" />
