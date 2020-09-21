const Mock = require('mockjs')
const { param2Obj } = require('./utils')

// PS: 所有接口 MOCK 禁止使用 node API。production 会报错！！！

const mocks = [ // 路由列表集合
  ...require('./apis/index'),
  ...require('./apis/article'),
  ...require('./apis/admin')
]

function mockXHR() { // 线上环境数据模拟
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false
      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }
  for (const mock of mocks) { // 挂在 mock 路由
    Mock.mock(new RegExp(mock.url), mock.type || 'get', function(options) {
      let result = null
      if (mock.response instanceof Function) {
        const { body, type, url } = options
        result = mock.response({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = mock.response
      }
      return Mock.mock(result)
    })
  }
}

module.exports = {
  mocks,
  mockXHR
}
