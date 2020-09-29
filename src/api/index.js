import
// request,
{ mock, uni }
  from '@/utils/request'

export const api_indexList = params => mock.get('/index/list', { params })

export const api_upload = (files, dir) => {
  const data = new FormData()
  files.forEach((file, index) => data.append('file' + (index + 1), file))
  return uni.post('/index/upload', data, {
    params: { dir },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
