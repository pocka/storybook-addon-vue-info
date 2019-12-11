<script>
export default {
  props: {
    tooLongCamelProps: {
      type: String,
      default: 'foo'
    },
    'too-long-kebab-props': {
      type: String,
      default: 'foo'
    }
  }
}
</script>

<template>
  <p>mIxeD-CaSE</p>
</template>
