import request from '@/utils/request'





export function editRole(rids,uid) {
  return request({
    url: '/api/admin/user/role',
    method: 'put',
    params:{rids,uid}
  })
}



export function deleteRole(uid) {
  return request({
    url: '/api/admin/user/delete',
    method: 'delete',
    params:{uid}
  })
}
