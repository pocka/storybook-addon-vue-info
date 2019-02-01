<script>
export default {
  mounted() {
    const link = document.createElement('link')

    link.setAttribute('rel', 'stylesheet')
    link.setAttribute(
      'href',
      'https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,500,700'
    )
    link.dataset.saviHead = 'true'

    document.head.appendChild(link)
  },
  destroyed() {
    const link = document.querySelector('head > [data-savi-head]')

    if (!link) {
      return
    }

    document.head.removeChild(link)
  }
}
</script>

<template>
  <div :class="$style.container"><slot /></div>
</template>

<style module src="./style.css" />
