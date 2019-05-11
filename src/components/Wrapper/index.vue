<script>
import XComponent from '../Component/index.vue'
import XDocs from '../Docs/index.vue'
import XHeader from '../Header/index.vue'
import XPreview from '../Preview/index.vue'
import XSeparator from '../Separator/index.vue'
import XStorySource from '../StorySource/index.vue'
import XSummary from '../Summary/index.vue'

export default {
  components: {
    XComponent,
    XDocs,
    XHeader,
    XPreview,
    XSeparator,
    XStorySource,
    XSummary
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <x-docs class="storybook-addon-vue-info">
    <x-header
      v-if="options.header"
      :title="info.title"
      :subtitle="info.subtitle"
    />
    <x-preview
      v-if="!options.docsInPanel"
      :custom-class-name="options.previewClassName"
      :custom-style="options.previewStyle"
    >
      <slot />
    </x-preview>
    <x-summary :markdown="info.summary" />
    <x-story-source
      v-if="options.source"
      :source="info.storySource"
      :lang="info.jsxStory ? 'jsx' : 'html'"
    />
    <x-separator />
    <x-component v-for="c in info.components" :key="c.name" :component="c" />
  </x-docs>
</template>

<style lang="less">
.storybook-addon-vue-info {
  @import (less) '../../../node_modules/highlight.js/styles/github.css';
}
</style>
