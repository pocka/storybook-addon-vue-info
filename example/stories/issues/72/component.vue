<script>
export default {
  methods: {
    onClick() {
      this.$emit('foo')
    }
  }
}
</script>

<template>
  <button click="onClick">button</button>
</template>
