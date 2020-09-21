import
// request,
{ mock }
  from '@/utils/request'

export const api_indexList = params => mock.get('/index/list', { params })
