/* tslint:disable:ban-types */

declare module 'vue-template-compiler' {
  export interface ASTElement {
    attrs?: any[]
    attrsList: any[]
    attrsMap: { [key: string]: any }
    children: ASTElement[]
    parent?: ASTElement
    plain: boolean
    static: boolean
    tag?: string
  }
  export interface CompileResult {
    ast?: ASTElement
    render: string
    staticRenderFns: string[]
    errors: string[]
  }
  export function compile(template: string): CompileResult
}

declare module 'vuera' {
  import * as React from 'react'
  import { AsyncComponent, Component } from 'vue'

  interface Props {
    component:
      | Component<any, any, any, any>
      | AsyncComponent<any, any, any, any>
    [prop: string]: any
  }

  export const VueWrapper: React.SFC<Props>
}

declare module '@storybook/addons' {
  import { SFC } from 'react'

  export interface Api {
    onStory(callback: Function): () => void
  }

  export interface Channel {
    on(name: string, handler: Function): void
    emit(name: string, payload: any): void

    removeListener(name: string, handler: Function): void
  }

  interface Mod {
    register(name: string, callback: (api: Api) => any): void

    addPanel(
      name: string,
      options: {
        title: string
        render: SFC<{ active: boolean }>
      }
    ): void

    getChannel(): Channel
  }

  const addons: Mod

  export default addons
}
