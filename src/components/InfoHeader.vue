<script>
export default {
  props: {
    userStyle: {
      default: () => ({})
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  }
}
</script>

<template>
  <div
    class="info-header"
    :style="userStyle.body"
  >
    <h1
      class="title"
      :style="userStyle.h1"
    >
      {{title}}
    </h1>
    <h2
      class="story-title"
      :style="userStyle.h2"
    >
      {{subtitle}}
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
