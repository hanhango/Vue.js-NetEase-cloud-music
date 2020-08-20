<template>
  <div class="comments">
    <el-row class="row">
      <el-col :span="23">
        <div class="comment-title">
          <h3 v-if="comments.length>0">{{title}}</h3>
          <span v-if="total">一共{{total}}条</span>
        </div>
      </el-col>
      <el-col :span="24" v-for="(item) in  comments" :key="item.time" class="col">
        <el-col :span="span">
          <!-- 用户头像 -->
          <img v-lazy="item ? item.user.avatarUrl : ''" alt />
        </el-col>
        <el-col :span="21" class="user">
          <div class="user-cut-1">
            <!-- 用户昵称和评论信息 -->
            <dt>{{item.user.nickname}}</dt>
            <b>:</b>
            <dd>{{item.content}}</dd>
          </div>
          <!-- 二级评论 -->
          <div class="user-cut-2" v-for="c in item.beReplied" :key="c.user.id">
            <!-- 二级评论 用户昵称和评论信息 -->
            <dt>{{c.user.nickname}}</dt>
            <b>:</b>
            <dd>{{c.content}}</dd>
          </div>
          <div class="time">
            <span>{{item.time | dateFormat}}</span>
            <i class="icon iconfont icon-dianzan"> {{item.likedCount}}</i>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <div class="pagination" v-if="total">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total/2"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
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
    span: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    // 发射页数信息出去给父组件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.$emit("handleComments", newPage);
    },
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
  margin: 10px 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
  }
}
.col {
  padding: 20px 0;
  img {
    width: 50px;
    border-radius: 50%;
  }
}
.user {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}
.user-cut-1 {
  display: flex;
  min-width: 20px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  align-items: center;
}
dt {
  color: #0c73c2;
}
b {
  margin-left: 5px;
}
dd {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.5);
}
.user-cut-2 {
  margin-top: 8px;
  border-radius: 2px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 14px;
  // font-weight: bold;
  align-items: center;
  position: relative;
}
.user-cut-2::after {
  content: "";
  position: absolute;
  border-radius: 2px;
  top: -5px;
  left: 5px;
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid rgba(0, 0, 0, 0.1);
}
.time {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  margin-top: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  span {
    // width:50px;
    min-width: 50px;
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