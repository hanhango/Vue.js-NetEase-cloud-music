import {
  Service
} from "./axios"
// 排行榜
export function getTopList() {
  return Service({
    url: '/toplist',
    method: 'get'
  })
}
// -----------------
// 获取歌单的所有歌曲
export function getLeaderboardSongs(id) {
  return Service({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  })
}

// 获取歌曲详情
export function getAllSongs(list) {
  return Service({
    url: `/song/detail?ids=${list}`,
    method: 'get'
  })
}

// 获取歌单最新评论信息
export function getSongSheetNewComment(id, offset = '20', limit = '20') {
  return Service({
    url: `/comment/playlist?id=${id}&offset=${offset}&limit=${limit}`,
    method: 'get'
  })
}

// 歌单介绍数据
export class SongListData {
  constructor(coverImgUrl, name, playCount, createTime, description, updateTime, subscribedCount, commentCount, shareCount) {
    // 图片
    this.coverImgUrl = coverImgUrl
    // 名字
    this.name = name
    // 播放计数
    this.playCount = playCount
    // 创建时间
    this.createTime = createTime
    // 描述
    this.description = description
    // 更新时间
    this.UpdateTime = updateTime
    // 订阅计数
    this.subscribedCount = subscribedCount
    // 评论数量
    this.commentCount = commentCount
    // 分享次数
    this.shareCount = shareCount
  }
}