# 模仿网易云音乐！

### 仅限学习！！！！！！！！！！

### 项目简介

本项目后端接口是Github大神Binaryify的开源项目（项目地址：https://github.com/Binaryify/NeteaseCloudMusicApi）



### 项目使用到的技术与插件

- vue+vuex+router+axios+vue-lazyload
- element ui
- screenfull(全屏显示功能)

### 项目结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215746788.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)


### 项目截图
未登录首页

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215340812.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)


已登录首页
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215314911.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)

推荐歌单页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215647969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)

搜索界面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215906411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)

播放界面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215424782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)

mv界面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/202008292155555.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)

mv播放界面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829215508467.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzc2MjA0,size_16,color_FFFFFF,t_70#pic_center)




### 实现功能

- 实现列表循环，单曲循环，随机播放，点击歌曲上一首/下一首,并且实现遇到VIP歌曲自动播放下一曲功能
- 实现歌词滚动功能
- 实现播放mv页面，mv播放，mv评论功能
- 实现登录网易云账号并获得自建歌单功能
- 利用防抖函数实现搜索歌曲功能

### 问题 

#### 问题1：点击热门搜索会使列表关闭

​	原因：事件冒泡了

​	解决方法：使用事件修饰符 .stop 止住事件冒泡

#### 问题2：mounted 里面获取不到this,$refs .xx

​	原因：在某个DOM节点使用了v-if、v-show或者v-for（即根据获取到的后天数据来动态操作DOM，即响应式），那么这些DOM不会再mounted阶段中找到的。

​	扩展：updata每一次的dom解构更新都会调用一次updata钩子函数。而mounted只会调用一次。

#### 问题3：没版权的歌曲不会播放也不会跳转下一首(X)

​	已解决

#### 问题4：进度条拉都最后面没歌词会报错(X)

​	已解决

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



