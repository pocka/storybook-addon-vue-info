<script>
import XSectionContainer from '../SectionContainer/index.vue'

export default {
  components: { XSectionContainer },
  props: {
    customClassName: {
      type: String,
      required: false,
      default: undefined
    },
    customStyle: {
      type: Object,
      required: false,
      default: undefined
    }
  }
}
</script>

<template>
  <x-section-container label="Preview">
    <div :class="[$style.preview, customClassName]" :style="customStyle">
      <slot />
    </div>
  </x-section-container>
</template>

<style module src="./style.css" />
