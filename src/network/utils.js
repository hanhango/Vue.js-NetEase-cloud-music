// 歌单的全部歌曲数据
export function dateFormat(value) {
  const date = new Date(value);
  let m = ("0" + date.getMinutes()).slice(-2);
  let s = ("0" + date.getSeconds()).slice(-2);
  return `${m}:${s}`;
}