<script>
import { paramCase, camelCase, pascalCase } from 'change-case'
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
    },
    /**
     * Case conversion
     * See components/Wrapper/index.vue
     */
    casing: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return `# <${this.normalizeCase(this.component.name, 'component')}/>`
    }
  },
  methods: {
    normalizeCase(name, attr) {
      switch (this.casing[attr]) {
        case void 0:
          return name
        case 'kebab':
        case 'kebab-case':
          return paramCase(name)
        case 'camel':
        case 'camelCase':
        case 'pascalCase':
        case 'PascalCase':
          return attr === 'component' ? pascalCase(name) : camelCase(name)
      }
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
            {{ normalizeCase(prop.name, 'props') }}
            <sup v-if="prop.required" :class="$style.required">*</sup>
          </td>
          <td>{{ prop.type }}</td>
          <td>{{ prop.default }}</td>
          <td>{{ prop.description }}</td>
        </tr>
      </tbody>
    </x-table>
    <x-table v-if="component.events.length" label="Events">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in component.events" :key="event.name">
          <td>{{ event.name }}</td>
          <td>{{ event.type }}</td>
          <td>{{ event.description }}</td>
        </tr>
      </tbody>
    </x-table>
    <x-table v-if="component.slots.length" label="Slots">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in component.slots" :key="slot.name">
          <td>{{ slot.name }}</td>
          <td>{{ slot.description }}</td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<style module src="./style.css" />
