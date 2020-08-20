<template>
  <div>
    <h2 class="songs-sheet-title">{{title}}</h2>
    <!-- 歌单内容 -->
    <div class="songs-sheet">
      <div
        class="songs-sheet-item"
        v-for="item in songsSheet"
        :key="item.id"
        @click="getSongListData(item.id)"
      >
        <div class="songs-sheet-desc">
          <span class="desc" v-show="item.copywriter">{{ item.copywriter }}</span>
          <img v-lazy="item.picUrl||item.coverImgUrl" />
          <i class="el-icon-caret-right play"></i>
        </div>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    songsSheet: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
    },
  },
  methods: {
    getSongListData(id) {
      this.$router.push({
        path: "playlist",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.songs-sheet-title {
  margin: 20px 0 10px 0;
}

.songs-sheet {
   font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  .songs-sheet-item {
    margin-top: 10px;
    padding: 5px;
    width: 19%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .name {
    overflow: hidden;
    padding: 5px;
    height: 20px;
    font-size: 18px;
    color: rgba(0, 0, 0, .8);
    white-space: nowrap; //断行处理：无断行
    text-overflow: ellipsis; //文字溢出处理：省略号
    overflow: hidden; //溢出处理：隐藏
  }
}
.songs-sheet-desc {
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .desc {
    box-sizing: border-box;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 1px;
    right: 0;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    // opacity: 1;
    transition: all 0.3s;
    transform: translateY(-100%);
  }
  .play {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    position: absolute;
    bottom: 20px;
    // left: 0;
    right: 20px;
    color: #d33a31;
    font-size: 36px;
    opacity: 0;
    transition: all 0.5s;
  }
}
.songs-sheet-desc:hover .desc {
  // opacity: 1;
  transition: all 0.3s;
  transform: translateY(0px);
}
.songs-sheet-desc:hover .play {
  transition: all 0.5s;
  opacity: 1;
}
</style>