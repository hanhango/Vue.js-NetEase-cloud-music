<template>
  <div class="header-top">
    <div class="tag">
      <i class="el-icon-s-home" @click="goHome"></i>
      <i class="el-icon-minus" @click="checkFull"></i>
      <i class="el-icon-full-screen" @click="screenfull"></i>
    </div>
    <div class="left" @click="hide">
      <div class="router-go" v-if="!plShow">
        <i class="el-icon-arrow-left" @click="back"></i>
        <i class="el-icon-arrow-right" @click="go"></i>
      </div>
      <div class="router-go" v-else>
        <i class="el-icon-arrow-down" @click="playerShow"></i>
      </div>
    </div>
    <div class="search-input">
      <searc />
    </div>
  </div>
</template>

<script>
import searc from "../components/search";
import screenfull from "screenfull";
export default {
  data() {
    return {
      isFullscreen: true,
    };
  },
  components: {
    searc,
  },
  methods: {
    // 路由前进1
    go() {
      this.$router.go(1);
    },
    // 后退1
    back() {
      this.$router.go(-1);
    },
    // 隐藏右侧工具栏
    playerShow() {
      this.$store.dispatch("playerShow");
    },
    hide() {
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayListShow = false;
    },
    goHome() {
      this.hide()
      this.$store.state.playerShow = false;
      this.$router.push("/discover");
    },
    // 全屏事件
    screenfull() {
      if (!screenfull.isEnabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: "暂不不支持全屏",
          type: "warning",
        });
        return false;
      }
      screenfull.request();
    },

    // 退出全屏
    checkFull() {
      screenfull.exit();
    },
  },
  computed: {
    plShow() {
      return this.$store.state.playerShow;
    },
  },
};
</script>

<style lang="less" scoped>
.header-top {
  width: 96%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  flex: 1;
}
.router-go {
  width: 100px;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  // background-color: salmon;
  i {
    cursor: pointer;
    width: 40px;
    height: 40px;
    line-height: 40px;
    align-items: center;
    font-size: 20px !important;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.7) !important;
    transition: all 0.3s;
  }
  i:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }
}
.tag {
  width: 130px;
  // background-color: burlywood;
  height: 100%;
  margin-top: 40px;
  i {
    margin-right: 10px;
    border-radius: 50%;
    font-size: 10px;
    // box-sizing: border-box;
    width: 16px;
    height: 16px;
    line-height: 16px;
    // display: block;
    text-align: center;
    cursor: pointer;
    color: rgba(0, 0, 0, 0);
    transition: all 0.2s;
  }
  i:first-child {
    background-color: #ed655a;
  }
  i:nth-child(2) {
    background-color: #e0c04c;
  }
  i:last-child {
    background-color: #72be47;
  }
}
.tag:hover i {
  transition: all 0.2s;
  color: rgba(0, 0, 0, 0.5);
}
</style>
