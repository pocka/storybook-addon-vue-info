<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <label v-if="label" :class="$style.label">{{ label }}</label>
    <div :class="$style.contents">
      <table :class="$style.table">
        <slot />
      </table>
    </div>
  </div>
</template>

<style module src="./style.css" />
