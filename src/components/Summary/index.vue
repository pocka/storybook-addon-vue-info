<script>
import hljs from 'highlight.js'
import marked from 'marked'

export default {
  props: {
    markdown: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    }
  },
  computed: {
    markdownHtml() {
      if (!this.markdown) {
        return ''
      }

      const renderer = new marked.Renderer()

      renderer.code = (code, lang) =>
        `<pre><code class="hljs">${
          hljs.highlightAuto(code, lang ? [lang] : undefined).value
        }</code></pre>`

      marked.setOptions({ renderer })

      return marked(this.markdown)
    }
  }
}
</script>

<template>
  <section v-if="html" :class="$style.container" v-html="html" />
  <section v-else :class="$style.container" v-html="markdownHtml" />
</template>

<style module src="./style.css" />
