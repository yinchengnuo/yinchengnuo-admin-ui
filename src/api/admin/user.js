import
// request,
{ mock } from '@/utils/request'

const map = {
  api_getAcc: '/admin/user/all',
  api_delAcc: '/admin/user/del',
  api_addAcc: '/admin/user/add',
  api_updateAcc: '/admin/user/update'
}

export const api_addAcc = data => mock.post(map.api_addAcc, data)
export const api_updateAcc = data => mock.post(map.api_updateAcc, data)
export const api_getAcc = params => mock.get(map.api_getAcc, { params })
export const api_delAcc = params => mock.get(map.api_delAcc, { params })

export default map
