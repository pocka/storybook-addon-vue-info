<script>
import BaseButton from './BaseButton'

export default {
  components: { BaseButton }
}
</script>

<template>
  <div>
    <p>
      <BaseButton label="normal"/>
    </p>
    <p>
      <BaseButton type="primary" label="primary"/>
    </p>
    <p>
      <BaseButton :disabled="true" label="disabled"/>
    </p>
  </div>
</template>
