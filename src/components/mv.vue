<template>
  <div class="mv-video">
    <div class="video">
      <h2>MV详情</h2>
      <video class="video-src" :src="mvUrl" width="760" height="430" controls autoplay></video>
      <div class="artistName">
        <img :src="mvdata.cover" alt />
        <p>{{mvdata.artistName}}</p>
      </div>
      <p class="video-name">{{mvdata.name}}</p>
      <div class="publishTime-playCount">
        <p>发布：{{mvdata.publishTime}}</p>
        <p>播放：{{mvdata.playCount}}</p>
      </div>

      <mvComments :comments="mvHotComments" :title="'精彩评论'" :span="2" />
      <mvComments :comments="mvComments" :title="'热门评论'" :span="2" />
      <mvPagination @getNewPage="getMvNewCom" :count="mvTotal" />
    </div>
    <div class="simi-mv">
      <h2>相关推荐</h2>
      <ul class="simi-mv-item">
        <li v-for="item in simiMv" :key="item.id" @click="getMv(item.id)">
          <div class="simi-img">
            <img :src="item.cover" />
            <span class="simi-playCount">
              <i class="el-icon-caret-right">{{item.playCount |formatNumber}}</i>
            </span>
            <span class="simi-duration">{{item.duration|dateFormat}}</span>
          </div>
          <div class="simi-name">
            <p>{{item.name}}</p>
            <span>
              <em>BY</em>
              {{item.artistName}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mvComments from "./comment";
import mvPagination from "./pagination";
import { getMV, getMvUrl, getMvComment, getSimiMv } from "../network/mv.js";
export default {
  data() {
    return {
      mvUrl: "", // mv地址
      mvdata: {}, // mv内容
      simiMv: [], // 相关mv
      mvHotComments: [], // 热门评论
      mvComments: [], // 最新评论
      mvTotal: 0, // 评论条目数
      offset: 0,
    };
  },
  components: {
    mvComments,
    mvPagination,
  },
  created() {
    this._getMVContent(this.mvID);
  },
  methods: {
    _getMVContent(id) {
      getMV(id).then((res) => {
        this.mvdata = res.data;
      });
      getMvUrl(id).then((res) => {
        this.mvUrl = res.data.url;
        // console.log(res.data);
      });
      getSimiMv(id).then((res) => {
        this.simiMv = res.mvs;
        // console.log(res);
      });
      this.getMvNewCom();
    },
    getMv(id) {
      this._getMVContent(id);
    },
    // 评论
    getMvNewCom(newPage) {
      if (newPage == 1 || newPage == undefined) {
        this.offset = 0;
      } else {
        this.offset = 20 * (newPage - 1);
      }
      getMvComment(this.mvID, this.offset).then((res) => {
        this.mvHotComments = res.hotComments;
        this.mvComments = res.comments;
        this.mvTotal = res.total;
        // console.log(res);
      });
    },
  },
  computed: {
    mvID() {
      return this.$route.query.id;
    },
  },
  filters: {
    formatNumber(number) {
      number = Number(number) || 0;
      return number > 100000 ? `${Math.round(number / 10000)}万` : number;
    },
    dateFormat(value) {
      const date = new Date(value);
      let m = ("0" + date.getMinutes()).slice(-2);
      let s = ("0" + date.getSeconds()).slice(-2);
      return `${m}:${s}`;
    },
  },
};
</script>

<style lang="less" scoped>
.mv-video {
  display: flex;
  width: 80%;
}
.video {
  flex: 1;
  display: flex;
  flex-direction: column;
  /deep/ .comments {
    margin: 20px 0 0 0;
  }
  h2 {
    margin: 20px 0;
  }
  .video-src {
    width: 760px;
    height: 430px;
    background-color: black;
  }
  .artistName {
    display: flex;
    margin: 30px 0;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    p {
      margin-left: 40px;
      color: rgba(47, 47, 47, 0.8);
      font-size: 20px;
      font-weight: 600;
    }
  }
  .video-name {
    margin-bottom: 20px;
    font-size: 28px;
    color: rgba(47, 47, 47, 0.9);
    font-weight: 600;
  }
  .publishTime-playCount {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    color: rgba(47, 47, 47, 0.6);
    p {
      margin-right: 20px;
    }
  }
}
.simi-mv {
  width: 480px;
  // background-color: chocolate;
  h2 {
    margin: 20px 0;
  }
  .simi-mv-item {
    display: flex;
    flex-direction: column;
    li {
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      margin-bottom: 15px;
      .simi-img {
        position: relative;
        width: 200px;
        img {
          width: 200px;
          border-radius: 5px;
        }
        .simi-playCount {
          position: absolute;
          top: 8px;
          right: 5px;
          color: #ffffff;
          font-size: 14px;
        }
        .simi-duration {
          font-size: 14px;
          position: absolute;
          bottom: 8px;
          right: 5px;
          color: #ffffff;
        }
      }
      .simi-name {
        margin-left: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        // background-color: green;
        justify-content: space-evenly;
        p {
          font-size: 18px;
          color: rgba(47, 47, 47, 0.9);
        }
        p,
        span {
          font-weight: 600;
          white-space: nowrap; //断行处理：无断行
          text-overflow: ellipsis; //文字溢出处理：省略号
          overflow: hidden; //溢出处理：隐藏
          width: 270px;
        }
        span {
          font-size: 16px;
          color: rgba(47, 47, 47, 0.7);
          em {
            margin-right: 10px;
          }
        }
      }
    }
    li:hover {
      transition: all 0.3s;
      border-radius: 5px;
      background-color: rgba(163, 163, 163, 0.1);
    }
  }
}
</style>