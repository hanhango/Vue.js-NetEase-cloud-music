export default {
  // 当前播放歌曲列表
  playMusicList(state, musicList) {
    state.playMusicList = musicList
  },
  // 当前播放歌曲列表ID
  playIds(state, idList) {
    state.playIds = idList
  },
  // 当前播放歌曲下标值 playIndex 赋值
  playIndex(state, index) {
    state.playIndex = index
  },
  // 当前播放歌曲下标值 playIndex +1
  increasePlayIndex(state) {
    state.playIndex++
  },
  // 当前播放歌曲下标值 playIndex - 1
  reducePlayIndex(state) {
    state.playIndex--
  },
  // 当前播放歌曲 playSong 赋值
  playSong(state, payload) {
    state.playSong = payload
  },
  // 当前播放歌曲歌词
  getLyric(state, payload) {
    state.Lyric = payload
  },
  // 当前播放歌曲ID
  playerid(state, playerid) {
    state.playerid = playerid
  },
  // 播放主界面显示与隐藏
  playerShow(state, playerShow) {
    state.playerShow = playerShow
  },
  // 搜索
  changeSuggest(state, playerShow) {
    state.suggest.songs = playerShow.songs
    state.suggest.playlists = playerShow.playlists
  },
  // ---------用户信息----------
  userID(state, uid) {
    state.userID = uid
  }
}