export interface StoryInfo {
  title: string
  subtitle: string

  summary?: string

  storySource: string
  jsxStory: boolean

  components: ComponentInfo[]
}

export interface ComponentInfo {
  name: string

  props: PropInfo[]
}

export interface PropInfo {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}
