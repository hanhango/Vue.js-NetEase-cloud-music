<template>
  <transition name="search-content">
    <div class="search-content" v-if="this.$store.state.searchShow">
      <div class="suggest" v-if="this.$store.state.suggest.songs.length > 0">
        <div class="suggest-songs-albums">
          <div class="songs">
            <i class="icon iconfont icon-yinle">单曲</i>
            <ul>
              <li
                v-for="(item,index) in this.$store.state.suggest.songs"
                :key="item.id"
                @click="playMusic(index)"
              >
                <dt>{{item.name}}</dt>-
                <dd>{{item.artists[0].name}}</dd>
              </li>
            </ul>
          </div>
          <div class="albums" v-if="this.$store.state.suggest.playlists.length">
            <i class="icon iconfont icon-yinle">歌单</i>
            <ul>
              <li v-for="item in this.$store.state.suggest.playlists" :key="item.id" @click="getSongListData(item.id)">
                <dt>{{item.name}}</dt>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 热搜榜 -->
      <div class="search-hot" v-else>
        <h2 class="search-hot-title">热搜榜</h2>
        <ul>
          <li v-for="(item, index) in hotSearch" :key="index" @click="hotSearchGo(item)">
            <div class="hot-index">{{index+1}}</div>
            <div class="hot-content">
              <div class="hot-word">
                <span class="searchWord">{{item.searchWord}}</span>
                <span class="score">{{item.score}}</span>
                <em v-if="item.iconType">HOT</em>
              </div>
              <div class="dec">
                <span>{{item.content}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { getHotSearch } from "../network/search";
import { getSongList } from "../network/playlist";
export default {
  data() {
    return {
      hotSearch: [], // 热门搜索
    };
  },
  created() {
    // 热门搜索
    getHotSearch().then((res) => {
      this.hotSearch = res.data;
    });
  },
  methods: {
    // 路由跳转
    hotSearchGo(item) {
      this.$store.state.playerShow = false;
      this.$store.state.searchShow = false;
      this.$router.push({
        path: "search",
        query: {
          keyword: item.searchWord,
        },
      });
    },
    // 播放歌曲
    playMusic(i) {
      let arr = [];
      this.$store.state.suggest.songs.map((i) => arr.push(i.id));
      getSongList(arr).then((res) => {
        const songsList = res.songs;
        // 当前播放歌曲列表
        this.$store.dispatch("playMusicList", songsList);
        // 当前播放歌曲下标值
        this.$store.dispatch("playIndex", i);
        // 播放歌曲
        this.$store.dispatch("playMusic");
      });
    },
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
  },
  computed: {
    suggest() {
      console.log(this.$store.state.suggest);
      this.$store.state.suggest;
    },
  },
};
</script>

<style lang="less" scoped>
.search-content-enter-active {
  transition: all 0.3s ease;
}
.search-content-leave-active {
  transition: all 0.3s ease;
}
.search-content-enter,
.search-content-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
// 推荐搜索内容
.search-content {
  box-shadow: -1px -1px 1px rgba(124, 124, 124, 0.1);
  width: 500px;
  height: calc(~"100vh - 152px");
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 1000;
  top: 70px;
  right: 0;
  .search-hot {
    .search-hot-title {
      display: block;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      padding-left: 30px;
      // color: #d83c34;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
    ul {
      width: 100%;
      height: calc(~"100vh - 200px");
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      li {
        line-height: 30px;
        display: flex;
        align-items: center;
        margin-top: 20px;
        transition: all 0.3s;
        cursor: pointer;
        .hot-index {
          width: 50px;
          // background-color: darkcyan;
          color: rgba(0, 0, 0, 0.3);
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        }
        .hot-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          .hot-word {
            display: flex;
            span {
              margin-right: 20px;
            }
            .searchWord {
              transition: all 0.3s;
              font-size: 17px;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.6);
            }
            .score {
              font-size: 13px;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.4);
            }
            em {
              font-size: 14px;
              font-weight: 600;
              color: #d33a31;
            }
          }
        }
        .dec {
          font-size: 14px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.4);
        }
      }
      li:hover {
        background-color: rgba(160, 160, 160, 0.1);
        transition: all 0.3s;
      }
      li:hover .searchWord {
        transition: all 0.3s;
        color: #d83c34 !important;
      }
    }
    /* 设置滚动条的样式 */
    ul::-webkit-scrollbar {
      width: 6px;
      background-color: rgba(0, 0, 0, 0.1);
    }

    /* 滚动槽 */
    ul::-webkit-scrollbar-track {
      border-radius: 5px;
    }

    /* 滚动条滑块 */
    ul::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
// 搜索后推荐的内容
.suggest {
  width: 500px;
  height: calc(~"100vh - 152px");
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .suggest-songs-albums {
    width: 100%;
    height: calc(~"100vh - 160px");
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    // background: red;
  }
  /* 设置滚动条的样式 */
  .suggest-songs-albums::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* 滚动槽 */
  .suggest-songs-albums::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  /* 滚动条滑块 */
  .suggest-songs-albums::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
  }
  .songs,
  .albums {
    display: flex;
    flex-direction: column;
    i {
      line-height: 50px;
      font-size: 18px;
      font-weight: 600;
      padding-left: 25px;
      // color: #d83c34;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }
    ul {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
    }

    li {
      cursor: pointer;
      padding-left: 40px;
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      color: rgba(75, 75, 75, 0.7);
      display: flex;
      align-items: flex-end;
      dt {
        font-size: 17px;
        color: rgba(0, 0, 0, 0.6);
        margin-right: 10px;
        transition: all 0.3s;
      }
      dd {
        font-size: 13px;
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    li:hover {
      transition: all 0.3s;
      background-color: rgba(160, 160, 160, 0.1);
    }
    li:hover dt {
      transition: all 0.3s;
      color: #d83c34 !important;
    }
  }
}
</style>