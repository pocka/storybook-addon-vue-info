<script>
export default {
  props: {
    disabled: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'normal'
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <button
    class="btn"
    :class="type"
    :disabled="disabled"
  >{{label}}</button>
</template>

<style scoped>
.btn {
  padding: 3px 10px;

  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  color: #333;
}

.btn:active {
  opacity: 0.9;
}

.btn.primary {
  background-color: #33f;
  color: #fff;
}

.btn:disabled {
  background-color: #eee;
  color: #777;
}
</style>
