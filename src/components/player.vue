<template>
  <transition name="player">
    <div class="player" v-if="show" @click="hide">
      <div class="player-content">
        <div class="song">
          <div class="left">
            <img class="play-bar-support" src="@/assets/image/play-bar-support.png" />
            <img
              :class="this.$store.state.playing ? '': 'play-bar-ani'"
              class="play-bar"
              src="@/assets/image/play-bar.png"
            />
            <div class="play-music" :class="this.$store.state.playing ? '': 'play-music-ani'">
              <img class="pic" :src="currentSong.al.picUrl" />
            </div>
          </div>
          <div class="right">
            <div class="name">
              <!-- 歌曲名称 -->
              <h1>{{currentSong.name}}</h1>
              <!-- 歌手 -->
              <div class="singer">
                <span>歌手:</span>
                <p>{{currentSong.ar[0].name}}</p>
              </div>
              <div @mousemove="mouseInLyric"
                   @mouseleave="mouseOutLyric"
                   class="lyric" 
                   ref="ullyric"
                   v-if="lyrics.length>0">
                <!-- {{lyric}} -->
                <ul class="han">
                  <li
                    v-for="(item,index) in lyrics"
                    :key="index"
                    :class="{'active': ifActive(index)}"
                  >{{item.lyric}}{{ifScroll(index)}}</li>
                </ul>
              </div>
              <div v-else class="name">
                <h1 class="null-lyrics">暂无歌词</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="comment" v-if="total>0">
          <div class="comment-left">
            <hotComment :comments="hotComment" :span="2" :title="'精彩评论'" />
            <hotComment :comments="comment" :total="total" :span="2" :title="'最新评论'" />
          </div>
          <div class="comment-right">
            <ul class="simi-playlists" v-if="simiPlaylists.length>0">
              <h3>包含这首歌的歌单</h3>
              <li
                class="simi-playlists-item"
                v-for="item in simiPlaylists"
                :key="item.id"
                @click="getSongListData(item.id)"
              >
                <img v-lazy="item.coverImgUrl" alt />
                <div>
                  <p>{{item.name}}</p>
                  <span>{{item.playCount |formatNumber }}</span>
                </div>
              </li>
            </ul>

            <ul class="simi-playlists" v-if="simiSongs.length>0">
              <h3>相似歌曲</h3>
              <li
                class="simi-playlists-item"
                v-for="(item, index) in simiSongs"
                :key="item.id"
                @click="playMusic(index)"
              >
                <img v-lazy="item.al.picUrl" alt />
                <div>
                  <p>{{item.name}}</p>
                  <span>{{item.ar[0].name }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import hotComment from "./comment";
import comment from "./comment";
import {
  getMusicComment,
  getLyric,
  getSimiSongSheet,
  getSimiSongs,
} from "../network/play";
import { getSongList } from "../network/playlist";
export default {
  data() {
    return {
      hotComment: [], // 精彩评论
      total: 0, // 最新评论条目数
      comment: [], // 最新评论
      lyrics: [], // 歌词
      simiPlaylists: [], // 获包含这首歌的相似歌单
      simiSongs: [], //相似歌曲
      isScrollTo: true//是否可以滚动
    };
  },
  created() {},
  methods: {
    //鼠标不可以滚动
    mouseInLyric(){
      this.isScrollTo = false
    },
    //鼠标可以滚动
    mouseOutLyric(){
      this.isScrollTo = true
    },
    hide() {
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayListShow = false;
    },
    // 获取评论
    _getMusicComment(id) {
      getMusicComment(id).then((res) => {
        this.hotComment = res.hotComments;
        this.comment = res.comments;
        this.total = res.total;
      });
    },
    // 获取歌词
    _getLyric(id) {
      getLyric(id).then((res) => {
        let RegExp = /\[(\d*:\d*\.\d*)\]/;
        let arr = [],
          timeArr = [],
          lyricArr = [],
          mergeArr = [];

        /**将歌词转换成数组 */
        arr = res.lrc.lyric.split("\n");

        for (let i of arr) {
          /**获取歌词 */
          let lrc = i.split("]")[1];
          if (lrc == "" || lrc == undefined) continue;
          lyricArr.push(lrc);

          /**处理时间 */
          let resTime = RegExp.exec(i)[1];
          let resTime2 = resTime.split(":");
          let min = parseInt(resTime2[0]) * 60;
          let sec = parseFloat(resTime2[1]);
          let time = parseFloat(Number(min + sec).toFixed(2)); //toFixed返回值是String
          timeArr.push(time);
        }

        for (let i = 0, length = timeArr.length; i < length; i++) {
          let obj = {
            time: timeArr[i],
            lyric: lyricArr[i],
          };
          mergeArr.push(obj);
        }
        this.lyrics = mergeArr;
        // console.log(this.lyrics);
      });
    },
    // 歌词移动
    scrollLRC(index) {
      if (index < 4 && index != 0)
        return ;
      if(index == 0){
        this.$refs.ullyric.scrollTop = 122
        console.log(this.$refs.ullyric.scrollTop);
      }
      if (this.isScrollTo) {
        this.$nextTick(() => {
          const HEIGHT = document.querySelector(".active").offsetTop || 39;
          // this.$refs.ullyric.scrollTop = ((index - 4) * HEIGHT);
          this.$refs.ullyric.scrollTop = HEIGHT - 112;
        });
      }
    },
    // 获包含这首歌的相似歌单
    _getSimiSongSheet(id) {
      getSimiSongSheet(id).then((res) => {
        console.log(res);
        if (res.playlists.length == 0) return (this.simiPlaylists = []);
        this.simiPlaylists = res.playlists;
      });
    },
    // 歌单跳转
    getSongListData(id) {
      this.$store.state.playerShow = false;
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayer = false;
      this.$router.push({
        path: "playlist",
        query: {
          id: id,
        },
      });
    },
    // 相似歌曲
    _getSimiSongs(id) {
      getSimiSongs(id).then((res) => {
        console.log(res);
        if (res.songs.length == 0) return (this.simiSongs = []);
        let list = [];
        res.songs.map((i) => list.push(i.id));
        const str = list.join(",");
        getSongList(list).then((song) => {
          this.simiSongs = song.songs;
        });
      });
    },
    // 相似歌曲播放
    playMusic(i) {
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayListShow = false;
      // 当前播放歌曲列表
      this.$store.dispatch("playMusicList", this.simiSongs);
      // 当前播放歌曲下标值
      this.$store.dispatch("playIndex", i);
      // 播放歌曲
      this.$store.dispatch("playMusic");
    },
  },
  components: {
    hotComment,
    comment,
  },
  computed: {
    // 当前歌曲歌词
    Lyric() {
      return this.$store.state.Lyric;
    },
    //获取正在活跃的歌词
    ifActive(index) {
      return function (index) {
        let lyrics = this.lyrics;
        let playerTiem = this.playerTiem;
        if (
          (index <= lyrics.length - 2 &&
          playerTiem >= lyrics[index].time &&
          playerTiem <= lyrics[index + 1].time) || 
          (index == lyrics.length - 1 &&
          playerTiem >= lyrics[index].time) || 
          (index == 0 && playerTiem <= lyrics[0].time)
        ) {
          return true;
        }
        return false;
      };
    },
    //判断是否需要滚动歌词
    ifScroll(index) {
      let oldIndex = 0;
      return function (index) {
        let lyrics = this.lyrics;
        let playerTiem = this.playerTiem;
        if (
          (index + 1 < lyrics.length &&
          playerTiem >= lyrics[index].time &&
          playerTiem <= lyrics[index + 1].time) || 
          (index + 1 == lyrics.length &&
          playerTiem >= lyrics[index].time)
        ) {
          if (index != oldIndex) {
            oldIndex = index;
            this.scrollLRC(index);
          }
        }
      };
    },
    // 当前歌曲内容
    currentSong() {
      return this.$store.getters.getTheCurrentSong;
    },
    // 歌曲时间
    playerTiem: {
      get() {
        return this.$store.state.playerTiem;
      },
      set() {},
    },
    // 显示或隐藏
    show() {
      return this.$store.state.playerShow;
    },
    // 歌曲id
    playerid() {
      return this.$store.state.playerid;
    },
  },
  watch: {
    playerid(newval, olval) {
      // console.log(newval + "------" + olval);
      if (newval != olval) {
        this._getMusicComment(newval);
        this._getLyric(newval);
        this._getSimiSongSheet(newval);
        this._getSimiSongs(newval);
      }
    },
  },
  filters: {
    formatNumber(number) {
      number = Number(number) || 0;
      return number > 100000 ? `${Math.round(number / 10000)}万` : number;
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #d33a31;
  font-size: 18px !important;
  font-weight: 600;
  transition: font-size 0.1s;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.play-music-ani {
  animation-play-state: paused !important;
}
.play-bar-ani {
  top: -90px !important;
  left: 70px !important;
  transform: rotate(-30deg) !important;
  transition: all 0.3s;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.player-enter-active {
  transition: all 0.3s ease;
}
.player-leave-active {
  transition: all 0.3s ease;
}
.player-enter,
.player-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.player {
  position: fixed;
  top: 70px;
  width: 100%;
  background-color: #f9f9f9;
  z-index: 99;
  overflow: hidden;
  height: calc(~"100vh - 152px");
  transition: all 0.3s;
}

.player-content {
  height: calc(~"100vh - 152px");
  overflow-y: auto;
  overflow-x: hidden;
}
/* 设置滚动条的样式 */
.player-content::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* 滚动槽 */
.player-content::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* 滚动条滑块 */
.player-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
}
.song {
  z-index: 2;
  width: 60%;
  margin: 0 auto;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .play-bar-support {
      position: relative;
      top: -20px;
      left: -30px;
      width: 40px;
      height: 40px;
      z-index: 2;
    }
    .play-bar {
      position: relative;
      top: -60px;
      left: 30px;
      width: 145px;
      height: 200px;
      z-index: 1;
      transition: all 0.3s;
    }
    .play-music {
      position: relative;
      top: -140px;
      width: 380px;
      height: 380px;
      border: #dddddd 18px solid;
      box-shadow: 0px 0px 0px 70px #202020 inset;
      border-radius: 50%;
      // box-shadow: ;
      animation: rotate 20s linear infinite;
      .pic {
        z-index: 2;
        display: block;
        width: 270px;
        height: 270px;
        margin: 0 auto; /*水平居中*/
        position: relative;
        top: 50%; /*偏移*/
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: #cccccc;
      }
    }
  }
  .right {
    margin-left: 60px;
    flex: 1;
    height: 100%;
    .name {
      display: flex;
      // margin-top: 70px;
      // background-color: red;
      flex-direction: column;
      width: 80%;
      h1 {
        white-space: nowrap; //断行处理：无断行
        text-overflow: ellipsis; //文字溢出处理：省略号
        overflow: hidden; //溢出处理：隐藏
        max-width: 80%;
        font-size: 26px;
        letter-spacing: 2px;
        font-weight: 600;
        // background-color: red;
      }
      .singer {
        margin-top: 20px;
        display: flex;
        font-size: 18px;
        font-weight: 600;
        color: rgba(124, 124, 124, 1);
        span {
          width: 60px;
          color: rgba(124, 124, 124, 0.6);
        }
        p {
          flex: 1;
          white-space: nowrap; //断行处理：无断行
          text-overflow: ellipsis; //文字溢出处理：省略号
          overflow: hidden; //溢出处理：隐藏
        }
      }
      .null-lyrics {
        color: rgba(124, 124, 124, 0.9);
        margin-top: 160px;
      }
    }
    .lyric {
      // overflow: hidden;
      overflow-x: hidden;
      overflow-y: scroll;
      position: relative;
      margin-top: 20px;
      width: 100%;
      height: 472px;
    }
    .lyric::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
    }
    ul {
      width: 100%;
      position: absolute;
      top: 0;
      // height: 490px;
      li {
        line-height: 40px;
        font-size: 16px;
        // font-weight: 600;
        letter-spacing: 2px;
        // transition:  font-size 0.1s;
      }
    }
  }
}
.comment {
  width: 60%;
  margin: 20px auto;
  display: flex;
  /deep/ .el-pager li {
    background-color: #f9f9f9;
  }
  /deep/ .el-pagination button:disabled {
    background-color: #f9f9f9;
  }
  /deep/ .btn-next {
    background-color: #f9f9f9;
  }
  .comment-left {
    flex: 1;
  }
  .comment-right {
    width: 300px;
    height: 200px;
    background-color: #f9f9f9;
    .simi-playlists {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      h3 {
        color: rgba(0, 0, 0, 0.8);
      }
      .simi-playlists-item {
        cursor: pointer;
        margin: 10px 0;
        display: flex;
        height: 70px;
        align-items: center;
        img {
          width: 65px;
          border-radius: 5px;
          margin-right: 20px;
          border: rgba(0, 0, 0, 0.1) 1px solid;
        }
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          line-height: 30px;
          box-sizing: border-box;
          p {
            width: 200px;
            font-size: 16px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.7);
            white-space: nowrap; //断行处理：无断行
            text-overflow: ellipsis; //文字溢出处理：省略号
            overflow: hidden; //溢出处理：隐藏
          }
          span {
            font-size: 16px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .simi-playlists-item:hover {
        border-radius: 5px;
        background-color: rgba(189, 189, 189, 0.1);
      }
    }
  }
}
</style>