import {
  Service
} from "./axios"
// 获取歌单
export function getContentOfSongList(id) {
  return Service({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  })
}
// 获取歌单的所有歌曲
export function getSongList(list) {
  return Service({
    url: `/song/detail?ids=${list}`,
    method: 'get'
  })
}
// 获取歌单最新评论信息
export function getHotComment(id, type) {
  return Service({
    url: `/comment/hot?id=${id}&type=${type}&offset=0`,
    method: 'get'
  })
}
// 获取歌单最新评论信息
export function getSongSheetNewComment(id, offset = 0, limit = '20') {
  return Service({
    url: `/comment/playlist?id=${id}&offset=${offset}&limit=${limit}`,
    method: 'get'
  })
}