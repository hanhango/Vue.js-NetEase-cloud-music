<template>
  <div class="toplist">
    <div v-for="item in toplist" :key="item.id" class="toplist-item">
      <!-- 有卡顿先不要背景图了 -->
      <!-- <div
        class="toplist-bg"
        :style="{backgroundImage: 'url(' + (item.tracks[0].al.picUrl)}"
      ></div> -->

      <div class="cover">
        <div class="toplist-content">
          <img v-lazy="item.tracks[0].al.picUrl" alt />
          <div class="top-song">
            <div
              class="toplist-name-description-index"
              v-for="(list,index) in item.tracks"
              :key="list.id"
            >
              <div class="toplist-index">{{index+1}}</div>
              <div class="toplist-name-description">
                <div class="toplist-name">{{list.name}}</div>
                <div class="toplist-description">{{list.ar[0].name}}</div>
              </div>
              <i class="el-icon-caret-right play"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="toplist-updateFrequency">
        <p class="toplist-name-p">{{item.name}}</p>
        <i class="el-icon-arrow-right icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toplist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      style: ""
    };
  }
};
</script>

<style lang="less" scoped>
.toplist {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
.toplist-item {
  cursor: pointer;
  margin-top: 20px;
  // padding: 10px;
  width: 32%;
  // height: 180px;
  height: 150px;
  position: relative;
  border-radius: 5px;
  // overflow: hidden;
  border-radius: 5px;
}
.toplist-bg {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  position: relative;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.cover {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: hsla(0, 0%, 100%, 0.9);
  z-index: 3;
}

.toplist-content {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: rgb(95, 95, 95);
  display: flex;
  align-items: center;
  // padding: 20px;
  height: 100%;
  width: 100%;
  // background-color: red;
  img {
    height: 150px;
    width: 150px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .top-song {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    height: 148px;
    display: flex;
    flex-direction: column;
    .toplist-name-description-index {
      overflow: hidden;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 20px;
      line-height: 100%;
      // line-height: 10px;
      position: relative;
      .toplist-index {
        font-weight: bold;
        font-size: 16px;
        width: 20px;
        color: #4a4a4a;
        // line-height: 20px;
      }
      .toplist-name-description {
        display: flex;
        flex-direction: column;
        line-height: 16px;
        .toplist-name {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
        .toplist-description {
          font-weight: 300;
          font-size: 12px;
          margin-top: 5px;
          color: #4a4a4a;
        }
        .toplist-description,
        .toplist-name {
          box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; //规定几行显示省略号
          -webkit-box-orient: vertical;
           transition: all 0.3s;
        }
      }
      .play {
        background-color: rgba(151, 151, 151, 0.2);
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 0px;
        color: #d33a31;
        font-size: 36px;
        opacity: 1;
        transition: all 0.3s;
        transform: translateX(100%);
      }
    }
    .toplist-name-description-index:hover:hover .play {
      transform: translateX(0);
    }
    .toplist-name-description-index:hover .toplist-index,
    .toplist-name-description-index:hover .toplist-name,
    .toplist-name-description-index:hover .toplist-description {
      color: #d33a31 !important;
      transition: all 0.3s;
    }
  }
}

.toplist-updateFrequency {
  padding: 8px;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 1);
  position: absolute;
  left: -10px;
  top: -10px;
  font-size: 16px;
  opacity: 1;
  z-index: 10;
  display: flex;
  align-items: center;
}
.toplist-name-p {
  width: 126px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon {
  color: rgb(255, 255, 255) !important;
  z-index: 10;
}
</style>