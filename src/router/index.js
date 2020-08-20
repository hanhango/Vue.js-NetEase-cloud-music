import Vue from 'vue'
import VueRouter from 'vue-router'
const discover = () => import('@/views/discover')
const playlists = () => import('@/views/playlists')
const toplist = () => import('@/views/toplist')
const mvs = () => import('@/views/mv')
const playlist = () => import('../components/playlist.vue')
const mv = () => import('../components/mv.vue')
const search = () => import('@/views/search')
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/discover',
  },
  {
    path: '/discover',
    component: discover,
    name: "discover",
    meta: {
      title: '首页'
    }
  },
  {
    path: '/playlists',
    component: playlists,
    name:"playlists",
    meta: {
      title: '推荐歌单'
    }
  },
  {
    path: '/toplist',
    component: toplist,
    name:"toplist",
    meta: {
      title: '榜单'
    }
  },
  {
    path: '/mvs',
    component: mvs,
    name:"mvs",
    meta: {
      title: 'MV'
    }
  },
  {
    path: '/playlist',
    component: playlist,
    name:"playlist",
    meta: {
      title: '歌单详情'
    }
  },
  {
    path: '/search',
    component: search,
    name:"search",
    meta: {
      title: '搜索内容'
    }
  },
  {
    path: '/mv',
    component: mv,
    name:"mv",
    meta: {
      title: 'mv详情'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router