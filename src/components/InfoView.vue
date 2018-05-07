<script>
export default {
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
    <div
      v-if="showHeader"
      class="header"
      :style="userStyle.header ? userStyle.header.body : {}"
    >
      <h1
        class="title"
        :style="userStyle.header ? userStyle.header.h1 : {}"
      >
        {{storyKind}}
      </h1>
      <h2
        class="story-title"
        :style="userStyle.header ? userStyle.header.h2 : {}"
      >
        {{storyTitle}}
      </h2>
    </div>

    <div
      class="component-area"
      :style="userStyle.infoContent"
    >
      <slot></slot>
    </div>
    <p
      v-if="summary"
      class="summary"
    >
      {{summary}}
    </p>

    <template v-if="showSource">
      <h2 :style="userStyle.source ? userStyle.source.h1 : {}">Usage</h2>
      <pre class="code"><code>{{template}}</code></pre>
    </template>

    <h2 :style="userStyle.propTableHead">Props</h2>
    <table class="props">
      <thead class="props-head">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in propsList" :key="prop.name">
          <td>
            {{prop.name}}
            <span v-if="prop.required" class="tag">required</span>
          </td>
          <td>{{prop.type}}</td>
          <td>{{prop.default}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.vue-info {
  padding: 0 1em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #333;
}

h2 {
  margin-top: 2em;
}

.header {
  border-bottom: 1px solid #ccc;
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

.summary {
  color: #777;
}

.summary {
  color: #777;
}

.code {
  overflow: auto;
  padding: 1em;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
}

.component-area {
  margin-top: 2em;
  margin-bottom: 2em;
}

.props {
  border: 1px solid #ccc;
  border-collapse: collapse;
}

.props td,
.props th {
  padding: 0.5em 1em;
  padding-right: 1.5em;
}

.props tr {
  border-bottom: 1px solid #ccc;
}

.props-head {
  color: #888;
  background-color: #eee;
  text-align: left;
}

.tag {
  font-size: 0.7em;
  padding: 0.2em 0.4em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
  color: #333;
}
</style>
