import {
  Service
} from "./axios"

// 查看歌曲是否能播放
export function detectMusic(id) {
  console.log(`/check/music?id=${id}`);
  return Service({
    url: `/check/music?id=${id}`,
    method: 'get'
  })
}
// 播放歌曲
export function playMusic(id) {
  return Service({
    url: `/song/url?id=${id}`,
    method: 'get'
  })
}
// 歌词
export function getLyric(id) {
  return Service({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}
// 歌曲评论
export function getMusicComment(id, offset) {
  return Service({
    url: `/comment/music?id=${id}&limit=30&offset${offset}`,
    method: 'get'
  })
}

// 可获包含这首歌的相似歌单
export function getSimiSongSheet(id) {
  return Service({
    url: `/simi/playlist?id=${id}`,
    method: 'get'
  })
}
// 相似歌曲
export function getSimiSongs(id) {
  return Service({
    url: `/simi/song?id=${id}`,
    method: 'get'
  })
}