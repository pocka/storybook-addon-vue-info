<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div>
    <h1 :class="$style.title">{{title}}</h1>
    <h2 :class="$style.subtitle">{{subtitle}}</h2>
  </div>
</template>

<style module src="./style.css"></style>
