# 模仿网易云音乐！

### 仅限学习！！！！！！！！！！

### 项目简介

本项目后端接口是Github大神Binaryify的开源项目（项目地址：https://github.com/Binaryify/NeteaseCloudMusicApi）



### 项目使用到的技术与插件

- vue+vuex+router+axios+vue-lazyload
- element ui
- screenfull(全屏显示功能)

### 项目结构

![输入图片说明](https://gitee.com/wujunshu/netease-cloud-music-improvement/raw/master/src/assets/%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

### 问题 

#### 问题1：切换歌单视图没更新

​	原因：已经在create中请求了数据只会触发一次

​	解决方法： 使用watch监听路由传递过来的id值，如果发生变化就重新获取数据

```javascript
songid(newval, oldval) {
    if (newval != oldval) {
        this._getContentOfSongList(newval);
        this._handleComments();
    }
},
```

#### 问题2：点击热门搜索会使列表关闭

​	原因：事件冒泡了

​	解决方法：使用事件修饰符 .stop 止住事件冒泡

#### 问题3：mounted 里面获取不到this,$refs .xx

​	原因：在某个DOM节点使用了v-if、v-show或者v-for（即根据获取到的后天数据来动态操作DOM，即响应式），那么这些DOM不会再mounted阶段中找到的。

​	扩展：updata每一次的dom解构更新都会调用一次updata钩子函数。而mounted只会调用一次。

#### 问题4：没版权的歌曲不会播放也不会跳转下一首(X)

​	待解决中

#### 问题5：进度条拉都最后面没歌词会报错(X)

​	待解决中

### screenfull 插件使用方法

1. 首先安装 `npm install screenfull --save`
2. 在使用.vue文件中 引入 `import screenfull from 'screenfull'`
3. 在按钮方法中调用 `screenfull.toggle()`
4. 还可以检测全屏状态 `screenfull.isFullscreen`
5. 测试浏览器是否支持全screenfull `screenfull.isEnabled`

#### API

- .request(ele) 全屏
- .exit() 退出全屏
- .toggle() 切换全屏
- .on(event, function) ： event为 ‘change’ | ‘error’ 注册事件
- .off(event, function) ： 移除前面已经注册的事件
- .element： 返回一个全屏的dom节点，如果没有就为 null
- .isFullscreen : 是否是全屏状态
- .isEnabled ： 判断是否支持全屏

### 后续补充和完善计划

​	1.完善歌词滚动效果//已实现

​	2.无版权歌曲跳过

​	3.歌单收藏与新建

​	4.增加喜欢歌曲功能

​	5.增加歌手详细页

​	6.使用混入mixin优化重复性代码



