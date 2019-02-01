<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <label :class="$style.label">{{ label }}</label>
    <div :class="$style.contents"><slot /></div>
  </div>
</template>

<style module src="./style.css" />
