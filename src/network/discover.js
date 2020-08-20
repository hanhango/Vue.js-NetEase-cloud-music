import {
  Service
} from "./axios"
// 轮播图获取
export function getBanner() {
  return Service({
    url: `banner`,
    method: 'get'
  })
}
// 推荐歌单
export function getRecSongsSheet(limit = '10') {
  return Service({
    url: `/personalized?limit=${limit}`
  })
}
// 推荐歌曲
export function getRceSongsList() {
  return Service({
    url: `/personalized/newsong`
  })
}
// 推荐MV
export function getRceMv() {
  return Service({
    url: `personalized/mv`
  })
}