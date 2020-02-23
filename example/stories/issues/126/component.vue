<script>
export default {
  props: {
    /**
     * Should show the default value
     */
    foo: {
      type: Function,
      default: obj => obj.bar
    }
  }
}
</script>

<template>
  <button>Button</button>
</template>
