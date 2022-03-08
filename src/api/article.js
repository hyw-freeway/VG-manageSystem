import request from '@/utils/request'


export function getPostsByWeek(time) {
  return request({
    url: '/api/article/selectAllReports',
    method: 'get',
    params:{time},
  })
}
export function fetchArticle(uid) {
  return request({
    url: '/api/article/select/' + uid,
    method: 'get',
    params: { uid }
  })
}
export function getMarkdownArticleByAid(id) {
  return request({
    url: '/api/article/show/' + id,
    method: 'get',
    params: { id }
  })
}
export function createMarkdownArticle(data) {
  return request({
    url: '/api/article/add',
    method: 'post',
    data
  })
}
export function saveMarkdownArticle(data) {
  return request({
    url: '/api/article/updateArticle',
    method: 'put',
    data
  })
}
export function uploadImg(data) {
  return request({
    url: '/api/article/uploading',
    method: 'post',
    data: { data }
    // headers:{'Content-Type':"application/x-www-form-urlencoded"}

  })
}
export function delArticle(id) {
  return request({
    url: '/api/article/delete',
    method: 'delete',
    params: { id }
  })
}

