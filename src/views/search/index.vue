<template>
  <div class="search">
    <h1>{{keyword}}</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="'单曲('+searchSong.songCount +')'" name="searchSong">
        <searchSong :searchSong="searchSong.songs" />
        <pagination :count="searchSong.songCount" @getNewPage="getSearchSong" />
      </el-tab-pane>
      <el-tab-pane :label="'歌单('+searchPlayLists.playlistCount +')'" name="searchPlayLists">
        <searchPlayLists class="searchSongsSheet" :songsSheet="searchPlayLists.playlists" />
        <pagination :count="searchPlayLists.playlistCount" @getNewPage="getsearchPlayLists" />
      </el-tab-pane>
      <el-tab-pane :label="'MV('+searchMV.mvCount+')'" name="searchMV">
        <searchMV class="searchMV" :mvData="searchMV.mvs" />
        <pagination :count="searchMV.mvCount" @getNewPage="getsearchMV" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import searchSong from "./search-song";
import searchPlayLists from "../../components/songs-sheet";
import searchMV from "../../components/mvs";
import pagination from "../../components/pagination";
import { searchContent, getAllData, getSearchData } from "../../network/search";
export default {
  data() {
    return {
      activeName: "searchSong",
      searchSong: {
        songs: [],
        type: 1,
        songCount: 0,
        limit: 30,
        offset: 0,
      },
      searchPlayLists: {
        playlists: [],
        type: 1000,
        playlistCount: 0,
        limit: 30,
        offset: 0,
      },
      searchMV: {
        mvs: [],
        type: 1004,
        mvCount: 0,
        limit: 32,
        offset: 0,
      },
      count: "searchSong",
    };
  },
  created() {
    this.getSearchSong();
    this.getsearchPlayLists();
    this.getsearchMV();
  },
  methods: {
    // 获取单曲和改变页数
    getSearchSong(newPage, obj = this.searchSong, keyword = this.keyword) {
      getSearchData(newPage, obj, keyword);
    },
    // 获取歌单和改变页数
    getsearchPlayLists(
      newPage,
      obj = this.searchPlayLists,
      keyword = this.keyword
    ) {
      getSearchData(newPage, obj, keyword);
    },
    // 获取MV和改变页数
    getsearchMV(newPage, obj = this.searchMV, keyword = this.keyword) {
      getSearchData(newPage, obj, keyword);
    },
  },
  computed: {},
  watch: {
    keyword(olvls, newvls) {
      if (olvls.trim() != newvls.trim()) this.getSearchSong();
      this.getsearchPlayLists();
      this.getsearchMV();
    },
  },
  computed: {
    keyword() {
      return this.$route.query.keyword;
    },
  },
  components: {
    searchSong,
    searchPlayLists,
    searchMV,
    pagination,
  },
};
</script>

<style lang="less" scoped>
.search {
  h1 {
    margin-left: 20px;
    color: rgb(83, 83, 83);
  }
  margin-top: 10px;
  width: 100%;
  /deep/ .el-tabs__header {
    margin: 10px 0;
  }
  /deep/ .el-tabs__item {
    // height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(124, 124, 124, 0.8);
    transition: all 0.3;
  }
  /deep/ .is-active {
    font-size: 18px !important;
    color: #d33a31 !important;
    transition: all 0.3;
  }

  /deep/ .el-tabs__nav {
    margin-left: 40px;
  }
  /deep/ .el-tabs__active-bar {
    height: 3px;
    background-color: #d33a31 !important;
  }
  .searchSongsSheet,
  .searchMV {
    width: 90%;
    margin: 0 auto;
  }
}
</style>