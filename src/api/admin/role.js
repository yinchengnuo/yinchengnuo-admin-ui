import
// request,
{ mock } from '@/utils/request'

const map = {
  api_getRole: '/admin/role/all',
  api_delRole: '/admin/role/del',
  api_addRole: '/admin/role/add',
  api_updateRole: '/admin/role/update'
}

export const api_addRole = data => mock.post(map.api_addRole, data)
export const api_getRole = params => mock.get(map.api_getRole, { params })
export const api_delRole = params => mock.get(map.api_delRole, { params })
export const api_updateRole = data => mock.post(map.api_updateRole, data)

export default map
