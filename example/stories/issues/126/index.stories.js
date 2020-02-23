import Issue126 from './component.vue'

export default {
  title: 'Issues/#126'
}

export const showDefaultValue = () => {
  return {
    components: { Issue126 },
    template: '<issue-126/>'
  }
}

showDefaultValue.story = {
  title: 'Show default value without docgen',
  parameters: {
    info: {
      useDocgen: false
    }
  }
}
