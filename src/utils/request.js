import axios from 'axios'
import { getToken } from '@/utils/auth'

const mock = axios.create()
const request = axios.create({ baseURL: process.env.VUE_APP_BASE_API })
const uni = axios.create({ baseURL: 'https://dmhc-947ccf.service.tcloudbase.com' })

const errored = error => { // 请求详情拦截错误处理
  console.log(error)
  G.$message.error('请求可能出了点问题')
  return Promise.reject(error)
}

const interceptorsRequest = config => { // 请求拦截器
  if (getToken()) { // 如果有 token
    config.params ? config.params.token = getToken() : config.params = { token: getToken() } // 将 token 放在 params 上（生产环境 Mock.js 无法获取到请求头。故使用 params 传 token）
    config.headers['token'] = getToken() // 将 token 添加到请求头
  }
  return config
}

const interceptorsResponse = async response => { // 响应拦截器
  const res = response.data
  if (res.code !== 200) {
    if (res.code === 401) { // 这里设置 code 401 表示 token 过期
      await G.$alert('由于您长时间没有操作，致使您的提交不能完成，请重新登录系统', '操作失败', { type: 'warning', showClose: false, closeOnClickModal: false, closeOnPressEscape: false })
      G.$store.dispatch('user/resetToken') // 清除 token 退出登录
      location.reload() // 刷新页面
    } else {
      G.$message.error(res.message || '请求可能出了点问题')
    }
    return Promise.reject(new Error(res.message || '请求可能出了点问题'))
  } else {
    return res
  }
}

uni.interceptors.request.use(interceptorsRequest, error => errored(error))
uni.interceptors.response.use(interceptorsResponse, error => errored(error))
mock.interceptors.request.use(interceptorsRequest, error => errored(error))
mock.interceptors.response.use(interceptorsResponse, error => errored(error))
request.interceptors.request.use(interceptorsRequest, error => errored(error))
request.interceptors.response.use(interceptorsResponse, error => errored(error))

export { mock, uni }

export default request
