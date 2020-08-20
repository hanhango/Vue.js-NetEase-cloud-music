<template>
  <div class="discover">
    <el-row :gutter="20">
      <el-col :span="24" class="col">
        <!-- 轮播图 -->
        <carousel :banners="banners" />
        <!-- 推荐歌单 -->
        <recSongsSheet :songsSheet="songsSheet" :title="title" />
        <!-- 推荐歌曲 -->
        <rceSongsList :songsList="songsList" />
        <!-- 推荐MV -->
        <h2>推荐MV</h2>
        <recMv :mvData="mv" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import carousel from "./carousel";
import recSongsSheet from "../../components/songs-sheet";
import rceSongsList from "./rce-songs-list";
import recMv from "../../components/mvs";

import {
  getBanner,
  getRecSongsSheet,
  getRceSongsList,
  getRceMv,
} from "../../network/discover";
import { getSongList } from "../../network/playlist";
export default {
  name: "discover",
  data() {
    return {
      banners: [], // 轮播图数据
      songsSheet: [], // 推荐歌单数据
      songsList: [], // 推荐歌曲
      mv: [], // 推荐MV
      title: "推荐歌单",
    };
  },
  components: {
    carousel,
    recSongsSheet,
    rceSongsList,
    recMv,
  },
  async created() {
    // 轮播图获取
    const { banners } = await getBanner();
    this.banners = banners;

    // 推荐歌单
    const { result: songsSheetResult } = await getRecSongsSheet();
    this.songsSheet = songsSheetResult;

    // 推荐歌曲
    const { result: recSongResult } = await getRceSongsList();
    const arr = [];
    recSongResult.map((i) => arr.push(i.id));
    const { songs } = await getSongList(arr);
    this.songsList = songs;

    // 推荐MV
    const { result: mvResult } = await getRceMv();
    this.mv = mvResult;
  },
};
</script>
<style lang="less" scoped>
.discover {
  width: 80%;
  margin: 20px auto;
}
h2 {
  margin: 20px 0;
}
</style>