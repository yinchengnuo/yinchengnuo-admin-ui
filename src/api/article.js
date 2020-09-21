import
// request,
{ mock }
  from '@/utils/request'

export const fetchList = params => mock.get('/article/list', { params })
export const fetchArticle = params => mock.get('/article/detail', { params })
export const fetchPv = params => mock.get('/article/pv', { params })
export const createArticle = data => mock.post('/article/create', data)
export const updateArticle = data => mock.post('/article/update', data)
