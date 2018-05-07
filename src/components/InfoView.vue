<script>
import SectionTitle from './SectionTitle.vue'
import InfoDescription from './InfoDescription.vue'
import InfoHeader from './InfoHeader.vue'
import PropsTable from './PropsTable.vue'
import StorySource from './StorySource.vue'

export default {
  components: {
    InfoDescription,
    InfoHeader,
    PropsTable,
    SectionTitle,
    StorySource
  },
  props: {
    storyKind: {
      type: String,
      required: true
    },
    storyTitle: {
      type: String,
      required: true
    },
    summary: {
      type: String
    },
    template: {
      type: String,
      required: true
    },
    propsList: {
      type: Array,
      required: true
    },
    showHeader: {
      type: Boolean,
      required: true
    },
    showSource: {
      type: Boolean,
      required: true
    },
    userStyle: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div
    class="vue-info"
    :style="userStyle.info"
  >
    <info-header
      v-if="showHeader"
      :user-style="userStyle.header"
      :title="storyKind"
      :subtitle="storyTitle"
    />

    <div
      class="info-content"
      :style="userStyle.infoContent"
    >
      <slot></slot>
    </div>

    <info-description v-if="summary">{{summary}}</info-description>

    <story-source
      v-if="showSource"
      :user-style="userStyle.source"
      :source="template"
    />

    <section-title :style="userStyle.propTableHead">Props</section-title>
    <props-table :props-list="propsList"/>
  </div>
</template>

<style scoped>
.vue-info {
  padding: 0 1em;
  color: #333;
}

.info-content {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
