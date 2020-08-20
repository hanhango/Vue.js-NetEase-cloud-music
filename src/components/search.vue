<template>
  <div class="search">
    <el-input
      @focus.stop="inpfocus"
      :placeholder="showKeyword"
      prefix-icon="el-icon-search"
      v-model="searchValue"
      @input="searchInput"
      @keyup.enter.native="goSearch"
    ></el-input>
  </div>
</template>

<script>
import { getShowKeyword, getHotSearch, getSuggest } from "../network/search";
import { debounce } from "../../src/utils/index";
export default {
  data() {
    return {
      showKeyword: "", // 搜索框默认
      searchValue: "", // 搜索框的值
    };
  },
  created() {
    // 搜索框默认
    getShowKeyword().then((res) => {
      this.showKeyword = res.data.showKeyword;
      // console.log(res);
    });
  },
  methods: {
    inpfocus() {
      // console.log("获取焦点");
      this.$store.state.searchShow = true;
      console.log(this.$store.state.searchShow);
    },
    // 搜索框
    searchInput: debounce(function () {
      if (!this.searchValue.trim()) {
        const nullSuggest = { songs: [], playlists: [] };
        // console.log(nullSuggest);
        this.$store.dispatch("changeSuggest", nullSuggest);
      } else {
        getSuggest(this.searchValue).then((res) => {
          console.log(res);
          const Obj = { songs: [], playlists: [] };
          Obj.songs = res.result.songs || [];
          Obj.playlists = res.result.playlists || [];
          this.$store.dispatch("changeSuggest", Obj);
        });
      }
    }, 500),

    // enter键跳转
    goSearch() {
      this.$store.state.playerShow = false;
      this.$store.state.searchShow = false;
      // input有值用input的值，没有就用默认的值showKeyword
      if (this.searchValue.trim() == "") {
        this.$router.push({
          path: "search",
          query: {
            keyword: this.showKeyword,
          },
        });
      } else {
        this.$router.push({
          path: "search",
          query: {
            keyword: this.searchValue,
          },
        });
      }
    },
  },
  computed: {
    suggest() {
      return this.$store.state.suggest;
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  overflow: hidden;
  /deep/.el-input__inner:focus {
    // border: 1px solid #d33a31;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
}

</style>