<template>
  <div>
    <ul class="mvs">
      <ul class="mv-cat">
        <p>地区:</p>
        <li v-for="(item,index) in mvs[0]" :key="index">
          <span @click="getAreaMv(item)" :class="[item == area ? 'active' : '']">{{item}}</span>
        </li>
      </ul>
      <ul class="mv-cat">
        <p>类型:</p>
        <li v-for="(item,index) in mvs[1]" :key="index">
          <span @click="getTypeMv(item)" :class="[item == type ? 'active' : '']">{{item}}</span>
        </li>
      </ul>
      <ul class="mv-cat">
        <p>排序:</p>
        <li v-for="(item,index) in mvs[2]" :key="index">
          <span @click="getOrderMv(item)" :class="[item == order ? 'active' : '']">{{item}}</span>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvs: {
        0: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        1: ["全部", "官方版", "原生", "现场版", "网易出品"],
        2: ["上升最快", "最热", "最新"]
      },
      area: "全部",
      type: "全部",
      order: "上升最快"
    };
  },
  methods: {
    getAreaMv(area) {
      this.area = area;
      this.$emit("getMv", this.area, this.type, this.order);
    },
    getTypeMv(type) {
      this.type = type;
      this.$emit("getMv", this.area, this.type, this.order);
    },
    getOrderMv(order) {
      this.order = order;
      this.$emit("getMv", this.area, this.type, this.order);
    }
  }
};
</script>

<style lang="less" scoped>
.mvs {
  width: 100%;
  // height: 90px;
  // background-color: saddlebrown;
  display: flex;
  // align-items: center;
  flex-direction: column;
}
.mv-cat {
  margin: 15px 0;
  display: flex;
  height: 30px;
  line-height: 30px;
  p {
    margin-right: 20px;
  }
  li {
    width: 90px;
    text-align: center;
    position: relative;
  }
  span {
    cursor: pointer;
  }
  .active {
    background-color: #fdf6f5;
    color: #d33a31;
    padding: 5px 10px;
    border-radius: 30px;
  }
  li:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    width: 1px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>