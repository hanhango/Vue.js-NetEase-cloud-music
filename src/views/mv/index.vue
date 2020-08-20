<template>
  <div class="mv">
    <mvtype @getMv="getMv" />
    <mvs :mvData="mvData" />
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination @current-change="getCatMv" layout="prev, pager, next" :total="count"></el-pagination>
    </div>
  </div>
</template>

<script>
import mvtype from "./mvtype";
import mvs from "../../components/mvs";
import { getMvs } from "../../network/mvs";
export default {
  data() {
    return {
      mvData: [],
      count: 1000,
      offset: 0,
      area: "全部",
      type: "全部",
      order: "上升最快",
    };
  },
  created() {
    this._getMvsData();
  },
  methods: {
    // 选择分类
    getMv(area, type, order) {
      this.area = area;
      this.type = type;
      this.order = order;
      this.offset = 0;
      this.count = 0;
      this._getMvsData();
    },
    // 获取mv数据
    _getMvsData() {
      getMvs(this.area, this.type, this.order, this.offset).then((res) => {
        this.mvData = res.data;
        res.count ? (this.count = Math.ceil(res.count/4)) : this.count;
        // console.log(res.count);
      });
    },
    // 改变页码
    getCatMv(newPage) {
      if (newPage == 1 || newPage == undefined) {
        this.offset = 0;
      } else {
        this.offset = 40 * (newPage - 1);
      }
      // console.log(this.offset);
      this._getMvsData();
    },
  },
  components: {
    mvtype,
    mvs,
  },
};
</script>

<style lang="less" scoped>
.mv {
  width: 80%;
  margin: 20px auto;
  font-weight: 600;
  font-size: 17px;
}
.pagination {
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>