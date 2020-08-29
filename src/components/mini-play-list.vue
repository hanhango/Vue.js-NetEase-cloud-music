<template>
  <transition name="mimi-play-list">
    <div class="mimi-play-list" v-if="this.$store.state.miniPlayListShow">
      <h2 class="mimi-play-list-title">播放列表</h2>
      <div class="list" v-if="this.$store.state.playMusicList.length > 0">
        <el-table
          :data="this.$store.state.playMusicList"
          :row-style="{height:'50px'}"
          :cell-style="{padding:'0 0'}"
          @row-click="playMusic"
          :row-class-name="tableRowIndex"
          :highlight-current-row="xs"
        >
          <el-table-column
            :label="this.$store.state.playMusicList.length.toString()"
            type="index"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="音乐名称">
            <template slot-scope="scope">
              <div class="song-name">
                <span>{{ scope.row.name }}</span>
                <i v-if="scope.row.mv" @click.stop="toMv(scope)" class="icon iconfont icon-shipin mv"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手"></el-table-column>
          <el-table-column prop="dt" width="100" label="时长">
            <template slot-scope="scope">{{ scope.row.dt | dateFormat }}</template>
          </el-table-column>
        </el-table>
      </div>
      <h3 v-else class="not-yet">暂无</h3>
      <!-- <el-tabs v-model="activeTab">
      <el-tab-pane label="播放列表" name="list">
        
      </el-tab-pane>
      <el-tab-pane :label="'播放历史记录'" name="record">fiahiu</el-tab-pane>
      </el-tabs>-->
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "list", // tabs默认选中项
      xs: true,
    };
  },
  methods: {
    tableRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },

    playMusic(row) {
      console.log(row);
      // 当前播放歌曲下标值
      this.$store.dispatch("playIndex", row.index);
      // 播放歌曲
      this.$store.dispatch("playMusic");
    },

    //去到mv页面
    toMv(scope){
      this.$router.push({
        path: "mv",
        query: {
          id: scope.row.mv
        },
      });
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
.mimi-play-list-enter-active {
  transition: all 0.3s ease;
}
.mimi-play-list-leave-active {
  transition: all 0.3s ease;
}
.mimi-play-list-enter,
.mimi-play-list-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.mimi-play-list-title {
  color: #d33a31;
  font-size: 18px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  background-color: #f9f9f9;
}
.not-yet{
  margin-top: 200px;
  font-size: 24px;
}
.mimi-play-list {
  transition: all 0.4s;
  z-index: 1000;
  top: 0px;
  right: 0;
  width: 500px;
  position: fixed;
  overflow: hidden;
  background-color: #ffffff;
  text-align: center;
  height: calc(~"100vh - 82px");
  box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.1);
  /deep/ .el-tabs__item {
    margin-top: 10px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(124, 124, 124, 0.8);
    transition: all 0.3;
  }
  /deep/ .el-table tr {
    line-height: 20px;
  }
  /deep/ .is-active {
    font-size: 18px !important;
    color: #d33a31 !important;
    transition: all 0.3;
  }

  /deep/ .el-tabs__nav {
    margin-left: 140px;
  }
  /deep/ .el-tabs__active-bar {
    height: 3px;
    background-color: #d33a31 !important;
  }
}

.list {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(~"100vh - 160px");
  overflow-y: auto;
  overflow-x: hidden;
  /deep/.el-table td {
    cursor: pointer;
    border: none;
  }
  /deep/.el-table::before {
    height: 0;
  }

  /deep/.el-table th.is-leaf {
    border: none;
  }
  /deep/.el-table td div {
    font-size: 12px;
    font-weight: 600;
    color: rgba(124, 124, 124, 0.8);
  }
  /deep/.cell {
    font-size: 16px;
    color: rgb(93, 93, 93);
  }
  .mv {
    cursor: pointer;
    margin-left: 5px;
    color: #d33a31;
  }
  .title {
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    float: left;
    color: rgba(0, 0, 0, 0.4);
  }
}
/* 设置滚动条的样式 */
.list::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* 滚动槽 */
.list::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* 滚动条滑块 */
.list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>