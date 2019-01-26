// TODO: Rename me!
export interface Info {
  title: string
  subtitle: string

  summary?: string

  storySource: string

  components: ComponentInfo[]
}

export interface ComponentInfo {
  name: string

  props: CProp[]
}

export interface CProp {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}
