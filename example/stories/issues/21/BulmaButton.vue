<script>
export default {
  mounted() {
    const style = document.createElement('style')

    style.textContent = `
      body {
        color: tomato;
      }
    `

    style.dataset.savi = 'true'

    document.querySelector('head').appendChild(style)
  },
  beforeDestroy() {
    document
      .querySelector('head')
      .removeChild(document.querySelector('style[data-savi]'))
  }
}
</script>

<template>
  <span>BUTTON</span>
</template>
