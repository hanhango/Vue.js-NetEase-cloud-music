import {
  Service
} from "./axios"
// mv获取
export function getMvs(area = '全部', type = '全部', order = '上升最快', offset = '0') {
  // console.log(`/mv/all?area=${area}&type=${type}&order=${order}&limit=40&offset=${offset}`);
  return Service({
    url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=40&offset=${offset}`,
    method: 'get'
  })
}