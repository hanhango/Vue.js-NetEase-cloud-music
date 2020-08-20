<template>
  <div class="usersong">
    <!-- 用户歌单 -->
    <el-row>
      <h1>创建的歌单</h1>
      <el-col :span="24" v-for="(item,index) in userSongInfo" :key="item.id" v-show="(index == 0)">
        <div class="user-item" @click="getSongListData(item.id)">
          <i class="icon iconfont icon-yinleliebiao-"></i>
          <span>{{item.name}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <h1>收藏的歌单</h1>
      <el-col :span="24" v-for="(item,index) in userSongInfo" :key="item.id" v-show="(index !== 0)">
        <div class="user-item" @click="getSongListData(item.id)">
          <i class="icon iconfont icon-yinleliebiao-"></i>
          <span>{{item.name}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserSong } from "../network/user";
export default {
  name: "User",
  data() {
    return {
      userSongInfo: {}, // 用户歌单
    };
  },
  created() {
    getUserSong(this.userID.id).then((res) => {
      this.userSongInfo = res.playlist;
    });
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
  computed: {
    userID() {
      return this.$store.state.userID;
    },
  },
  watch: {
    userID(newval, oldval) {
      console.log(newval + "---" + oldval);
    },
  },
};
</script>

<style lang="less" scoped>
.usersong {
  margin-top: 20px;
}
h1 {
  font-size: 16px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 30px;
}
.user-item {
  line-height: 55px;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
  display: flex;
  justify-items: center;
  align-items: center;
  padding-left: 40px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  span {
    white-space: nowrap; //断行处理：无断行
    text-overflow: ellipsis; //文字溢出处理：省略号
    overflow: hidden; //溢出处理：隐藏
  }
}
.user-item:hover {
  background-color: #e2e2e2;
}
</style>