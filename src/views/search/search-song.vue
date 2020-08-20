<template>
  <div class="search-song">
    <el-table
      :data="searchSong"
      :row-style="{height:'50px'}"
      :cell-style="{padding:'0 0'}"
      style="width: 100%"
      stripe
      :row-class-name="tableRowIndex"
      @row-click="playMusic"
    >
      <el-table-column type="index" align="center" width="80"></el-table-column>
      <el-table-column prop="name" label="音乐标题"></el-table-column>
      <el-table-column prop="artists[0].name" label="歌手"></el-table-column>
      <el-table-column prop="album.name" label="专辑"></el-table-column>
      <el-table-column width="100" label="时长">
        <template slot-scope="scope">{{ scope.row.duration | dateFormat }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSongList } from "../../network/playlist";
export default {
  props: {
    searchSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    tableRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },

    // 点击播放音乐
    playMusic(row) {
      // console.log(row);
      const ids = [];
      this.searchSong.map((item) => {
        ids.push(item.id);
      });
      getSongList(ids).then((res) => {
        // 当前播放歌曲列表
        this.$store.dispatch("playMusicList", res.songs);
        // 当前播放歌曲下标值
        this.$store.dispatch("playIndex", row.index);
        // 播放歌曲
        this.$store.dispatch("searchPlay");
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
.search-song {
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
    font-size: 15px;
    font-weight: 600;
    color: rgba(124, 124, 124, 0.8);
  }
  /deep/.cell {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.7);
  }
}
.searchSongsSheet {
  width: 80%;
}
</style>