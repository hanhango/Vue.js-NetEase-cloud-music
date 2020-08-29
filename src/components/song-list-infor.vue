<template>
  <div class="songListInfor">
    <div class="songListInfor-img">
      <img v-lazy="songListInfor.coverImgUrl" />
    </div>
    <div class="songListInfor-content">
      <p class="songListInfor-name">{{songListInfor.name}}</p>
      <div class="songListInfor-author">
        <img v-lazy="songListInfor.avatarUrl" />
        <p>{{songListInfor.nickname}}</p>
        <span>{{songListInfor.createTime | dateFormat}}创建</span>
      </div>
      <el-button size="small" class="songListInfor-but" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
      <div class="songListInfor-tags-des">
        <div class="songListInfor-tags">
          标签：
          <span v-for="(item,index) in songListInfor.tags" :key="index">{{item}}--</span>
        </div>
        <p class="songListInfor-des">{{songListInfor.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songListInfor: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    playAll(){
      this.$emit('playAll')
    }
  },
  filters: {
    dateFormat(value) {
      const date = new Date(value);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = ("0" + date.getDate()).slice(-2);
      return `${y}-${m}-${d}`;
    },
  },
};
</script>

<style lang="less" scoped>
.songListInfor {
  display: flex;
  padding: 40px;
  font-weight: 600;
}
.songListInfor-img {
  width: 260px;
  height: 260px;
  img {
    width: 100%;
    border-radius: 5px;
  }
}
.songListInfor-content {
  margin-left: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .songListInfor-name {
    margin-bottom: 25px;
    font-size: 20px;
    color: #333333;
  }
  .songListInfor-author {
    margin-bottom: 25px;
    display: flex;
    line-height: 50px;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 30px;
    }
    p {
      font-size: 18px;
      color: #4a4a4a;
    }
    span {
      margin-left: 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .songListInfor-but {
    text-align: center;
    width: 140px;
    box-sizing: border-box;
    font-size: 18px;
    background-color: #d33a31;
    color: #ffffff;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .songListInfor-tags-des {
    display: flex;
    flex-direction: column;
    line-height: 30px;
    font-size: 17px;
    color: #4a4a4a;
  }
}
</style>