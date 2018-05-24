<script>
export default {
  props: {
    userStyle: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div
    :style="userStyle.body"
    class="info-header"
  >
    <h1
      :style="userStyle.h1"
      class="title"
    >
      {{ title }}
    </h1>
    <h2
      :style="userStyle.h2"
      class="story-title"
    >
      {{ subtitle }}
    </h2>
  </div>
</template>

<style scoped>
.info-header {
  border-bottom: 1.5px solid #eee;
}

.title {
  margin-bottom: 0;
}

.story-title {
  color: #555;
  margin-top: 0.5em;
  font-weight: normal;
  font-size: 1.2em;
}
</style>
