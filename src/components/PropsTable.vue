<script>
import PropsTableRow from './PropsTableRow.vue'

export default {
  components: { PropsTableRow },
  props: {
    componentName: {
      type: String,
      default: ''
    },
    propsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <div>
    <h3
      v-if="componentName"
      class="component-name"
    >
      "{{ componentName }}" Component
    </h3>

    <table class="props">
      <thead class="props-head">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
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
.component-name {
  margin-bottom: 0.3em;
}

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
