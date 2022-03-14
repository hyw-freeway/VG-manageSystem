import request from '@/utils/request'


export function getPostsByWeek(time) {
  return request({
    url: '/article/selectAllReports',
    method: 'get',
    params:{time},
  })
}
export function fetchArticle(uid) {
  return request({
    url: '/article/select/' + uid,
    method: 'get',
    params: { uid }
  })
}
export function getMarkdownArticleByAid(id) {
  return request({
    url: '/article/show/' + id,
    method: 'get',
    params: { id }
  })
}
export function createMarkdownArticle(data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}
export function saveMarkdownArticle(data) {
  return request({
    url: '/article/updateArticle',
    method: 'put',
    data
  })
}
export function uploadImg(data) {
  return request({
    url: '/article/uploading',
    method: 'post',
    data: { data }
    // headers:{'Content-Type':"application/x-www-form-urlencoded"}

  })
}
export function delArticle(id) {
  return request({
    url: '/article/delete',
    method: 'delete',
    params: { id }
  })
}

