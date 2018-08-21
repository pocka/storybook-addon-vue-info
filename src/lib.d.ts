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
