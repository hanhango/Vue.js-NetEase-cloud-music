<template>
  <div>
    <songListInfor :songListInfor="songListInfor" @playAll="playAll" />
    <div class="playlist-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="歌曲列表" name="list">
          <songList :songlist="songlist" />
        </el-tab-pane>
        <el-tab-pane :label="'评论('+(commentInfo.total)+')'" name="comment">
          <comment :title="'精彩评论'" :comments="commentInfo.hotComments" />
          <comment
            :title="'最新评论'"
            :comments="commentInfo.comments"
            :total="commentInfo.total"
            @handleComments="_handleComments"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import songListInfor from "./song-list-infor";
import songList from "./song-list";
import comment from "./comment";
import {
  getContentOfSongList,
  getSongList,
  SongListData,
  SongData,
  getSongSheetNewComment,
  getHotComment,
} from "../network/playlist";
export default {
  name: "playlist",
  data() {
    return {
      // 歌单介绍数据
      songListInfor: {
        coverImgUrl: "", // 歌单图片
        name: "", // 歌单标题
        avatarUrl: "", // 歌单作者头像
        nickname: "", // 歌单作者名字
        createTime: "", // 歌单创建时间
        tags: [], // 歌单标签
        description: "", // 歌单描述
      },
      // 歌单的全部歌曲数据
      songlist: {
        trackIds:[], // 歌单所有id
        tracks:[] // 歌单所有歌曲
      }, 
      activeTab: "list", // tabs默认选中项
      commentInfo: {
        comments: [], // 最新评论
        total: 0, // 评论条目数
        hotComments: [], // 热门评论
      }, // 评论
      offset: 0, // 获取评论偏移数
    };
  },
  created() {
    this._handleComments();
    this._getContentOfSongList();
  },
  methods: {
    // 评论信息
    async _handleComments(newPage) {
      if (newPage == 1 || newPage == undefined) {
        this.offset = 0;
      } else {
        this.offset = 20 * (newPage - 1);
      }
      const { comments, total, hotComments } = await getSongSheetNewComment(
        this.songSheetid,
        this.offset
      );
      this.commentInfo = {
        comments,
        total,
        hotComments,
      };
    },

    // 发起网络请求获取到数据
    async _getContentOfSongList(id = this.songSheetid) {
      const { playlist } = await getContentOfSongList(id);
      const idList = [];
      playlist.trackIds.map((item) => {
        idList.push(item.id);
      });
      const {
        coverImgUrl,
        name,
        creator: { avatarUrl, nickname },
        createTime,
        tags,
        description,
      } = playlist;
      // 歌单介绍数据
      this.songListInfor = {
        coverImgUrl,
        name,
        avatarUrl,
        nickname,
        createTime,
        tags,
        description,
      };
      // 歌单获取到的歌曲不完整 但是歌曲id是完整的
      // 利用歌曲id 重新 获取到所有的歌曲在赋值
      const { privileges, songs } = await getSongList(idList);
      // 歌单的全部歌曲数据
      this.songlist = {
        trackIds: privileges,
        tracks: songs,
      };
    },
    // 播放音乐
    playAll() {
      // 当前播放歌曲列表
      this.$store.dispatch("playMusicList", this.songlist.tracks);
      // 当前播放歌曲列表ID
      this.$store.dispatch("playIds", this.songlist.trackIds);
      // 当前播放歌曲下标值
      this.$store.dispatch("playIndex", 0);
      // 播放歌曲
      this.$store.dispatch("playMusic");
    },
  },
  components: {
    songListInfor,
    songList,
    comment,
  },
  computed: {
    // 传过来的歌单id值
    songSheetid() {
      return this.$route.query.id;
    },
  },
  watch: {
    // 监听传过来的id值，和上次不一样更新数据
    songSheetid(newval, oldval) {
      if (newval != oldval) {
        this._getContentOfSongList(newval);
        this._handleComments(newval);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.playlist-tabs {
  /deep/ .el-tabs__item {
    font-size: 16px;
    font-weight: 600;
    color: #0c0c0c;
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
}
</style>