import
// request,
{ mock } from '@/utils/request'

const map = {
  api_getDept: '/admin/dept/tree',
  api_updateDept: '/admin/dept/update'
}

export const api_getDept = params => mock.get(map.api_getDept, { params })
export const api_updateDept = data => mock.post(map.api_updateDept, data)

export default map
