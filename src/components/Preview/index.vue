<script>
import XSectionContainer from '../SectionContainer/index.vue'

export default {
  components: { XSectionContainer }
}
</script>

<template>
  <x-section-container label="Preview">
    <div :class="$style.preview"><slot /></div>
  </x-section-container>
</template>

<style module src="./style.css" />
