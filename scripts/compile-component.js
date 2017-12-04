const fs = require('fs')
const path = require('path')

const program = require('commander')
const compiler = require('vueify').compiler

function main(args) {
  program
    .option('-i, --input [path]', 'Vue component file')
    .option('-o, --output [path]', 'Output js path')
    .parse(args)

  if (!program.input || !program.output) {
    console.error('Please specify input and ouptut')
    return
  }

  const input = path.resolve(process.cwd(), program.input)
  const output = path.resolve(process.cwd(), program.output)

  const content = fs.readFileSync(input).toString()

  compiler.compile(content, input, (err, js) => {
    if (err) {
      console.error(err)
      return
    }

    fs.writeFileSync(output, js)
  })
}

main(process.argv)
