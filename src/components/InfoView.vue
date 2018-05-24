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
    /** Summary "HTML" string */
    summary: {
      type: String,
      default: ''
    },
    template: {
      type: String,
      required: true
    },
    /** Language for highlighting story source */
    lang: {
      type: String,
      required: true
    },
    componentDetails: {
      type: Array,
      default: () => []
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
    :style="userStyle.info"
    class="vue-info"
  >
    <info-header
      v-if="showHeader"
      :user-style="userStyle.header"
      :title="storyKind"
      :subtitle="storyTitle"
    />

    <div
      :style="userStyle.infoContent"
      class="info-content"
    >
      <slot/>
    </div>

    <info-description
      v-if="summary"
      :description-html="summary"
    />

    <story-source
      v-if="showSource"
      :user-style="userStyle.source"
      :source="template"
      :lang="lang"
    />

    <section-title :style="userStyle.propTableHead">Props</section-title>
    <props-table
      v-for="detail in componentDetails"
      :key="detail.info.name"
      :props-list="detail.propsList"
      :component-name="detail.info.name"
    />
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
