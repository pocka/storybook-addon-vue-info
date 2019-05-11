<script>
import XSectionContainer from '../SectionContainer/index.vue'

export default {
  props: {
    customClassName: {
      type: String,
      required: false
    },
    customStyle: {
      type: Object,
      required: false
    }
  },
  components: { XSectionContainer }
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
