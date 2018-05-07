<script>
import PropsTableRow from './PropsTableRow.vue'

export default {
  components: { PropsTableRow },
  props: {
    propsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <div>
    <table class="props">
      <thead class="props-head">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <props-table-row
          v-for="prop in propsList"
          :key="prop.name"
          :prop="prop"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.props {
  border: 1px solid #ccc;
  border-collapse: collapse;
}

.props-head {
  color: #888;
  background-color: #eee;
  text-align: left;
}

.props-head th {
  padding: 0.5em 1em;
  padding-right: 1.5em;
}
</style>

