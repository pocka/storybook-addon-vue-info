import CamelComponent from './camel.vue'
import KebabComponent from './kebab.vue'
import MixedComponent from './mixed.vue'

export default {
  title: 'Issues/#122'
}

export const camelToKebab = () => {
  return {
    components: { CamelComponent },
    template: '<CamelComponent />'
  }
}
camelToKebab.story = {
  title: 'Convert camelCase to kebab-case',
  parameters: {
    info: {
      casing: 'kebab'
    }
  }
}

export const kebabToCamel = () => {
  return {
    components: { KebabComponent },
    template: '<kebab-component />'
  }
}
kebabToCamel.story = {
  title: 'Convert kebab-case to camelCase',
  parameters: {
    info: {
      casing: 'camel'
    }
  }
}

export const mixedToKebab = () => {
  return {
    components: { MixedComponent },
    template: '<mixed-component/>'
  }
}
mixedToKebab.story = {
  title: 'Convert to kebab-case (mixed)',
  parameters: {
    info: {
      casing: 'kebab'
    }
  }
}

export const mixedToCamel = () => {
  return {
    components: { MixedComponent },
    template: '<mixed-component/>'
  }
}
mixedToCamel.story = {
  title: 'Convert to camelCase (mixed)',
  parameters: {
    info: {
      casing: 'camel'
    }
  }
}

export const preserve = () => {
  return {
    components: { MixedComponent },
    template: '<mixed-component/>'
  }
}
preserve.story = {
  title: 'Preserve casing when undefined',
  parameters: {
    info: {}
  }
}
