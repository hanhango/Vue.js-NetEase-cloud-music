import {
  Service
} from "./axios"
// 获取MV信息
export function getMV(id) {
  console.log(`/mv/detail?mvid=${id}`);
  return Service({
    url: `/mv/detail?mvid=${id}`,
    method: 'get'
  })
}
// MV地址
export function getMvUrl(id) {
  return Service({
    url: `/mv/url?id=${id}`,
    method: 'get'
  })
}
// MV评论
export function getMvComment(id, offset = 0, limit = 20) {
  return Service({
    url: `/comment/mv?id=${id}&offset=${offset}&limit=${limit}`,
    method: 'get'
  })
}
// 相似MV
export function getSimiMv(id) {
  return Service({
    url: `/simi/mv?mvid=${id}`,
    method: 'get'
  })
}