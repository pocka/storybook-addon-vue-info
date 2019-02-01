<script>
import hljs from 'highlight.js'
import marked from 'marked'

export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    summary() {
      if (!this.info.summary) {
        return ''
      }

      const renderer = new marked.Renderer()

      renderer.code = (code, lang) =>
        `<pre><code class="hljs">${
          hljs.highlightAuto(code, lang ? [lang] : undefined).value
        }</code></pre>`

      marked.setOptions({ renderer })

      return marked(this.info.summary)
    }
  },
  mounted() {
    this.highlight()

    const link = document.createElement('link')

    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/monokai.min.css')
    link.dataset.saviHead = 'true'

    document.head.appendChild(link)
  },
  beforeDestroy() {
    const link = document.head.querySelector('link[data-savi-head]')

    if (link) {
      document.head.removeChild(link)
    }
  },
  methods: {
    highlight() {
      if (!this.$refs.usage) {
        return
      }

      hljs.highlightBlock(this.$refs.usage, {
        languages: [this.info.jsxStory ? 'jsx' : 'html']
      })
    },
    getPropText(p) {
      const pretext = p.type + (p.required ? ', required' : p.default ? `, default to "${p.default}"` : '') + '. '

      if (!pretext && !p.description) {
        return p.name
      }

      // Camelized
      const pretext$ = pretext.slice(0, 1).toUpperCase() + pretext.slice(1)

      return `${p.name} ... ${pretext$}${p.description}`
    }
  }
}
</script>

<template>
  <div class="savi-wrapper">
    <div class="header">
      <h1 class="title">{{ info.title }}</h1>
      <p class="subtitle">{{ info.subtitle }}</p>
    </div>
    <div class="preview-container">
      <div class="preview"><slot /></div>
    </div>
    <div class="info-body">
      <div class="summary" v-html="summary" />
      <div class="usage">
        <h2 class="heading">Usage</h2>
        <pre
          ref="usage"
          class="codeblock"
        ><code>{{ info.storySource }}</code></pre>
      </div>
      <div v-for="c in info.components" :key="c.name" class="component">
        <h2 class="heading">&lt;{{c.name}}&gt; component</h2>
        <div v-if="c.props.length">
          <h3 class="subheading">Props</h3>
          <ul class="list">
            <li
              v-for="p in c.props"
              :key="p.name"
              class="item"
            >
              {{getPropText(p)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./Wrapper.css" />
