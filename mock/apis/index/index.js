const Mock = require('mockjs')

module.exports = [
  {
    url: '/index/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          total: 20,
          'items|20': [{
            order_no: '@guid()',
            timestamp: +Mock.Random.date('T'),
            username: '@name()',
            price: '@float(1000, 15000, 0, 2)',
            'status|1': ['success', 'pending']
          }]
        }
      }
    }
  }
]
