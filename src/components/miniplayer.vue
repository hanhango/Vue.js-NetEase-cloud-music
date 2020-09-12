<template>
  <div class="miniplay" @click="hide">
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="playSOng.url"
      autoplay
      @ended="audioEnd"
    ></audio>
    <!-- 进度条 -->
    <div class="slider">
      <el-slider
        v-model="sliderTime"
        :format-tooltip="formatProcessToolTip"
        @change="changeCurrentTime"
      ></el-slider>
    </div>
    <div class="audio-control">
      <div class="audio-left">
        <div class="left-content" v-if="playSOng">
          <!-- 图片 -->
          <!-- {{this.state.playSong[this.state.playIndex]}} -->
          <div class="image" @click.stop="playerShow">
            <img v-lazy="currentSong.al.picUrl" />
            <i class="el-icon-d-arrow-left arrow-left"></i>
            <i class="el-icon-d-arrow-right arrow-right"></i>
          </div>
          <div class="name-time">
            <div class="name">
              <!-- 歌曲名称 -->
              <p :title="currentSong.name">{{currentSong.name}}</p>
              <!-- 歌手 -->
              <span :title="currentSong.ar[0].name">{{currentSong.ar[0].name}}</span>
            </div>
            <div class="time">
              <span>
                <!-- 播放时间 -->
                {{ audio.currentTime | formatSecond}}
              </span>
              /
              <span>
                <!-- 总时间 -->
                {{ audio.maxTime | formatSecond}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="audio-crenter">
        <!-- 上一首 -->
        <i @click="lastSong" circle class="icon iconfont icon-shangyishouweidianji"></i>
        <!-- 暂停和播放 -->
        <i
          :class="[audio.playing ? 'icon iconfont icon-zanting' : 'icon iconfont icon-zanting1']"
          @click="startPlayOrPause"
          class="play-pause"
        ></i>
        <!-- 下一首 -->
        <i @click="audioEnd" circle class="icon iconfont icon-xiayishouweidianji"></i>
      </div>
      <div class="audio-right">
        <!-- 模式切换 -->
        <div class="play-mode">
          <el-popover
            placement="top-start"
            offset="60"
            :title="mode.name"
            width="160"
            trigger="hover"
          >
            <i slot="reference" @click="playMode" class="icon iconfont" :class="mode.icon"></i>
          </el-popover>
        </div>
        <!-- 控制右侧列表显示与隐藏 -->
        <div class="miniListShow">
          <i class="el-icon-s-unfold" @click.stop="miniListShow"></i>
          <div class="toast" v-show="toastShow">
            <span>歌单以更换</span>
          </div>
        </div>
        <!-- 音量按钮 -->
        <div class="volume-btn">
          <i
            class="icon iconfont"
            :class="[volumeShow ? 'icon-yinliang' : 'icon-jingyin']"
            @click="volume"
          ></i>
        </div>
        <!-- 音量控制 -->
        <div class="volume">
          <el-slider v-model="audio.volume" @change="changeVolume"></el-slider>
        </div>
        <!-- 跳转到gitee -->
        <div class="gitee">
          <!-- <a href="javascript:void(0);" target="_blank"> -->
          <a href="javascript:void(0);">
            <i class="icon iconfont icon-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 时间处理
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}
export default {
  name: "Play",
  data() {
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        // 音频音量
        volume: 100,
      },
      sliderTime: 0, // 进度条
      isShow: false, // 右侧列表显示隐藏
      volumeShow: true, // 是否静音
      setVolume: 0, // 音频声音大小
      toastShow: false, // 切换歌单提示
      playModeList: [
        {
          icon: "icon-shunxubofang",
          name: "列表循环",
        },
        {
          icon: "icon-danquxunhuan",
          name: "单曲循环",
        },
        {
          icon: "icon-suijibofang",
          name: "随机播放",
        },
      ], // 播放模式
      mode: {
        icon: "icon-shunxubofang",
        name: "列表循环",
      }, // 当前播放模式
      modeindex: 0, // 当前播放模式
    };
  },
  methods: {
    // 隐藏
    hide() {
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayListShow = false;
    },
    playerShow() {
      this.$store.dispatch("playerShow");
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      if (!this.audio.currentTime) return; // 没数据不能点击按钮
      return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
      this.$store.state.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      this.$store.state.playing = false;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      // console.log(res);
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseFloat(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
      this.$store.state.playerTiem = res.target.currentTime;
      // console.log(this.sliderTime.toFixed(2));
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log("loadedmetadata");
      // console.log(res);
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 播放结束和下一首
    audioEnd() {
      if (!this.audio.currentTime) return; // 没数据不能点击按钮
      /**
       * this.modeindex = 0  顺序播放
       * this.modeindex = 1  单曲循环
       * this.modeindex = 2  随机播放
       */
      switch (this.modeindex) {
        case 0:
          this.$store.dispatch("increasePlayIndex");
          break;
        case 1:
          this.$refs.audio.currentTime = 0;
          this.play();
          break;
        case 2:
          this.$store.dispatch("randomPlayIndex");
          break;
      }
      // this.$store.dispatch("increasePlayIndex");
    },
    // 上一首
    lastSong() {
      if (!this.audio.currentTime) return; // 没数据不能点击按钮
      if (this.modeindex == 1) return;
      if (this.$store.state.playIndex == 0)
        return this.$message.error("前面没有了不要再点了");
      if (this.modeindex == 2) {
        this.$store.dispatch("randomPlayIndex");
      } else {
        this.$store.dispatch("reducePlayIndex");
      }
    },
    // 模式切换
    playMode() {
      this.modeindex++;
      if (this.modeindex == 3) {
        this.modeindex = 0;
      }
      this.mode = this.playModeList[this.modeindex];
    },

    // 音量控制
    changeVolume(volume) {
      this.$refs.audio.volume = (volume * 0.01).toFixed(2);
      this.volumeShow = true;
      // console.log((volume * 0.01).toFixed(2));
    },
    // 音量
    volume() {
      if (this.volumeShow) {
        this.setVolume = this.audio.volume;
        this.audio.volume = 0;
        this.$refs.audio.volume = 0;
      } else {
        this.audio.volume = this.setVolume;
        this.$refs.audio.volume = (this.setVolume * 0.01).toFixed(2);
      }
      this.volumeShow = !this.volumeShow;
    },
    // 右边歌曲列表控制显示与隐藏
    miniListShow() {
      if (this.$store.state.searchShow) {
        this.$store.state.miniPlayListShow = true;
        this.$store.state.searchShow = false;
        return;
      }
      this.$store.state.miniPlayListShow = !this.$store.state.miniPlayListShow;
    },
  },
  computed: {
    // 当前播放歌曲
    playSOng() {
      return this.$store.state.playSong;
    },
    currentSong() {
      return this.$store.getters.getTheCurrentSong;
    },
    // 当前播放歌曲列表
    playmusiclist() {
      return this.$store.state.playMusicList;
    },
    // 当前router
    isShowMvPath() {
      return this.$route.path;
    },
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    // 控制播放与暂停显示图标
    transPlayPause(value) {
      return value ? "el-icon-video-pause" : "el-icon-video-play";
    },
    // 控制第一首和最后一首不能点击上(下)一首
    transPlayPause2(value) {
      return value ? "primary" : "danger";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
  watch: {
    // 更换播放歌单提升用户
    playmusiclist(newval, oldval) {
      if (newval != oldval) {
        this.toastShow = true;
        setTimeout(() => {
          this.toastShow = false;
        }, 5000);
      }
    },
    // 进入mv详细界面音乐播放动画都暂停，退出自动恢复
    isShowMvPath(newval, oldval) {
      if (newval == "/mv") {
        this.pause();
        this.audio.playing = false;
        this.$store.state.playing = false;
      } else if(oldval == '/mv' && newval != '/mv'){
        this.play();
        this.audio.playing = true;
        this.$store.state.playing = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.miniplay {
  position: relative;
  z-index: 100;
  background-color: rgb(255, 255, 255);
}
// 进度条
.slider {
  position: absolute;
  bottom: 63px;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  /deep/.el-slider__bar {
    background-color: #d33a31;
    height: 3px;
  }
  /deep/ .el-slider__runway {
    // background-color: #d33a31;
    height: 3px;
  }
  /deep/ .el-slider__button {
    background-color: #ff5147;
    border: rgb(255, 60, 60) 1px solid;
    height: 12px;
    width: 12px;
  }
}

.audio-control {
  display: flex;
  height: 80px;
  line-height: 80px;
  align-items: center;
}
.audio-left,
.audio-right {
  width: 45%;
  height: 80px;
}
.left-content {
  margin-left: 20px;
  height: 80px;
  display: flex;
  align-items: center;
  .image {
    position: relative;
    width: 55px;
    height: 55px;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 5px;
      transition: all 0.2s;
    }
    .arrow-left {
      position: absolute;
      top: 20px;
      left: 10px;
      opacity: 0;
      transition: all 0.3s;
      color: rgba(0, 0, 0, 1);
    }
    .arrow-right {
      position: absolute;
      top: 20px;
      right: 10px;
      opacity: 0;
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s;
    }
  }
  .image:hover img {
    transition: all 0.2s;
    opacity: 0.3;
  }
  .image:hover .arrow-left {
    opacity: 1;
    left: 3px;
    transition: all 0.3s;
  }
  .image:hover .arrow-right {
    opacity: 1;
    right: 3px;
    transition: all 0.3s;
  }
  .name-time {
    flex: 1;
    height: 70px;
    line-height: 35px;
    display: flex;
    margin-left: 40px;
    flex-direction: column;
    .name {
      display: flex;
      // background-color: red;
      width: 80%;
      p {
        white-space: nowrap; //断行处理：无断行
        text-overflow: ellipsis; //文字溢出处理：省略号
        overflow: hidden; //溢出处理：隐藏
        max-width: 80%;
        font-size: 18px;
        letter-spacing: 4px;
        font-weight: 600;
        // background-color: red;
      }
      span {
        white-space: nowrap; //断行处理：无断行
        text-overflow: ellipsis; //文字溢出处理：省略号
        overflow: hidden; //溢出处理：隐藏
        flex: 1;
        margin-left: 20px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(124, 124, 124, 0.8);
      }
    }
    .time {
      font-size: 12px;
      font-weight: 600;
      span:nth-child(1) {
        color: rgba(124, 124, 124, 1);
      }
      span:nth-child(2) {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
.audio-crenter {
  color: #d33a31;
  width: 10%;
  display: flex;
  justify-content: space-around;
  .play-pause {
    width: 90px !important;
    font-size: 62px;
    transition: all 0.3s;
    text-align: center;
  }
  i {
    cursor: pointer;
    font-size: 24px;
    // flex: 1;
  }
}
.audio-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

// 音量控制
.volume {
  margin-right: 20px;
  width: 200px;
  /deep/.el-slider__bar {
    background-color: #d33a31;
    height: 3px;
  }
  /deep/ .el-slider__runway {
    // background-color: #d33a31;
    height: 3px;
  }
  /deep/ .el-slider__button {
    background-color: #ff5147;
    border: rgb(255, 60, 60) 1px solid;
    height: 12px;
    width: 12px;
  }
}
.play-mode {
  // width: 80px;
  height: 100%;
  // background: red;
  font-size: 18px;
  font-weight: 600;
  i {
    font-size: 24px;
  }
  i:focus {
    border: none;
    outline: 0px;
  }
}
.volume-btn {
  padding-top: 4px;
  width: 35px;
  // background-color: royalblue;
  margin-right: 10px;
  i {
    cursor: pointer;
    font-size: 28px;
    transition: all 0.2s;
  }
  i:hover {
    color: #d33a31;
    transition: all 0.2s;
  }
}
.gitee {
  width: 35px;
  margin: 8px 40px 0 0px;
  i {
    font-size: 32px;
    color: #c71d24;
  }
}
// 控制右侧列表显示与隐藏
.miniListShow {
  z-index: 888;
  cursor: pointer;
  font-size: 28px;
  margin: 0 20px;
  transition: all 0.2s;
  position: relative;
}
.toast {
  position: absolute;
  top: -43px;
  left: -48px;
  font-size: 16px;
  width: 120px;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  text-align: center;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.1);
  span {
    width: 100%;
    position: relative;
  }
  span::after {
    position: absolute;
    bottom: -27px;
    left: 32px;
    content: "";
    border-left: 10px transparent solid;
    border-top: 10px #ffffff solid;
    border-right: 10px transparent solid;
  }
}

.miniListShow:hover {
  color: #d33a31;
  transition: all 0.2s;
}
// 左侧列表
.miniList {
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: calc(~"100vh - 83px");
  z-index: 2;
  background-color: #ffffff;
  transition: all 0.5s;
  box-shadow: -1px -1px 1px rgba(124, 124, 124, 0.1);
}
</style>