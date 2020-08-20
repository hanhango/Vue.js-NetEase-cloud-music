<template>
  <div class="menu" v-if="!menuShow">
    <login />
    <ul class="menu-wrap">
      <router-link to="/discover" tag="li" class="menu-item">
        <i class="icon iconfont icon-yinle"></i>
        <span>发现音乐</span>
      </router-link>
      <router-link to="/playlists" tag="li" class="menu-item">
        <i class="icon iconfont icon-yinleliebiao-"></i>
        <span>推荐歌单</span>
      </router-link>
      <router-link to="/toplist" tag="li" class="menu-item">
        <i class="icon iconfont icon-yinle"></i>
        <span>榜单</span>
      </router-link>
      <router-link to="/mvs" tag="li" class="menu-item">
        <i class="icon iconfont icon-shipin"></i>
        <span>最新MV</span>
      </router-link>
    </ul>
    <user v-if="userID" />
  </div>
</template>

<script>
import login from "@/components/login";
import user from "../components/user";
export default {
  components: {
    login,
    user,
  },
  computed: {
    menuShow() {
      // console.log(this.$route.path == "/mv");
      return this.$route.path == "/mv";
    },
    userID() {
      return this.$store.state.userID.id;
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  // height: calc(~"100vh - 150px");
  height: 100%;
  background-color: #ededed;

}
.menu-wrap {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
}
.menu-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 55px;
  line-height: 55px;
  padding-left: 40px;
  i {
    margin-right: 10px;
  }
  span {
    font-weight: 600;
    font-size: 18px;
  }
}
.menu-item:hover {
  // color: #d33a31;
  background-color: #e2e2e2;
}
.router-link-active {
  color: #d33a31;
  background-color: #e2e2e2;
}
</style>
