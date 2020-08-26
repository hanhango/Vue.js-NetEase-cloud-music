import {
  Message
} from 'element-ui'
import {
  detectMusic,
  playMusic
} from "../network/play"
export default {
  // 当前播放歌曲列表
  playMusicList(context, musicList) {
    context.commit('playMusicList', musicList)
  },
  // 当前播放歌曲列表ID
  playIds(context, idList) {
    context.commit('playIds', idList)
  },
  // 当前播放歌曲下标值
  playIndex(context, index) {
    context.commit('playIndex', index)
  },
  // 下一首
  increasePlayIndex(context) {
    if (context.state.playIndex == context.state.playMusicList.length - 1) {
      this.dispatch('playIndex', 0)
      this.dispatch('playMusic')
    } else {
      context.commit('increasePlayIndex')
      this.dispatch('playMusic')
    }
  },
  // 上一首
  reducePlayIndex(context) {
    context.commit('reducePlayIndex')
    this.dispatch('playMusic')
  },

  // ---------获取播放的歌曲内容-----------
  // 检查音乐是否可用
  checkPlayMusic(context) {
    detectMusic(context.state.playMusicList[context.state.playIndex].id)
      .then(res => {
        this.dispatch('playMusic')
      })
      .catch(error => {
        Message({
          message:  '暂无版权，即将为你播放下一首',
          type: 'error',
          duration: 3 * 1000
        })
        this.dispatch('increasePlayIndex')
      })
  },
  // 获取播放歌曲数据
  playMusic(context) {
    playMusic(context.state.playMusicList[context.state.playIndex].id).then(res => {
      console.log(res);
      context.commit('playSong', res.data[0])
      // console.log(context.state.playMusicList[context.state.playIndex].id);
      context.commit('playerid', context.state.playMusicList[context.state.playIndex].id)
    })
  },
  // 右侧播放
  miniPlayMusic(context) {
    playMusic(context.state.playMusicList[context.state.playIndex].id).then(res => {
      // console.log(res);
      context.commit('getLyric')
    })
  },
  // 搜索歌曲播放
  searchPlay(context) {
    // console.log(context.state.playMusicList);
    playMusic(context.state.playMusicList[context.state.playIndex].id).then(res => {
      console.log(res);
      context.commit('playerid',res.data[0].id)
      context.commit('playSong', res.data[0])
    })
  },
  // 播放主界面显示与隐藏
  playerShow(context) {
    context.commit('playerShow', !context.state.playerShow)
  },
  // 搜索建议
  changeSuggest(context, suggest) {
    context.commit('changeSuggest', suggest)
  },
  // 用户id 
  userID(context, uid) {
    context.commit('userID', uid)
  },

  //随机播放
  randomPlayIndex(context) {
    const random = Math.floor(Math.random() * (context.state.playMusicList.length + 1));
    if (random == context.state.playIndex) {
      const random = Math.floor(Math.random() * (context.state.playMusicList.length + 1));
      this.dispatch('playIndex', random)
      this.dispatch('playMusic')
      return
    }
    this.dispatch('playIndex', random)
    this.dispatch('playMusic')
  },
}