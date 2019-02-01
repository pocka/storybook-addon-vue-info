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
  events: EventInfo[]
  slots: SlotInfo[]
}

export interface PropInfo {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}

export interface EventInfo {
  name: string
  type?: string
  description?: string
}

export interface SlotInfo {
  name: string
  description?: string
}
