<template>
  <div>
    <h2 class="rec--songs-list-title">最新音乐</h2>
    <div class="rec--songs-list">
      <div class="rec--songs-list-item" v-for="(item,index) in songsList" :key="item.id" @click="playMusic(index)">
        <span>{{index+1 | indexSort}}</span>
        <img v-lazy="item.al.picUrl" />
        <div class="rec--songs-list-item-name">
          <dt>{{item.al.name}}</dt>
          <dd>{{item.ar[0].name}}</dd>
        </div>
        <i class="el-icon-caret-right play"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    playMusic(i){
      console.log('hanhan');
      // console.log(this.songsList);
       // 当前播放歌曲列表
      this.$store.dispatch("playMusicList", this.songsList);
      // 当前播放歌曲下标值
      this.$store.dispatch("playIndex", i);
      // 播放歌曲
      this.$store.dispatch("playMusic");
    }
  },
  filters: {
    indexSort(i) {
      // return i != 10 ? "0" + i : i;
      return ("0" + i).slice(-2);
    },
  },
};
</script>

<style lang="less" scoped>
.rec--songs-list-title {
  margin: 30px 0;
}
.rec--songs-list {
  display: flex;
  flex-wrap: wrap;
}
.rec--songs-list-item {
  cursor: pointer;
  position: relative;
  width: 50%;
  height: 100px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 20px;
    width: 50px;
  }
  img {
    width: 80px;
    border-radius: 5px;
  }
  .rec--songs-list-item-name {
    font-weight: 600;
    font-size: 18px;
    flex: 1;
    margin-left: 20px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    dd {
      margin: 0;
      font-weight: 600;
      font-size: 16px;
      color: #bebebe;
    }
  }
}
.rec--songs-list-item:hover {
  transition: all 0.3s;
  border-radius: 5px;
  background-color: rgba(124, 124, 124, 0.1);
}
.play {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: absolute;
  bottom: 35px;
  left: 95px;
  color: #d33a31;
  font-size: 28px;
  transition: all 0.2s;
  opacity: 0;
}
.rec--songs-list-item:hover .play {
  transition: all 0.2s;
  opacity: 1;
}
</style>