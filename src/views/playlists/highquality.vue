<template>
  <div class="highquality" v-if="this.highquality.length >=1">
    <div
      class="highquality-bg"
      :style="`background-image: url(${this.highquality[0].coverImgUrl})`"
    ></div>
    <!-- 精品歌单 -->
    <div class="highquality-content" @click="getSongListData">
      <img :src="highquality[0].coverImgUrl" />
      <div class="highquality-name-description">
        <div>精品歌单</div>
        <p class="highquality-name">{{highquality[0].name}}</p>
        <p class="highquality-description">{{highquality[0].description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    highquality: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getSongListData() {
      this.$router.push({
        path: "playlist",
        query: {
          id: this.highquality[0].id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.highquality {
  font-weight: 600;
  width: 100%;
  height: 230px;
  // filter: blur(2px);
  position: relative;
  border-radius: 5px;
  z-index: 2;
  overflow: hidden;
}
.highquality-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  // filter: blur(20px);
  z-index: 1;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.highquality-content {
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  color: #535353;
  display: flex;
  align-items: center;
  padding: 20px;
  height: 100%;
  img {
    height: 180px;
    border-radius: 5px;
    opacity: 0.8;
  }
  .highquality-name-description {
    height: 100%;
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
      width: 110px;
      color: #ff9100;
      border: 1px solid #ff9100;
      border-radius: 5px;
      text-align: center;
      padding: 5px 0;
    }
    .highquality-name {
      font-size: 22px;
    }
    .highquality-description {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.7);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4; //规定几行显示省略号
      -webkit-box-orient: vertical;
    }
  }
}
</style>