import
// request,
{ mock }
  from '@/utils/request'

export const api_logout = () => mock.get('/logon/logout')
export const api_login = data => mock.post('/logon/login', data)
export const api_getInfo = params => mock.get('/logon/info', { params })
