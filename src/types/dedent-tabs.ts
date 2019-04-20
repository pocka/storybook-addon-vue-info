declare module 'dedent-tabs'
declare function dedent(literals: string): string
declare function dedent(
  literals: TemplateStringsArray,
  ...placeholders: any[]
): string
