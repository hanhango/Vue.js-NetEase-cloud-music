import {
  Service
} from "./axios"
// 登录
export function login(phone, password) {
  return Service({
    url: `/login/cellphone?phone=${phone}&password=${password}`,
    method: 'POST'
  })
}
// 用户数据获取
export function getUser(uid) {
  return Service({
    url: `/user/detail?uid=${uid}`,
    method: 'get'
  })
}
// 用户歌单获取
export function getUserSong(uid) {
  return Service({
    url: `/user/playlist?uid=${uid}`,
    method: 'get'
  })
}

// 播放记录
export function playRecord(uid) {
  return Service({
    url: `/user/record?uid=${uid}&type=0`,
    method: 'get'
  })
}
// 私人FM
export function personalFm() {
  return Service({
    url: `/personal_fm`,
    method: 'get'
  })
}
//设置缓存
export function setLocalStorage(key, value) {
  //转成JSON
  const curTime = new Date().getTime();
  const localStorage = window.localStorage;
  // 存到localStorage
  const data = JSON.stringify({
    id: value,
    time: curTime
  })
  // console.log(data);
  localStorage.setItem(key, data);
};

//获取缓存
export function getLocalStorage(key) {
  const localStorage = window.localStorage;
  const data = localStorage.getItem(key);
  if(data == null) return ''
  const dataObj = JSON.parse(data);
  const time = new Date().getTime() - dataObj.time
  // 取出的时候如果时间超过7天，清空
  if (time > 604800000) {
    localStorage.clear(dataObj)
    return console.log("信息已过期");
  } else {
    return dataObj
  }
}
export function removeLogin(key){
  window.localStorage.removeItem(key);
}