<script>
import Tag from './Tag.vue'

export default {
  components: { Tag },
  props: {
    prop: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <tr class="props-table-row">
    <td>
      {{ prop.name }}
      <tag v-if="prop.required">required</tag>
    </td>
    <td>{{ prop.type }}</td>
    <td>{{ prop.default }}</td>
  </tr>
</template>

<style scoped>
.props-table-row {
  border-bottom: 1px solid #ccc;
}

.props-table-row td {
  padding: 0.5em 1em;
  padding-right: 1.5em;
}
</style>
