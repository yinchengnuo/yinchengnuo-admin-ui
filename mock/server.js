const path = require('path')
const chalk = require('chalk') // node终端样式库
const Mock = require('mockjs')
const chokidar = require('chokidar') // 监听文件变化
const bodyParser = require('body-parser') // express 请求体解析中间件

const mockDir = path.join(process.cwd(), 'mock') // 当前 mock 程序所在文件夹

function registerRoutes(app) {
  require('./index.js').mocks.forEach(route => { // 为 devServer 注册路由
    app[route.type || 'get'](new RegExp(`${route.url}`), (req, res) => { // 为 devServer 注册路由
      console.log(chalk.green(`发生请求：[${(route.type || 'get').toUpperCase()}] ${JSON.stringify({ ...req.query, ...req.body })}`))
      res.json(Mock.mock(route.response instanceof Function ? route.response(req, res) : route.response)) // 响应请求
    })
  })
  return {
    mockRoutesLength: require('./index.js').mocks.length, // 返回当前 devServer 注册路由的数量
    mockStartIndex: app._router.stack.length - require('./index.js').mocks.length // 返回当前 devServer 在 registerRoutes 方法注册这批路由在 express 对象路由映射列表的初始下标
  }
}

module.exports = app => { // 导出 devServer before 处理
  app.use(bodyParser.json()) // 添加 express 请求体解析中间件
  app.use(bodyParser.urlencoded({ extended: true })) // 不使用 application/x-www-form-urlencoded 解析

  const mockRoutes = registerRoutes(app) // 为 devServer 注册路由
  let mockStartIndex = mockRoutes.mockStartIndex // 保存当前 devServer 注册路由的数量
  let mockRoutesLength = mockRoutes.mockRoutesLength // 保存当前 devServer 在 registerRoutes 方法注册这批路由在 express 对象路由映射列表的初始下标

  chokidar.watch(mockDir, { // 监听 mock 文件夹里面的文件变动
    ignoreInitial: true, // 文件新建或者删除也会触发监听事件
    ignored: /server/ // 除了 server 文件和 json 文件
  }).on('all', (event, path) => { // 任意改动都会触发事件
    if (event === 'change' || event === 'add') { // 只有在文件变动或者添加时才执行热更新逻辑
      app._router.stack.splice(mockStartIndex, mockRoutesLength) // 移除已经注册的路由
      Object.keys(require.cache).forEach(i => { // 清除路由缓存
        if (i.includes(mockDir)) { // 如果已经 require 了 mockDir 下的文件
          delete require.cache[require.resolve(i)] // 清除这些文件，否则改动不生效（和 require 机制有关）
        }
      })
      const mockRoutes = registerRoutes(app) // 重新为 devServer 注册路由
      mockStartIndex = mockRoutes.mockStartIndex // 更新当前 devServer 注册路由的数量
      mockRoutesLength = mockRoutes.mockRoutesLength // 更新当前 devServer 在 registerRoutes 方法注册这批路由在 express 对象路由映射列表的初始下标
      console.log(chalk.magentaBright(`\n > 数据模拟服务器热更新成功！改动文件：${path}`)) // 打印一段红色的文字
    }
  })
}
