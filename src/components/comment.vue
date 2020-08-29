<template>
  <div class="comments">
    <div class="comment-title">
      <h3 v-if="comments.length>0">{{title}}</h3>
      <span v-if="total">一共{{total}}条</span>
    </div>
    <div class="user-comment">
      <div class="user-item" v-for="(item) in  comments" :key="item.time">
        <div class="user-cut-1">
          <img v-lazy="item ? item.user.avatarUrl : ''" alt />
          <div class="name-time">
            <p style="color: #a1a1a1">{{item.user.nickname}}</p>
            <span style="color: #a1a1a1">{{item.time | dateFormat}}</span>
          </div>
          <i class="icon iconfont icon-dianzan">
            <span>{{item.likedCount}}</span>
          </i>
        </div>
        <div class="content-info">
          <!-- 评论信息 -->
          <p>{{item.content}}</p>
        </div>
        <!-- 二级评论 -->
        <div class="user-cut-2" v-for="c in item.beReplied" :key="c.user.id">
          <p>{{c.user.nickname}}</p>
          <b>:</b>
          <span>{{c.content}}</span>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="total">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="currPage"
        :total="total/2"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import pagination from "./pagination";
export default {
  name: "Comment",
  components: {
    pagination,
  },
  data(){
    return{
      currPage: 1,
    }
  },
  props: {
    // 接受歌单数据
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    // 发射页数信息出去给父组件
    handleCurrentChange(newPage) {
      this.currPage = newPage
      this.$emit("handleComments", newPage);
    },
  },
  computed: {
    playId(){
      return this.$store.state.playerid
    }
  },
  watch: {
    playId(newVal){
      this.currPage = 1
    }
  },
  filters: {
    // 时间戳转换
    dateFormat(value) {
      // 时间戳信息
      // console.log("过滤函数执行了");
      const date = new Date(value);
      const YYYY = date.getFullYear();
      const MM = date.getMonth() + 1;
      const DD = date.getDate();
      const H = ("0" + date.getHours()).slice(-2);
      const mm = ("0" + date.getMinutes()).slice(-2);
      // 现在的时间
      const nowDate = new Date();
      const nowYYYY = nowDate.getFullYear();
      const nowMM = nowDate.getMonth() + 1;
      const nowDD = nowDate.getDate();
      let oldTime = YYYY + MM + DD;
      let newTime = nowYYYY + nowMM + nowDD;
      // 比较时间
      let compare = newTime - oldTime;
      // 传进来的时间戳的年月日和现在的时间的年月日比较
      if (oldTime == newTime) {
        // 相等只返回小时和分钟
        return `${H}:${mm}`;
      } else if (compare == 1) {
        // 相差一天
        return `昨天：${H}:${mm}`;
      } else if (compare > 1) {
        // 大于一天返回全部
        return `${YYYY}-${MM}-${DD} ${H}:${mm}`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.comments {
  margin-left: 40px;
}
.comment-title {
  margin-top: 40px;
  display: flex;
  align-items: center;
  span {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #696969;
  }
}
.user-comment {
  display: flex;
  flex-direction: column;
  .user-item {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    border-bottom: 1px dashed #ccc;
    .user-cut-1 {
      display: flex;
      font-size: 14px;
      height: 70px;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name-time {
        flex: 1;
        display: flex;
        flex-direction: column;
        line-height: 25px;
        margin-left: 20px;
        p {
          color: #0c73c2;
          font-size: 14px;
          letter-spacing: 2px;
        }
        span {
          // color:  #a1a1a1;
          font-size: 12px;
        }
      }
      i {
        width: 140px;
        // color:  #a1a1a1;
        span {
          padding-left: 5px;
          font-size: 12px;
        }
      }
    }
    .content-info {
      width: 88%;
      margin-left: 70px;
      font-size: 14px;
      color: #696969;
      p {
        line-height: 26px;
      }
    }
    .user-cut-2 {
      width: 88%;
      margin-top: 10px;
      margin-left: 70px;
      border-radius: 2px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-start;
      font-size: 14px;
      align-items: flex-start;
      position: relative;
      p {
        line-height: 25px;
        min-width: 10px;
        color: #0c73c2;
        margin-left: 10px;
      }
      b {
        line-height: 25px;
        margin-left: 5px;
      }
      span {
        flex: 1;
        line-height: 25px;
        margin-left: 5px;
        color: #696969;
      }
      &::after {
        content: "";
        position: absolute;
        border-radius: 2px;
        top: -7px;
        left: 10px;
        width: 0;
        height: 0;
        border-right: 7px solid transparent;
        border-left: 7px solid transparent;
        border-bottom: 7px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.pagination {
  margin: 20px 0;
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>