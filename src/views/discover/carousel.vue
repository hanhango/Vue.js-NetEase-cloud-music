<template>
  <div class="carousel">
    <el-carousel :interval="4000" trigger="click" type="card" >
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.carousel {
  font-weight: 600;
  img {
    display: block;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
}
</style>