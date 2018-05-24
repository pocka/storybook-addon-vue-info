<script>
export default {
  props: {
    descriptionHtml: {
      type: String,
      default: '<noscript></noscript>'
    }
  }
}
</script>


<template>
  <p
    class="summary"
    v-html="descriptionHtml"
  />
</template>

<style scoped>
.summary {
  color: #777;
}

.summary >>> code,
.summary >>> pre {
  padding: 0.2em 0.5em;
  background-color: #eee;
  border-radius: 3px;
}

.summary >>> pre {
  padding: 1em;
}

.summary >>> pre > code {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}
</style>
