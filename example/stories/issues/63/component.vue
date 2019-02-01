<script>
export default {
  props: {
    /**
     * Returns $t('hello')
     */
    msg: {
      type: String,
      default() {
        return this.$t('hello')
      }
    }
  }
}
</script>

<template>
  <button>{{ msg }}!</button>
</template>
