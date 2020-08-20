<template>
  <div class="song-list">
    <el-table :data="songlist.tracks" :row-style="{height:'88px'}" :cell-style="{padding:'0 0'}">
      <el-table-column type="index" align="center" width="80px"></el-table-column>
      <el-table-column show-overflow-tooltip label="音乐名称">
        <template slot-scope="scope">
          <div class="song-name">
            <img v-lazy="scope.row.al.picUrl" class="pic" />
            <span>{{ scope.row.name }}</span>
            <i v-if="scope.row.mv" class="icon iconfont icon-shipin mv"></i>
            <i @click.stop="playMusic(scope)" class="el-icon-caret-right play"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手"></el-table-column>
      <el-table-column show-overflow-tooltip prop="al.name" label="专辑"></el-table-column>
      <el-table-column prop="dt" width="100" label="时长">
        <template slot-scope="scope">{{ scope.row.dt | dateFormat }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    songlist: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 点击播放音乐
    playMusic(scope) {
      // 当前播放歌曲列表
      this.$store.dispatch("playMusicList", this.songlist.tracks);
      // 当前播放歌曲列表ID
      this.$store.dispatch("playIds", this.songlist.trackIds);
      // 当前播放歌曲下标值
      this.$store.dispatch("playIndex", scope.$index);
      // 播放歌曲
      // this.$store.dispatch("checkPlayMusic");
      this.$store.dispatch("playMusic");
    },
  },
  filters: {
    dateFormat(value) {
      const date = new Date(value);
      let m = ("0" + date.getMinutes()).slice(-2);
      let s = ("0" + date.getSeconds()).slice(-2);
      return `${m}:${s}`;
    },
  },
};
</script>

<style lang="less" scoped>
.song-list {
  margin-bottom: 20px;
  /deep/.el-table td {
    border: none;
  }
  /deep/.el-table::before {
    height: 0;
  }

  /deep/.el-table th.is-leaf {
    border: none;
  }
  /deep/.el-table td div {
    font-size: 17px;
    font-weight: 600;
    color: rgba(124, 124, 124, 0.8);
  }
  /deep/.cell .el-tooltip {
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
  }
  /deep/.cell {
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
  }
}

.songs-list-item {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  span {
    margin-left: 20px;
    width: 50px;
  }
  img {
    width: 80px;
  }
  .songs-list-item-name {
    flex: 1;
    margin-left: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.song-name {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  span {
    margin: 0 20px;
  }
  .pic {
    height: 80px;
    width: 80px;
    border-radius: 5px;
  }
  .mv {
    cursor: pointer;
    color: #d33a31;
    margin-left: 10px;
  }
  .play {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    position: absolute;
    bottom: 26px;
    left: 26px;
    color: #d33a31;
    font-size: 28px;
    transition: all 0.2s;
  }
}
</style>