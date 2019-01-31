declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.css' {
  const modules: {
    [className: string]: string
  }

  export default modules
}
