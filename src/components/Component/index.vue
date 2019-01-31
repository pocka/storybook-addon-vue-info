<script>
import XTable from '../Table/index.vue'

export default {
  components: { XTable },
  props: {
    /**
     * type: ComponentInfo
     * See types/Info.ts
     */
    component: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return `# <${this.component.name}/>`
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <h2 :class="$style.title">{{ title }}</h2>
    <x-table v-if="component.props.length" label="Props">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in component.props" :key="prop.name">
          <td>
            {{ prop.name }}
            <sup v-if="prop.required" :class="$style.required">*</sup>
          </td>
          <td>{{ prop.type }}</td>
          <td>{{ prop.default }}</td>
          <td>{{ prop.description }}</td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<style module src="./style.css" />
