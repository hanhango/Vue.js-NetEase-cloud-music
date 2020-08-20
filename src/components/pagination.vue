<template>
  <div class="pagination">
    <el-pagination @current-change="getNewPage" layout="prev, pager, next" :total="count"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    count: 0,
  },
  methods: {
    getNewPage(newPage) {
      this.$emit("getNewPage", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  margin: 20px  0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /deep/ .el-pagination{
    margin-right: 30px;
  }
}
</style>