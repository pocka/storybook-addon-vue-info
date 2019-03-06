<script>
export default {
  props: {
    badA11y: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<template>
  <a role="button" @click="onClick" :class="badA11y && 'bad-a11y'"><slot/></a>
</template>

<style scoped>
.bad-a11y {
  color: #ccc;
}
</style>
