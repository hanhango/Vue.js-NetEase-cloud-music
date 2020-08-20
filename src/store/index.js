import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const state = {
  playSong: "", // 当前播放歌曲URL
  playIds: [], // 当前歌曲列表id
  playMusicList: [], // 当前歌曲列表
  playIndex: "", // 当前播放歌曲下标值
  Lyric: [], // 歌词
  userID: {
    id: null,
    time: null
  }, // 用户ID
  miniPlayer: false, // mini播放器歌单显示与隐藏
  player: false, // 播放器主界面显示与隐藏
  miniPlayListShow: false, // 迷你播放列表
  searchShow: false, // 热门搜索显示隐藏
  playerTiem: 0, // 歌曲时播放间
  playing: false, //歌曲暂停和播放
  playerShow: false, // 主播放界面显示隐藏
  playerid: 0, // 单曲播放歌曲的id
  suggest: {
    songs: [],
    playlists: [],
  }, // 搜索建议
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store