<script>
export default {
  props: {
    numbers: {
      type: Array,
      default: () => [1, 2, 3]
    },
    options: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<template>
  <ul>
    <li
      v-for="n in numbers"
      :key="n"
    >
      {{n}}
    </li>
  </ul>
</template>
