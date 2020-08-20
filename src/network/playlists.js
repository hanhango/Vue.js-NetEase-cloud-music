import {
  Service
} from "./axios"
// 歌单分类菜单
export function getCatlist() {
  return Service({
    url: `/playlist/catlist`,
    method: 'get'
  })
}
// 获取歌单
export function getSongList(cat = '全部', offset = '0', limit = '20') {
  return Service({
    url: `/top/playlist/?order=hot&cat=${cat}&limit=${limit}&offset=${offset}`,
    method: 'get'
  })
}
// 精品歌单
export function getHighquality(cat = '全部') {
  return Service({
    url: `top/playlist/highquality?limit=1&cat=${cat}`,
    method: 'get'
  })
}