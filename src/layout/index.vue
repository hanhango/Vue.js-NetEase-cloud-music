<template>
  <div class="layout">
    <div class="header">
      <layoutHeader />
    </div>
    <div class="center" @click="hide">
      <div class="aside">
        <layoutMenu />
      </div>
      <div class="mian" @click="hide">
        <router-view />
      </div>
    </div>
  </div>
</template>
 
<script>
import layoutHeader from "./header";
import layoutMenu from "./menu";

export default {
  components: {
    layoutHeader,
    layoutMenu,
  },
  methods: {
    hide() {
      this.$store.state.searchShow = false;
      this.$store.state.miniPlayListShow = false
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 70px;
  background-color: #f9f9f9;
}
.footer {
  // border: 1px solid red;
  width: 100%;
  // height: 80px;
  background-color: #ffffff;
}
.center {
  display: flex;
  width: 100%;
  overflow: hidden;
  .aside {
    width: 320px;
    height: calc(~"100vh - 150px");
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #EDEDED;
  }
  .mian {
    flex: 1;
    height: calc(~"100vh - 150px");
    background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* 设置滚动条的样式 */
  .mian::-webkit-scrollbar,
  .aside::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* 滚动槽 */
  .mian::-webkit-scrollbar-track,
  .aside::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  /* 滚动条滑块 */
  .mian::-webkit-scrollbar-thumb,
  .aside::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.mian-content {
  width: 80%;
  margin: 0 auto;
}
</style>