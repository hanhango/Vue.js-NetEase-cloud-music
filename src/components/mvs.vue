<template>
  <div>
    <div class="mv">
      <div class="mv-item" @click="goMvContent(item.id)" v-for="item in mvData" :key="item.id">
        <div class="mv-img">
          <img v-lazy="item.picUrl || item.cover" />
          <span class="play-count">
            <i class="el-icon-caret-right icon"></i>
            {{item.playCount}}
          </span>
        </div>
        <i class="el-icon-caret-right play"></i>
        <dt>{{item.name}}</dt>
        <dd>{{item.artists[0].name}}</dd>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goMvContent(id) {
      //  console.log(id);
      this.$router.push({
        path: "mv",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
h2 {
  margin: 20px 0;
}
.mv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .mv-item {
    cursor: pointer;
    box-sizing: border-box;
    width: 24%;
    margin-top: 10px;
    position: relative;
  }
  dt {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap; //断行处理：无断行
    text-overflow: ellipsis; //文字溢出处理：省略号
    overflow: hidden; //溢出处理：隐藏
  }
  dd {
    font-weight: 600;
    font-size: 14px;
    margin: 3px 0;
    color: #bebebe;
  }
  .mv-img {
    overflow: hidden;
    position: relative;
    img {
      border-radius: 5px;
      width: 100%;
    }
    .play-count {
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 5px;
      padding: 3px 8px;
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      opacity: 1;
      transition: all 0.3s;
      .icon {
        font-size: 20px;
      }
    }
    .copywriter {
      font-size: 14px;
      box-sizing: border-box;
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      position: absolute;
      top: 0px;
      left: 0px;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      transform: translateY(-150%);
    }
  }
}
.play {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-20px, -10px);
  color: #d33a31;
  font-size: 40px;
  opacity: 0;
  transition: all 0.3s;
}

.mv-item:hover .play {
  transition: all 0.3s;
  opacity: 1;
}
</style>