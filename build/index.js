const open = require('open')
const chalk = require('chalk')
const { run } = require('runjs')
const config = require('../vue.config.js')

const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`)

  const port = 9526
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function () {
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
      open(`http://localhost:${port}${publicPath}report.html`)
    } else {
      console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
      open(`http://localhost:${port}${publicPath}`)
    }
  })
} else {
  run(`vue-cli-service build ${args}`)
}
