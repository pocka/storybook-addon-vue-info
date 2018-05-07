<script>
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
  }
}
</script>

<template>
  <div>
    <section-title :style="userStyle.h1">Story Source</section-title>
    <pre class="code"><code>{{source}}</code></pre>
  </div>
</template>

<style scoped>
.code {
  overflow: auto;
  padding: 1em;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
}
</style>
