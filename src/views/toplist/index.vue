<template>
  <div class="toplist">
    <!-- <ranking :toplist="toplist" /> -->
    <songsSheet :songsSheet="toplist" />
  </div>
</template>

<script>
import {
  getTopList,
  handleTopList,
  getLeaderboardSongs,
  switching,
  SongListData,
  getSongSheetNewComment,
  SongData,
} from "../../network/toplist";
import ranking from "./ranking";
import songsSheet from "../../components/songs-sheet";

export default {
  name: "Ranking",
  data() {
    return {
      // 排行榜
      toplist: [],
    };
  },
  async created() {
    // 排行榜
    const { list } = await getTopList();
    this.toplist = list;
  },
  components: { ranking, songsSheet },
  methods: {},
  filters: {
    dateFormat(value) {
      const date = new Date(value);
      const MM = date.getMonth() + 1;
      const DD = date.getDate();
      return `${MM}月${DD}日`;
    },
  },
};
</script>

<style lang="less" scoped>
.toplist {
  width: 80%;
  margin: 20px auto;
}
</style>