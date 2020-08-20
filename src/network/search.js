import {
  Service
} from "./axios"

// 搜索框默认搜索信息
export function getShowKeyword() {
  return Service({
    url: '/search/default',
    method: 'get'
  })
}
// 热门搜索
export function getHotSearch() {
  return Service({
    url: '/search/hot/detail',
    method: 'get'
  })
}
// 搜索框建议
export function getSuggest(keywords) {
  // console.log(`/search/multimatch?keywords=${keywords}`);
  return Service({
    url: `/search/multimatch?keywords=${keywords}`,
    url: `/search/suggest?keywords=${keywords}`,
    method: 'get'
  })
}
// ----------搜索内容----------
// 单曲
export function searchContent(type, offset, limit, keywords) {
  return Service({
    url: `/search?keywords=${keywords}&type=${type}&offset=${offset}&limit=${limit}`,
    method: 'get'
  })
}

export function getAllData(obj, keyword) {
  searchContent(obj.type, obj.offset, obj.limit, keyword).then((res) => {
    let a = Object.keys(obj)[0]
    obj[a] = res.result[a]
    let b = Object.keys(obj)[2]
    obj[b] = res.result[b]
  });
}
export function getSearchData(newPage = 1, obj, keyword) {
  if (newPage == 1 || newPage == undefined) {
    obj.offset = 0;
  } else {
    obj.offset = obj.limit * (newPage - 1);
  }
  getAllData(obj, keyword);
}